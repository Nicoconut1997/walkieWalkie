// PlaceDetail - Detailed view of a walking route/place
// Shows photos, tags, details, and allows check-ins and tag additions

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { sampleRoutes } from '../data/sampleRoutes';

export const PlaceDetail = () => {
	const { placeId } = useParams();
	const navigate = useNavigate();

	const [place, setPlace] = useState(null);
	const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
	const [isAddingTag, setIsAddingTag] = useState(false);
	const [newTag, setNewTag] = useState('');
	const [userTags, setUserTags] = useState([]);
	const [hasCheckedIn, setHasCheckedIn] = useState(false);
	const [isCheckingIn, setIsCheckingIn] = useState(false);
	const [userPhotos, setUserPhotos] = useState([]);
	const [isAddingPhoto, setIsAddingPhoto] = useState(false);
	const [brokenImages, setBrokenImages] = useState(new Set());

	// Load place data and user tags
	useEffect(() => {
		const foundPlace = sampleRoutes.find(route => route.id === parseInt(placeId));
		if (foundPlace) {
			setPlace(foundPlace);

			// Load user-added tags for this place
			const savedTags = localStorage.getItem(`walkieWalkie_place_tags_${placeId}`);
			if (savedTags) {
				try {
					setUserTags(JSON.parse(savedTags));
				} catch (error) {
					console.error('Error loading place tags:', error);
				}
			}

			// Load user-added photos for this place
			const savedPhotos = localStorage.getItem(`walkieWalkie_place_photos_${placeId}`);
			if (savedPhotos) {
				try {
					setUserPhotos(JSON.parse(savedPhotos));
				} catch (error) {
					console.error('Error loading place photos:', error);
				}
			}

			// Check if user has already checked in today
			const checkIns = JSON.parse(localStorage.getItem('walkieWalkie_checkIns') || '[]');
			const today = new Date().toDateString();
			const todayCheckIn = checkIns.find(
				checkIn =>
					checkIn.placeId === parseInt(placeId) && new Date(checkIn.date).toDateString() === today
			);
			setHasCheckedIn(!!todayCheckIn);
		}
	}, [placeId]);

	const handleAddTag = () => {
		if (newTag.trim() && !userTags.includes(newTag.trim()) && !place.tags.includes(newTag.trim())) {
			const updatedTags = [...userTags, newTag.trim()];
			setUserTags(updatedTags);
			localStorage.setItem(`walkieWalkie_place_tags_${placeId}`, JSON.stringify(updatedTags));
			setNewTag('');
			setIsAddingTag(false);
		}
	};

	const handleRemoveUserTag = tagToRemove => {
		const updatedTags = userTags.filter(tag => tag !== tagToRemove);
		setUserTags(updatedTags);
		localStorage.setItem(`walkieWalkie_place_tags_${placeId}`, JSON.stringify(updatedTags));
	};

	const handlePhotoUpload = event => {
		const file = event.target.files[0];
		if (file) {
			// Check file size (limit to 5MB)
			if (file.size > 5 * 1024 * 1024) {
				alert('Photo size should be less than 5MB');
				return;
			}

			// Check file type
			if (!file.type.startsWith('image/')) {
				alert('Please select an image file');
				return;
			}

			const reader = new FileReader();
			reader.onload = e => {
				const newPhoto = {
					id: Date.now(),
					dataUrl: e.target.result,
					name: file.name,
					uploadedAt: new Date().toISOString(),
				};

				const updatedPhotos = [...userPhotos, newPhoto];
				setUserPhotos(updatedPhotos);
				localStorage.setItem(`walkieWalkie_place_photos_${placeId}`, JSON.stringify(updatedPhotos));
				setIsAddingPhoto(false);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleRemoveUserPhoto = photoId => {
		const updatedPhotos = userPhotos.filter(photo => photo.id !== photoId);
		setUserPhotos(updatedPhotos);
		localStorage.setItem(`walkieWalkie_place_photos_${placeId}`, JSON.stringify(updatedPhotos));
	};

	const handleCheckIn = () => {
		if (hasCheckedIn) return;

		setIsCheckingIn(true);

		// Create check-in record
		const checkIn = {
			id: Date.now(),
			placeId: parseInt(placeId),
			placeName: place.name,
			location: place.location,
			date: new Date().toISOString(),
			distance: place.distance,
			difficulty: place.difficulty,
			estimatedTime: place.estimatedTime,
		};

		// Save to localStorage
		const existingCheckIns = JSON.parse(localStorage.getItem('walkieWalkie_checkIns') || '[]');
		existingCheckIns.push(checkIn);
		localStorage.setItem('walkieWalkie_checkIns', JSON.stringify(existingCheckIns));

		// Update UI
		setTimeout(() => {
			setHasCheckedIn(true);
			setIsCheckingIn(false);
			alert('🎉 Check-in successful! Added to your walking history.');
		}, 1500);
	};

	const getDifficultyColor = difficulty => {
		switch (difficulty.toLowerCase()) {
			case 'easy':
				return 'bg-green-100 text-green-800 border-green-200';
			case 'moderate':
				return 'bg-yellow-100 text-yellow-800 border-yellow-200';
			case 'hard':
				return 'bg-red-100 text-red-800 border-red-200';
			default:
				return 'bg-gray-100 text-gray-800 border-gray-200';
		}
	};

	if (!place) {
		return (
			<div className='walkie-background min-h-screen flex items-center justify-center'>
				<div className='text-center'>
					<div className='text-6xl mb-4'>❓</div>
					<h2 className='text-2xl font-bold text-gray-900 mb-4'>Place not found</h2>
					<button
						onClick={() => navigate('/routes')}
						className='walkie-button inline-flex items-center justify-center font-medium text-white px-6 py-3 text-base rounded-lg min-h-[48px] touch-manipulation'
					>
						← Back to Routes
					</button>
				</div>
			</div>
		);
	}

	const allTags = [...place.tags, ...userTags];

	// Default placeholder image for when no photos exist or all photos are broken
	const defaultImage =
		'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgMTIwSDIyNVYxNDBIMjA1VjE2MEgyMjVWMTgwSDE3NVYxNjBIMTk1VjE0MEgxNzVWMTIwWiIgZmlsbD0iI0Q0RERFNCIvPgo8cGF0aCBkPSJNMTYwIDEwNUgxODBWMTI1SDE2MFYxMDVaIiBmaWxsPSIjRDREREU0Ii8+CjxwYXRoIGQ9Ik0yMjAgMTA1SDI0MFYxMjVIMjIwVjEwNVoiIGZpbGw9IiNENEREQTQiLz4KPHN2ZyBpZD0iSW1hZ2VfUGxhY2Vob2xkZXIiIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIj4KICA8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9InN5c3RlbS11aSwgLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCBTZWdvZSBVSSwgUm9ib3RvLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiBmaWxsPSIjOTlBM0FFIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+CiAgICA8dHNwYW4geD0iNTAlIiBkeT0iLTEuMmVtIj7wn5OuIE5vIFBob3RvcyBZZXQ8L3RzcGFuPgogICAgPHRzcGFuIHg9IjUwJSIgZHk9IjEuNWVtIj5CZSB0aGUgZmlyc3QgdG8gc2hhcmUhPC90c3Bhbj4KICA8L3RleHQ+Cjwvc3ZnPgo=';

	// Filter out broken images and add user photos
	const validPlacePhotos = place.photos.filter((_, index) => !brokenImages.has(`place-${index}`));
	const validUserPhotos = userPhotos.map(photo => photo.dataUrl);
	const allPhotos = [...validPlacePhotos, ...validUserPhotos];

	// Use default image if no valid photos exist
	const displayPhotos = allPhotos.length > 0 ? allPhotos : [defaultImage];

	const handleImageError = (imageType, index) => {
		setBrokenImages(prev => new Set([...prev, `${imageType}-${index}`]));
	};

	return (
		<div className='walkie-background min-h-screen'>
			<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8'>
				{/* Back Button */}
				<div className='mb-4'>
					<button
						onClick={() => navigate('/routes')}
						className='inline-flex items-center text-gray-600 hover:text-orange-500 transition-colors'
					>
						← Back to Routes
					</button>
				</div>

				{/* Photo Gallery */}
				<div className='walkie-section-border bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6 mb-6'>
					<div className='mb-4 relative'>
						<img
							src={displayPhotos[selectedPhotoIndex] || defaultImage}
							alt={place.name}
							className='w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg'
							onError={() => {
								// If the main image fails to load, show default
								if (selectedPhotoIndex < displayPhotos.length) {
									setSelectedPhotoIndex(0);
								}
							}}
						/>
						{displayPhotos.length === 1 && displayPhotos[0] === defaultImage && (
							<div className='absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-90 rounded-lg'>
								<div className='text-center'>
									<div className='text-4xl mb-2'>📸</div>
									<p className='text-gray-600 text-sm'>No photos available</p>
								</div>
							</div>
						)}
					</div>

					{/* Photo Thumbnails */}
					{displayPhotos.length > 1 && (
						<div className='flex gap-2 overflow-x-auto mb-4'>
							{displayPhotos.map((photo, index) => {
								const isUserPhoto = index >= validPlacePhotos.length;
								const userPhotoIndex = index - validPlacePhotos.length;

								return (
									<div key={`photo-${index}`} className='relative flex-shrink-0'>
										<button
											onClick={() => setSelectedPhotoIndex(index)}
											className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
												selectedPhotoIndex === index
													? 'border-orange-500'
													: 'border-gray-200 hover:border-gray-300'
											}`}
										>
											<img
												src={photo}
												alt={`${place.name} ${index + 1}`}
												className='w-full h-full object-cover'
												onError={() => {
													if (!isUserPhoto) {
														handleImageError('place', index);
													}
												}}
											/>
										</button>
										{/* Remove button for user photos */}
										{isUserPhoto && userPhotoIndex < userPhotos.length && (
											<button
												onClick={() => handleRemoveUserPhoto(userPhotos[userPhotoIndex].id)}
												className='absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 transition-colors'
												aria-label='Remove photo'
											>
												×
											</button>
										)}
									</div>
								);
							})}
						</div>
					)}

					{/* Add Photo Section */}
					<div className='flex items-center justify-between pt-4 border-t border-gray-200'>
						<div>
							<p className='text-sm text-gray-600'>
								{userPhotos.length > 0 &&
									`You've added ${userPhotos.length} photo${userPhotos.length !== 1 ? 's' : ''}`}
							</p>
						</div>
						<div className='flex gap-2'>
							{!isAddingPhoto ? (
								<button
									onClick={() => setIsAddingPhoto(true)}
									className='walkie-button inline-flex items-center justify-center font-medium text-white px-4 py-2 text-sm rounded-lg min-h-[40px] touch-manipulation'
								>
									📷 Add Photo
								</button>
							) : (
								<div className='flex gap-2'>
									<input
										type='file'
										accept='image/*'
										onChange={handlePhotoUpload}
										className='hidden'
										id='photo-upload'
									/>
									<label
										htmlFor='photo-upload'
										className='walkie-button inline-flex items-center justify-center font-medium text-white px-4 py-2 text-sm rounded-lg min-h-[40px] touch-manipulation cursor-pointer'
									>
										📁 Choose File
									</label>
									<button
										onClick={() => setIsAddingPhoto(false)}
										className='px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm min-h-[40px] touch-manipulation'
									>
										Cancel
									</button>
								</div>
							)}
						</div>
					</div>
				</div>

				{/* Place Information */}
				<div className='walkie-section-border bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6 mb-6'>
					<div className='mb-6'>
						<h1 className='walkie-main-title text-2xl sm:text-3xl lg:text-4xl font-bold mb-2'>
							{place.name}
						</h1>
						<p className='walkie-subtitle text-lg mb-4'>📍 {place.location}</p>
						<p className='text-gray-700 leading-relaxed'>{place.description}</p>
					</div>

					{/* Stats Grid */}
					<div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
						<div className='text-center p-4 bg-gray-50 rounded-lg'>
							<div className='text-2xl mb-1'>📏</div>
							<div className='text-sm text-gray-600'>Distance</div>
							<div className='font-semibold text-gray-900'>{place.distance}</div>
						</div>
						<div className='text-center p-4 bg-gray-50 rounded-lg'>
							<div className='text-2xl mb-1'>⏱️</div>
							<div className='text-sm text-gray-600'>Time</div>
							<div className='font-semibold text-gray-900'>{place.estimatedTime}</div>
						</div>
						<div className='text-center p-4 bg-gray-50 rounded-lg'>
							<div className='text-2xl mb-1'>⭐</div>
							<div className='text-sm text-gray-600'>Rating</div>
							<div className='font-semibold text-gray-900'>{place.rating}/5</div>
						</div>
						<div className='text-center p-4 bg-gray-50 rounded-lg'>
							<div className='text-2xl mb-1'>👥</div>
							<div className='text-sm text-gray-600'>Check-ins</div>
							<div className='font-semibold text-gray-900'>{place.checkIns}</div>
						</div>
					</div>

					{/* Difficulty Badge */}
					<div className='mb-6'>
						<span
							className={`inline-block px-4 py-2 rounded-full text-sm font-medium border ${getDifficultyColor(
								place.difficulty
							)}`}
						>
							Difficulty: {place.difficulty}
						</span>
					</div>

					{/* Features */}
					<div className='mb-6'>
						<h3 className='text-lg font-semibold text-gray-900 mb-3'>✨ Features</h3>
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
							{place.features.map((feature, index) => (
								<div key={index} className='flex items-center text-gray-700'>
									<span className='w-2 h-2 bg-orange-500 rounded-full mr-3'></span>
									{feature}
								</div>
							))}
						</div>
					</div>

					{/* Check-in Button */}
					<div className='text-center'>
						<button
							onClick={handleCheckIn}
							disabled={hasCheckedIn || isCheckingIn}
							className={`walkie-button inline-flex items-center justify-center font-medium text-white px-8 py-4 text-lg rounded-lg min-h-[48px] touch-manipulation transition-all ${
								hasCheckedIn
									? 'bg-green-500 cursor-not-allowed'
									: isCheckingIn
									? 'opacity-75 cursor-not-allowed'
									: ''
							}`}
						>
							{isCheckingIn
								? '🔄 Checking in...'
								: hasCheckedIn
								? '✅ Checked in today!'
								: '📍 Check In Here'}
						</button>
						{hasCheckedIn && (
							<p className='text-sm text-green-600 mt-2'>
								Great job! This walk has been added to your history.
							</p>
						)}
					</div>
				</div>

				{/* Tags Section */}
				<div className='walkie-section-border bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6'>
					<div className='flex items-center justify-between mb-4'>
						<h3 className='text-lg font-semibold text-gray-900'>🏷️ Tags</h3>
						<button
							onClick={() => setIsAddingTag(true)}
							className='text-orange-500 hover:text-orange-600 font-medium transition-colors text-sm'
						>
							+ Add Tag
						</button>
					</div>

					{/* Existing Tags */}
					<div className='flex flex-wrap gap-2 mb-4'>
						{place.tags.map((tag, index) => (
							<span
								key={index}
								className='px-3 py-1 bg-blue-50 border border-blue-200 text-blue-800 rounded-full text-sm'
							>
								{tag}
							</span>
						))}
						{userTags.map((tag, index) => (
							<span
								key={`user-${index}`}
								className='px-3 py-1 bg-orange-50 border border-orange-200 text-orange-800 rounded-full text-sm flex items-center gap-1'
							>
								{tag}
								<button
									onClick={() => handleRemoveUserTag(tag)}
									className='ml-1 text-orange-600 hover:text-orange-800 transition-colors'
									aria-label={`Remove ${tag}`}
								>
									×
								</button>
							</span>
						))}
					</div>

					{/* Add Tag Input */}
					{isAddingTag && (
						<div className='flex gap-2 items-center p-3 bg-gray-50 rounded-lg'>
							<input
								type='text'
								value={newTag}
								onChange={e => setNewTag(e.target.value)}
								placeholder='Add a new tag...'
								className='flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-colors text-sm min-h-[44px]'
								onKeyPress={e => e.key === 'Enter' && handleAddTag()}
								autoFocus
							/>
							<button
								onClick={handleAddTag}
								className='walkie-button px-4 py-2 text-white rounded-lg min-h-[44px] touch-manipulation'
							>
								Add
							</button>
							<button
								onClick={() => {
									setIsAddingTag(false);
									setNewTag('');
								}}
								className='px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors min-h-[44px] touch-manipulation'
							>
								Cancel
							</button>
						</div>
					)}

					{allTags.length === 0 && (
						<p className='text-gray-500 text-center py-4'>No tags yet. Be the first to add one!</p>
					)}
				</div>
			</div>
		</div>
	);
};
