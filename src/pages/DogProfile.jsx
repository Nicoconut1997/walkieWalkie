// DogProfile - Page for managing dog profile with responsive design
// Shows dog details, owner info, and walking preferences with full editing capabilities

import { useState, useEffect } from 'react';

export const DogProfile = () => {
	// Default profile data
	const defaultProfile = {
		dogName: 'Buddy',
		breed: 'Golden Retriever',
		age: '3 years old',
		size: 'Large',
		energy: 'High',
		friendliness: 'Very Friendly',
		ownerName: 'Sarah Johnson',
		walkingPreferences: ['Morning walks', 'Beach areas', 'Social groups'],
	};

	// Component state
	const [isEditing, setIsEditing] = useState(false);
	const [profile, setProfile] = useState(defaultProfile);
	const [newPreference, setNewPreference] = useState('');

	// Load profile from localStorage on component mount
	useEffect(() => {
		const savedProfile = localStorage.getItem('walkieWalkie_dogProfile');
		if (savedProfile) {
			try {
				const parsedProfile = JSON.parse(savedProfile);
				setProfile(parsedProfile);
			} catch (error) {
				console.error('Error loading dog profile:', error);
			}
		}
	}, []);

	// Handle input changes
	const handleInputChange = e => {
		const { name, value } = e.target;
		setProfile(prev => ({
			...prev,
			[name]: value,
		}));
	};

	// Handle adding walking preference
	const handleAddPreference = () => {
		if (newPreference.trim() && !profile.walkingPreferences.includes(newPreference.trim())) {
			setProfile(prev => ({
				...prev,
				walkingPreferences: [...prev.walkingPreferences, newPreference.trim()],
			}));
			setNewPreference('');
		}
	};

	// Handle removing walking preference
	const handleRemovePreference = indexToRemove => {
		setProfile(prev => ({
			...prev,
			walkingPreferences: prev.walkingPreferences.filter((_, index) => index !== indexToRemove),
		}));
	};

	// Handle save changes
	const handleSave = () => {
		try {
			localStorage.setItem('walkieWalkie_dogProfile', JSON.stringify(profile));
			setIsEditing(false);
			alert('🎉 Profile saved successfully!');
		} catch (error) {
			console.error('Error saving profile:', error);
			alert('❌ Error saving profile. Please try again.');
		}
	};

	// Handle cancel editing
	const handleCancel = () => {
		// Reload from localStorage or use default
		const savedProfile = localStorage.getItem('walkieWalkie_dogProfile');
		if (savedProfile) {
			try {
				const parsedProfile = JSON.parse(savedProfile);
				setProfile(parsedProfile);
			} catch (error) {
				setProfile(defaultProfile);
			}
		} else {
			setProfile(defaultProfile);
		}
		setIsEditing(false);
		setNewPreference('');
	};

	// Predefined preference suggestions
	const suggestionsList = [
		'Morning walks',
		'Evening walks',
		'Beach areas',
		'Park areas',
		'Social groups',
		'Solo walks',
		'Long hikes',
		'Short walks',
		'Urban areas',
		'Nature trails',
		'Dog parks',
		'Off-leash areas',
		'Quiet routes',
		'Busy areas',
		'Weekend adventures',
	];

	// Return
	return (
		<div className='walkie-background min-h-screen'>
			<div className='max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8'>
				{/* Page Header */}
				<div className='text-center mb-6 sm:mb-8'>
					<h1 className='walkie-main-title text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4'>
						🐕 Dog Profile {isEditing && <span className='text-orange-500'>- Editing</span>}
					</h1>
					<p className='walkie-subtitle text-base sm:text-lg px-4'>
						{isEditing
							? "Edit your furry friend's profile and walking preferences"
							: "Manage your furry friend's profile and walking preferences"}
					</p>
				</div>

				{/* Profile Card */}
				<div className='walkie-section-border bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 mb-4 sm:mb-6'>
					{/* Dog Photo Placeholder */}
					<div className='text-center mb-6'>
						<div className='w-24 h-24 sm:w-32 sm:h-32 mx-auto bg-gray-100 rounded-full flex items-center justify-center text-4xl sm:text-6xl mb-4'>
							🐕
						</div>
						<button className='text-primary-500 hover:text-primary-600 font-medium transition-colors duration-200 text-sm sm:text-base min-h-[44px] touch-manipulation'>
							📸 Add Photo
						</button>
					</div>

					{/* Dog Information */}
					<div className='space-y-4'>
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>Dog's Name *</label>
								<input
									type='text'
									name='dogName'
									value={profile.dogName}
									onChange={handleInputChange}
									className={`w-full px-3 py-2 border rounded-lg transition-colors duration-200 text-sm sm:text-base min-h-[44px] ${
										isEditing
											? 'border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100'
											: 'border-gray-200 bg-gray-50'
									}`}
									readOnly={!isEditing}
								/>
							</div>

							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>Breed *</label>
								<input
									type='text'
									name='breed'
									value={profile.breed}
									onChange={handleInputChange}
									className={`w-full px-3 py-2 border rounded-lg transition-colors duration-200 text-sm sm:text-base min-h-[44px] ${
										isEditing
											? 'border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100'
											: 'border-gray-200 bg-gray-50'
									}`}
									readOnly={!isEditing}
								/>
							</div>

							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>Age *</label>
								<input
									type='text'
									name='age'
									value={profile.age}
									onChange={handleInputChange}
									placeholder='e.g., 3 years old'
									className={`w-full px-3 py-2 border rounded-lg transition-colors duration-200 text-sm sm:text-base min-h-[44px] ${
										isEditing
											? 'border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100'
											: 'border-gray-200 bg-gray-50'
									}`}
									readOnly={!isEditing}
								/>
							</div>

							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>Size *</label>
								{isEditing ? (
									<select
										name='size'
										value={profile.size}
										onChange={handleInputChange}
										className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-colors duration-200 text-sm sm:text-base min-h-[44px]'
									>
										<option value='Small'>Small (under 25 lbs)</option>
										<option value='Medium'>Medium (25-60 lbs)</option>
										<option value='Large'>Large (over 60 lbs)</option>
									</select>
								) : (
									<input
										type='text'
										value={profile.size}
										className='w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-lg text-sm sm:text-base min-h-[44px]'
										readOnly
									/>
								)}
							</div>
						</div>

						{/* Additional Info */}
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>
									Energy Level *
								</label>
								{isEditing ? (
									<select
										name='energy'
										value={profile.energy}
										onChange={handleInputChange}
										className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-colors duration-200 text-sm sm:text-base min-h-[44px]'
									>
										<option value='Low'>Low</option>
										<option value='Medium'>Medium</option>
										<option value='High'>High</option>
										<option value='Very High'>Very High</option>
									</select>
								) : (
									<div className='px-3 py-2 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm sm:text-base min-h-[44px] flex items-center'>
										⚡ {profile.energy}
									</div>
								)}
							</div>

							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>
									Friendliness *
								</label>
								{isEditing ? (
									<select
										name='friendliness'
										value={profile.friendliness}
										onChange={handleInputChange}
										className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-colors duration-200 text-sm sm:text-base min-h-[44px]'
									>
										<option value='Very Friendly'>Very Friendly</option>
										<option value='Friendly'>Friendly</option>
										<option value='Somewhat Friendly'>Somewhat Friendly</option>
										<option value='Selective'>Selective</option>
										<option value='Not Social'>Not Social</option>
									</select>
								) : (
									<div className='px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 text-sm sm:text-base min-h-[44px] flex items-center'>
										👥 {profile.friendliness}
									</div>
								)}
							</div>
						</div>

						{/* Walking Preferences */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								Walking Preferences
								{isEditing && <span className='text-orange-500 ml-1'>(Click × to remove)</span>}
							</label>

							<div className='flex flex-wrap gap-2 mb-3'>
								{profile.walkingPreferences.map((pref, index) => (
									<span
										key={index}
										className={`px-3 py-1 rounded-full text-xs sm:text-sm flex items-center gap-1 ${
											isEditing
												? 'bg-orange-50 border border-orange-200 text-orange-800'
												: 'bg-primary-50 border border-primary-200 text-primary-800'
										}`}
									>
										{pref}
										{isEditing && (
											<button
												onClick={() => handleRemovePreference(index)}
												className='ml-1 text-orange-600 hover:text-orange-800 transition-colors'
												aria-label={`Remove ${pref}`}
											>
												×
											</button>
										)}
									</span>
								))}
							</div>

							{/* Add new preference - only in edit mode */}
							{isEditing && (
								<div className='space-y-3'>
									<div className='flex gap-2'>
										<input
											type='text'
											value={newPreference}
											onChange={e => setNewPreference(e.target.value)}
											placeholder='Add walking preference...'
											className='flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-colors text-sm sm:text-base min-h-[44px]'
											onKeyPress={e => e.key === 'Enter' && handleAddPreference()}
										/>
										<button
											onClick={handleAddPreference}
											className='walkie-button px-4 py-2 text-white rounded-lg min-h-[44px] touch-manipulation'
										>
											Add
										</button>
									</div>

									{/* Suggestion tags */}
									<div>
										<p className='text-xs text-gray-600 mb-2'>Quick suggestions:</p>
										<div className='flex flex-wrap gap-1'>
											{suggestionsList
												.filter(suggestion => !profile.walkingPreferences.includes(suggestion))
												.slice(0, 8)
												.map((suggestion, index) => (
													<button
														key={index}
														onClick={() => {
															setProfile(prev => ({
																...prev,
																walkingPreferences: [...prev.walkingPreferences, suggestion],
															}));
														}}
														className='px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-orange-100 hover:text-orange-700 transition-colors'
													>
														+ {suggestion}
													</button>
												))}
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>

				{/* Owner Information */}
				<div className='walkie-section-border bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 mb-4 sm:mb-6'>
					<h3 className='text-lg sm:text-xl font-bold text-gray-900 mb-4'>👤 Owner Information</h3>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>Owner Name *</label>
						<input
							type='text'
							name='ownerName'
							value={profile.ownerName}
							onChange={handleInputChange}
							className={`w-full px-3 py-2 border rounded-lg transition-colors duration-200 text-sm sm:text-base min-h-[44px] ${
								isEditing
									? 'border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100'
									: 'border-gray-200 bg-gray-50'
							}`}
							readOnly={!isEditing}
						/>
					</div>
				</div>

				{/* Action Buttons */}
				<div className='flex flex-col sm:flex-row gap-3 sm:gap-4'>
					{isEditing ? (
						<>
							<button
								onClick={handleSave}
								className='walkie-button flex-1 inline-flex items-center justify-center font-medium text-white px-6 py-3 text-base rounded-lg min-h-[48px] touch-manipulation'
							>
								💾 Save Changes
							</button>
							<button
								onClick={handleCancel}
								className='flex-1 inline-flex items-center justify-center font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 text-base rounded-lg transition-colors duration-200 min-h-[48px] touch-manipulation'
							>
								❌ Cancel
							</button>
						</>
					) : (
						<>
							<button
								onClick={() => setIsEditing(true)}
								className='walkie-button flex-1 inline-flex items-center justify-center font-medium text-white px-6 py-3 text-base rounded-lg min-h-[48px] touch-manipulation'
							>
								✏️ Edit Profile
							</button>
							<button className='flex-1 inline-flex items-center justify-center font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 text-base rounded-lg transition-colors duration-200 min-h-[48px] touch-manipulation'>
								📋 Walking History
							</button>
						</>
					)}
				</div>
			</div>
		</div>
	);
};
