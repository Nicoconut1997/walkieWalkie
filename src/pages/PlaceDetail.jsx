// PlaceDetail - Detailed view of a walking route/place
// Shows details, tags, and allows check-ins and tag additions

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { sampleRoutes } from '../data/sampleRoutes';

export const PlaceDetail = () => {
	const { placeId } = useParams();
	const navigate = useNavigate();

	const [place, setPlace] = useState(null);
	const [isAddingTag, setIsAddingTag] = useState(false);
	const [newTag, setNewTag] = useState('');
	const [userTags, setUserTags] = useState([]);
	const [hasCheckedIn, setHasCheckedIn] = useState(false);
	const [isCheckingIn, setIsCheckingIn] = useState(false);
	const [showReviewModal, setShowReviewModal] = useState(false);
	const [review, setReview] = useState({
		rating: 5,
		comment: '',
		photo: null,
	});
	const [currentCheckInId, setCurrentCheckInId] = useState(null);
	const [existingReview, setExistingReview] = useState(null);
	const [hasReviewedToday, setHasReviewedToday] = useState(false);
	const [allReviews, setAllReviews] = useState([]);

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

			// Check if user has already checked in today
			const checkIns = JSON.parse(localStorage.getItem('walkieWalkie_checkIns') || '[]');
			const today = new Date().toDateString();
			const todayCheckIn = checkIns.find(
				checkIn =>
					checkIn.placeId === parseInt(placeId) && new Date(checkIn.date).toDateString() === today
			);
			setHasCheckedIn(!!todayCheckIn);

			// Check for existing reviews
			const reviews = JSON.parse(localStorage.getItem('walkieWalkie_reviews') || '[]');
			const placeReviews = reviews.filter(review => review.placeId === parseInt(placeId));

			// Set all reviews for public display (sorted by newest first)
			const sortedReviews = placeReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
			setAllReviews(sortedReviews);

			// Check if user has reviewed today
			const todayReview = placeReviews.find(
				review => new Date(review.date).toDateString() === today
			);
			setHasReviewedToday(!!todayReview);

			// Get the latest review for this place (user's own review)
			if (placeReviews.length > 0) {
				const latestReview = placeReviews[placeReviews.length - 1];
				setExistingReview(latestReview);
				setReview({
					rating: latestReview.rating,
					comment: latestReview.comment || '',
					photo: latestReview.photo || null,
				});
			}
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
			setCurrentCheckInId(checkIn.id);
			setShowReviewModal(true);
		}, 1500);
	};

	const handlePhotoUpload = event => {
		const file = event.target.files[0];
		if (file) {
			// Check file size (limit to 5MB for localStorage efficiency)
			if (file.size > 5 * 1024 * 1024) {
				alert('Photo size must be less than 5MB');
				return;
			}

			const reader = new FileReader();
			reader.onload = e => {
				setReview(prev => ({ ...prev, photo: e.target.result }));
			};
			reader.readAsDataURL(file);
		}
	};

	const handleManualReview = () => {
		// Reset review state and show modal
		if (!existingReview) {
			setReview({ rating: 5, comment: '', photo: null });
		}
		setShowReviewModal(true);
	};

	const handleSubmitReview = () => {
		const existingReviews = JSON.parse(localStorage.getItem('walkieWalkie_reviews') || '[]');

		if (existingReview) {
			// Update existing review
			const reviewIndex = existingReviews.findIndex(r => r.id === existingReview.id);
			if (reviewIndex > -1) {
				existingReviews[reviewIndex] = {
					...existingReview,
					rating: review.rating,
					comment: review.comment.trim(),
					photo: review.photo,
					date: new Date().toISOString(), // Update timestamp
				};
			}
		} else {
			// Create new review record
			const reviewData = {
				id: Date.now(),
				checkInId: currentCheckInId,
				placeId: parseInt(placeId),
				placeName: place.name,
				rating: review.rating,
				comment: review.comment.trim(),
				photo: review.photo,
				date: new Date().toISOString(),
			};
			existingReviews.push(reviewData);
		}

		// Save to localStorage
		localStorage.setItem('walkieWalkie_reviews', JSON.stringify(existingReviews));

		// Update local state
		const placeReviews = existingReviews.filter(review => review.placeId === parseInt(placeId));
		const sortedReviews = placeReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
		setAllReviews(sortedReviews);

		const updatedReview = placeReviews[placeReviews.length - 1];
		setExistingReview(updatedReview);
		setHasReviewedToday(true);

		// Reset and close modal
		setShowReviewModal(false);

		// Dispatch event for other components to update
		window.dispatchEvent(new CustomEvent('reviewsUpdated'));

		alert(
			existingReview
				? '🎉 Your review has been updated!'
				: '🎉 Thank you for your review! Your feedback helps other dog walkers.'
		);
	};

	const handleSkipReview = () => {
		setReview({ rating: 5, comment: '', photo: null });
		setShowReviewModal(false);
		alert('🎉 Check-in successful! Added to your walking history.');
	};

	const formatReviewDate = dateString => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
		});
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
						{!hasCheckedIn ? (
							<button
								onClick={handleCheckIn}
								disabled={isCheckingIn}
								className={`walkie-button inline-flex items-center justify-center font-medium text-white px-8 py-4 text-lg rounded-lg min-h-[48px] touch-manipulation transition-all ${
									isCheckingIn ? 'opacity-75 cursor-not-allowed' : ''
								}`}
							>
								{isCheckingIn ? '🔄 Checking in...' : '📍 Check In Here'}
							</button>
						) : (
							<div className='space-y-4'>
								<div className='bg-green-50 border border-green-200 rounded-lg p-4'>
									<div className='flex items-center justify-center text-green-700 mb-2'>
										<span className='text-lg'>✅ Checked in today!</span>
									</div>
									<p className='text-sm text-green-600 text-center'>
										Great job! This walk has been added to your history.
									</p>
								</div>

								{/* Review Actions */}
								<div className='flex flex-col sm:flex-row gap-3 justify-center'>
									{existingReview ? (
										<>
											<button
												onClick={handleManualReview}
												className='walkie-button inline-flex items-center justify-center font-medium text-white px-6 py-3 text-base rounded-lg min-h-[48px] touch-manipulation'
											>
												✏️ Edit Your Review
											</button>
											<div className='bg-orange-50 border border-orange-200 rounded-lg p-3 text-center'>
												<div className='flex items-center justify-center gap-1 mb-1'>
													<span className='text-sm font-medium text-orange-700'>Your rating:</span>
													<div className='flex'>
														{[...Array(existingReview.rating)].map((_, i) => (
															<span key={i} className='text-yellow-400 text-sm'>
																⭐
															</span>
														))}
													</div>
												</div>
												{existingReview.comment && (
													<p className='text-xs text-gray-700 italic'>"{existingReview.comment}"</p>
												)}
											</div>
										</>
									) : (
										<button
											onClick={handleManualReview}
											className='walkie-button inline-flex items-center justify-center font-medium text-white px-6 py-3 text-base rounded-lg min-h-[48px] touch-manipulation'
										>
											⭐ Leave a Review
										</button>
									)}
								</div>
							</div>
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

				{/* Public Reviews Section */}
				{allReviews.length > 0 && (
					<div className='walkie-section-border bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6'>
						<h3 className='text-lg font-semibold text-gray-900 mb-4'>
							💬 Walker Reviews ({allReviews.length})
						</h3>
						<div className='space-y-4'>
							{allReviews.map((review, index) => (
								<div
									key={review.id}
									className='border border-gray-100 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors'
								>
									{/* Review Header */}
									<div className='flex items-center justify-between mb-3'>
										<div className='flex items-center gap-2'>
											<div className='flex'>
												{[...Array(review.rating)].map((_, i) => (
													<span key={i} className='text-yellow-400 text-lg'>
														⭐
													</span>
												))}
											</div>
											<span className='text-sm text-gray-600'>{formatReviewDate(review.date)}</span>
										</div>
										<span className='text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full'>
											Walker #{index + 1}
										</span>
									</div>

									{/* Review Photo */}
									{review.photo && (
										<div className='mb-3'>
											<img
												src={review.photo}
												alt='Walker photo'
												className='w-full max-w-sm h-48 object-cover rounded-lg border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity'
												onClick={() => {
													// Create a modal to show full-size image
													const modal = document.createElement('div');
													modal.className =
														'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4';
													modal.onclick = () => modal.remove();
													modal.innerHTML = `
														<img src="${review.photo}" alt="Walker photo" class="max-w-full max-h-full object-contain rounded-lg">
														<button class="absolute top-4 right-4 text-white text-2xl hover:text-gray-300" onclick="this.parentElement.remove()">×</button>
													`;
													document.body.appendChild(modal);
												}}
											/>
										</div>
									)}

									{/* Review Comment */}
									{review.comment && (
										<p className='text-gray-700 text-sm leading-relaxed'>"{review.comment}"</p>
									)}
								</div>
							))}
						</div>
					</div>
				)}

				{/* Review Modal */}
				{showReviewModal && (
					<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
						<div className='bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto'>
							<div className='p-6'>
								<h3 className='text-xl font-bold text-gray-900 mb-4'>
									{existingReview ? '✏️ Edit Your Review' : '🌟 Share Your Experience'}
								</h3>
								<p className='text-gray-600 mb-6'>
									How was your walk at {place.name}? Your review helps other dog walkers!
								</p>

								{/* Rating */}
								<div className='mb-6'>
									<label className='block text-sm font-medium text-gray-700 mb-2'>Rating</label>
									<div className='flex gap-1'>
										{[1, 2, 3, 4, 5].map(star => (
											<button
												key={star}
												onClick={() => setReview(prev => ({ ...prev, rating: star }))}
												className={`text-2xl transition-colors ${
													star <= review.rating ? 'text-yellow-400' : 'text-gray-300'
												} hover:text-yellow-400`}
											>
												⭐
											</button>
										))}
									</div>
								</div>

								{/* Comment */}
								<div className='mb-6'>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										Comments (optional)
									</label>
									<textarea
										value={review.comment}
										onChange={e => setReview(prev => ({ ...prev, comment: e.target.value }))}
										placeholder='Tell others about your experience...'
										className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-colors resize-none'
										rows={3}
									/>
								</div>

								{/* Photo Upload */}
								<div className='mb-6'>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										Photo (optional)
									</label>
									<div className='space-y-2'>
										<input
											type='file'
											accept='image/*'
											onChange={handlePhotoUpload}
											className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100'
										/>
										{review.photo && (
											<div className='mt-3'>
												<img
													src={review.photo}
													alt='Review photo'
													className='w-full h-32 object-cover rounded-lg border border-gray-200'
												/>
												<button
													onClick={() => setReview(prev => ({ ...prev, photo: null }))}
													className='mt-2 text-sm text-red-600 hover:text-red-800'
												>
													Remove photo
												</button>
											</div>
										)}
									</div>
								</div>

								{/* Actions */}
								<div className='flex flex-col-reverse sm:flex-row gap-3'>
									<button
										onClick={handleSkipReview}
										className='flex-1 px-4 py-3 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium'
									>
										Skip Review
									</button>
									<button
										onClick={handleSubmitReview}
										className='flex-1 walkie-button px-4 py-3 text-white rounded-lg font-medium'
									>
										{existingReview ? 'Update Review' : 'Submit Review'}
									</button>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
