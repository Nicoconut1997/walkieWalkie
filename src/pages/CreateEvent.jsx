// CreateEvent - Comprehensive form for creating dog walking events
// Features responsive design, form validation, and localStorage persistence

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const CreateEvent = () => {
	const navigate = useNavigate();

	// Initial form state
	const initialFormData = {
		title: '',
		location: '',
		date: '',
		startTime: '',
		endTime: '',
		description: '',
		maxAttendees: '',
		dogSizeRequirement: 'all',
		dogTemperament: 'friendly',
		contactName: '',
		contactPhone: '',
		contactEmail: '',
		difficultyLevel: 'easy',
		routeDistance: '',
		meetingPoint: '',
		additionalNotes: '',
		emoji: '🌅',
	};

	const [formData, setFormData] = useState(initialFormData);
	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Load saved form data on component mount
	useEffect(() => {
		const savedFormData = localStorage.getItem('walkieWalkie_draft_event');
		if (savedFormData) {
			try {
				const parsedData = JSON.parse(savedFormData);
				setFormData(parsedData);
			} catch (error) {
				console.error('Error loading saved form data:', error);
			}
		}
	}, []);

	// Save form data to localStorage whenever it changes
	useEffect(() => {
		const timer = setTimeout(() => {
			localStorage.setItem('walkieWalkie_draft_event', JSON.stringify(formData));
		}, 500); // Debounce save to avoid excessive writes

		return () => clearTimeout(timer);
	}, [formData]);

	const handleInputChange = e => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value,
		}));

		// Clear error for this field when user starts typing
		if (errors[name]) {
			setErrors(prev => ({
				...prev,
				[name]: '',
			}));
		}
	};

	const validateForm = () => {
		const newErrors = {};

		// Required field validation
		const requiredFields = {
			title: 'Event title is required',
			location: 'Location is required',
			date: 'Date is required',
			startTime: 'Start time is required',
			endTime: 'End time is required',
			description: 'Description is required',
			maxAttendees: 'Maximum attendees is required',
			contactName: 'Contact name is required',
			contactPhone: 'Phone number is required',
			contactEmail: 'Email address is required',
			routeDistance: 'Route distance is required',
			meetingPoint: 'Meeting point is required',
		};

		Object.keys(requiredFields).forEach(field => {
			if (!formData[field] || formData[field].toString().trim() === '') {
				newErrors[field] = requiredFields[field];
			}
		});

		// Email validation
		if (formData.contactEmail && !/\S+@\S+\.\S+/.test(formData.contactEmail)) {
			newErrors.contactEmail = 'Please enter a valid email address';
		}

		// Time validation
		if (formData.startTime && formData.endTime && formData.startTime >= formData.endTime) {
			newErrors.endTime = 'End time must be after start time';
		}

		// Date validation (cannot be in the past)
		if (formData.date && new Date(formData.date) < new Date().setHours(0, 0, 0, 0)) {
			newErrors.date = 'Event date cannot be in the past';
		}

		// Max attendees validation
		if (formData.maxAttendees && (formData.maxAttendees < 2 || formData.maxAttendees > 50)) {
			newErrors.maxAttendees = 'Maximum attendees must be between 2 and 50';
		}

		return newErrors;
	};

	const handleSubmit = async e => {
		e.preventDefault();
		setIsSubmitting(true);

		const formErrors = validateForm();
		if (Object.keys(formErrors).length > 0) {
			setErrors(formErrors);
			setIsSubmitting(false);
			return;
		}

		try {
			// Get existing events from localStorage
			const existingEvents = JSON.parse(localStorage.getItem('walkieWalkie_events') || '[]');

			// Create new event with unique ID
			const newEvent = {
				...formData,
				id: Date.now(), // Simple ID generation
				attendeeCount: 1, // Creator is the first attendee
				createdAt: new Date().toISOString(),
			};

			// Add new event to the list
			const updatedEvents = [...existingEvents, newEvent];
			localStorage.setItem('walkieWalkie_events', JSON.stringify(updatedEvents));

			// Clear the draft from localStorage
			localStorage.removeItem('walkieWalkie_draft_event');

			// Show success message
			alert('🎉 Event created successfully!');

			// Navigate to the dog walks page
			navigate('/walks');
		} catch (error) {
			console.error('Error creating event:', error);
			alert('❌ Error creating event. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleCancel = () => {
		if (
			Object.values(formData).some(
				value =>
					value !== '' &&
					value !== initialFormData[Object.keys(formData).find(key => formData[key] === value)]
			)
		) {
			if (window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
				localStorage.removeItem('walkieWalkie_draft_event');
				navigate('/walks');
			}
		} else {
			navigate('/walks');
		}
	};

	const handleClearDraft = () => {
		if (window.confirm('Are you sure you want to clear all form data?')) {
			setFormData(initialFormData);
			localStorage.removeItem('walkieWalkie_draft_event');
		}
	};

	const emojiOptions = [
		{ value: '🌅', label: '🌅 Morning' },
		{ value: '🏖️', label: '🏖️ Beach' },
		{ value: '🌳', label: '🌳 Park' },
		{ value: '🌆', label: '🌆 Evening' },
		{ value: '🐶', label: '🐶 Puppy' },
		{ value: '⚓', label: '⚓ Harbor' },
		{ value: '⛰️', label: '⛰️ Hike' },
		{ value: '🎉', label: '🎉 Social' },
	];

	return (
		<div className='walkie-background min-h-screen py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-4xl mx-auto'>
				{/* Header */}
				<div className='text-center mb-6 sm:mb-8'>
					<h1 className='walkie-main-title text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4'>
						Create Dog Walk Event
					</h1>
					<p className='walkie-subtitle text-base sm:text-lg lg:text-xl max-w-2xl mx-auto px-4'>
						Organize a fun walking adventure for fellow dog lovers in your community!
					</p>
				</div>

				{/* Form Container */}
				<div className='walkie-section-border bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6 lg:p-8'>
					<form onSubmit={handleSubmit} className='space-y-6 sm:space-y-8'>
						{/* Basic Event Information */}
						<div className='space-y-4 sm:space-y-6'>
							<h3 className='walkie-main-title text-xl sm:text-2xl font-semibold border-b border-gray-200 pb-3'>
								📝 Event Details
							</h3>

							{/* Event Title and Emoji */}
							<div className='grid grid-cols-1 sm:grid-cols-4 gap-4'>
								<div className='sm:col-span-3'>
									<label
										htmlFor='title'
										className='block text-sm sm:text-base font-medium walkie-subtitle mb-2'
									>
										Event Title *
									</label>
									<input
										type='text'
										id='title'
										name='title'
										value={formData.title}
										onChange={handleInputChange}
										placeholder='e.g., Morning Walk in Central Park'
										className={`w-full px-3 sm:px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-sm sm:text-base min-h-[48px] ${
											errors.title ? 'border-red-500' : 'border-gray-300'
										}`}
									/>
									{errors.title && (
										<p className='text-red-500 text-xs sm:text-sm mt-1'>{errors.title}</p>
									)}
								</div>

								<div>
									<label
										htmlFor='emoji'
										className='block text-sm sm:text-base font-medium walkie-subtitle mb-2'
									>
										Icon
									</label>
									<select
										id='emoji'
										name='emoji'
										value={formData.emoji}
										onChange={handleInputChange}
										className='w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-sm sm:text-base min-h-[48px]'
									>
										{emojiOptions.map(option => (
											<option key={option.value} value={option.value}>
												{option.label}
											</option>
										))}
									</select>
								</div>
							</div>

							{/* Location */}
							<div>
								<label
									htmlFor='location'
									className='block text-sm sm:text-base font-medium walkie-subtitle mb-2'
								>
									Location *
								</label>
								<input
									type='text'
									id='location'
									name='location'
									value={formData.location}
									onChange={handleInputChange}
									placeholder='e.g., Central Park, New York (2km route)'
									className={`w-full px-3 sm:px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-sm sm:text-base min-h-[48px] ${
										errors.location ? 'border-red-500' : 'border-gray-300'
									}`}
								/>
								{errors.location && (
									<p className='text-red-500 text-xs sm:text-sm mt-1'>{errors.location}</p>
								)}
							</div>

							{/* Date and Time */}
							<div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
								<div>
									<label
										htmlFor='date'
										className='block text-sm sm:text-base font-medium walkie-subtitle mb-2'
									>
										Date *
									</label>
									<input
										type='date'
										id='date'
										name='date'
										value={formData.date}
										onChange={handleInputChange}
										min={new Date().toISOString().split('T')[0]}
										className={`w-full px-3 sm:px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-sm sm:text-base min-h-[48px] ${
											errors.date ? 'border-red-500' : 'border-gray-300'
										}`}
									/>
									{errors.date && (
										<p className='text-red-500 text-xs sm:text-sm mt-1'>{errors.date}</p>
									)}
								</div>

								<div>
									<label
										htmlFor='startTime'
										className='block text-sm sm:text-base font-medium walkie-subtitle mb-2'
									>
										Start Time *
									</label>
									<input
										type='time'
										id='startTime'
										name='startTime'
										value={formData.startTime}
										onChange={handleInputChange}
										className={`w-full px-3 sm:px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-sm sm:text-base min-h-[48px] ${
											errors.startTime ? 'border-red-500' : 'border-gray-300'
										}`}
									/>
									{errors.startTime && (
										<p className='text-red-500 text-xs sm:text-sm mt-1'>{errors.startTime}</p>
									)}
								</div>

								<div>
									<label
										htmlFor='endTime'
										className='block text-sm sm:text-base font-medium walkie-subtitle mb-2'
									>
										End Time *
									</label>
									<input
										type='time'
										id='endTime'
										name='endTime'
										value={formData.endTime}
										onChange={handleInputChange}
										className={`w-full px-3 sm:px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-sm sm:text-base min-h-[48px] ${
											errors.endTime ? 'border-red-500' : 'border-gray-300'
										}`}
									/>
									{errors.endTime && (
										<p className='text-red-500 text-xs sm:text-sm mt-1'>{errors.endTime}</p>
									)}
								</div>
							</div>

							{/* Description */}
							<div>
								<label
									htmlFor='description'
									className='block text-sm sm:text-base font-medium walkie-subtitle mb-2'
								>
									Description *
								</label>
								<textarea
									id='description'
									name='description'
									value={formData.description}
									onChange={handleInputChange}
									rows='4'
									placeholder='Describe the walk route, what to expect, and any special features...'
									className={`w-full px-3 sm:px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors resize-vertical text-sm sm:text-base ${
										errors.description ? 'border-red-500' : 'border-gray-300'
									}`}
								/>
								{errors.description && (
									<p className='text-red-500 text-xs sm:text-sm mt-1'>{errors.description}</p>
								)}
							</div>
						</div>

						{/* Walk Details */}
						<div className='space-y-4 sm:space-y-6'>
							<h3 className='walkie-main-title text-xl sm:text-2xl font-semibold border-b border-gray-200 pb-3'>
								🚶‍♀️ Walk Information
							</h3>

							<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
								{/* Max Attendees */}
								<div>
									<label
										htmlFor='maxAttendees'
										className='block text-sm sm:text-base font-medium walkie-subtitle mb-2'
									>
										Maximum Attendees *
									</label>
									<input
										type='number'
										id='maxAttendees'
										name='maxAttendees'
										value={formData.maxAttendees}
										onChange={handleInputChange}
										min='2'
										max='50'
										placeholder='8'
										className={`w-full px-3 sm:px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-sm sm:text-base min-h-[48px] ${
											errors.maxAttendees ? 'border-red-500' : 'border-gray-300'
										}`}
									/>
									{errors.maxAttendees && (
										<p className='text-red-500 text-xs sm:text-sm mt-1'>{errors.maxAttendees}</p>
									)}
								</div>

								{/* Route Distance */}
								<div>
									<label
										htmlFor='routeDistance'
										className='block text-sm sm:text-base font-medium walkie-subtitle mb-2'
									>
										Route Distance *
									</label>
									<input
										type='text'
										id='routeDistance'
										name='routeDistance'
										value={formData.routeDistance}
										onChange={handleInputChange}
										placeholder='e.g., 2.5 km or 1.5 miles'
										className={`w-full px-3 sm:px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-sm sm:text-base min-h-[48px] ${
											errors.routeDistance ? 'border-red-500' : 'border-gray-300'
										}`}
									/>
									{errors.routeDistance && (
										<p className='text-red-500 text-xs sm:text-sm mt-1'>{errors.routeDistance}</p>
									)}
								</div>

								{/* Difficulty Level */}
								<div>
									<label
										htmlFor='difficultyLevel'
										className='block text-sm sm:text-base font-medium walkie-subtitle mb-2'
									>
										Difficulty Level
									</label>
									<select
										id='difficultyLevel'
										name='difficultyLevel'
										value={formData.difficultyLevel}
										onChange={handleInputChange}
										className='w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-sm sm:text-base min-h-[48px]'
									>
										<option value='easy'>Easy - Flat terrain, leisurely pace</option>
										<option value='moderate'>Moderate - Some hills, regular pace</option>
										<option value='hard'>Hard - Hilly terrain, brisk pace</option>
									</select>
								</div>

								{/* Meeting Point */}
								<div>
									<label
										htmlFor='meetingPoint'
										className='block text-sm sm:text-base font-medium walkie-subtitle mb-2'
									>
										Meeting Point Details *
									</label>
									<input
										type='text'
										id='meetingPoint'
										name='meetingPoint'
										value={formData.meetingPoint}
										onChange={handleInputChange}
										placeholder='e.g., Main entrance near the fountain'
										className={`w-full px-3 sm:px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-sm sm:text-base min-h-[48px] ${
											errors.meetingPoint ? 'border-red-500' : 'border-gray-300'
										}`}
									/>
									{errors.meetingPoint && (
										<p className='text-red-500 text-xs sm:text-sm mt-1'>{errors.meetingPoint}</p>
									)}
								</div>
							</div>
						</div>

						{/* Dog Requirements */}
						<div className='space-y-4 sm:space-y-6'>
							<h3 className='walkie-main-title text-xl sm:text-2xl font-semibold border-b border-gray-200 pb-3'>
								🐕 Dog Requirements
							</h3>

							<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
								{/* Dog Size Requirement */}
								<div>
									<label
										htmlFor='dogSizeRequirement'
										className='block text-sm sm:text-base font-medium walkie-subtitle mb-2'
									>
										Dog Size Welcome
									</label>
									<select
										id='dogSizeRequirement'
										name='dogSizeRequirement'
										value={formData.dogSizeRequirement}
										onChange={handleInputChange}
										className='w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-sm sm:text-base min-h-[48px]'
									>
										<option value='all'>All sizes welcome</option>
										<option value='small'>Small dogs only (under 25 lbs)</option>
										<option value='medium'>Medium dogs only (25-60 lbs)</option>
										<option value='large'>Large dogs only (over 60 lbs)</option>
										<option value='small-medium'>Small to medium dogs</option>
										<option value='medium-large'>Medium to large dogs</option>
									</select>
								</div>

								{/* Dog Temperament */}
								<div>
									<label
										htmlFor='dogTemperament'
										className='block text-sm sm:text-base font-medium walkie-subtitle mb-2'
									>
										Required Temperament
									</label>
									<select
										id='dogTemperament'
										name='dogTemperament'
										value={formData.dogTemperament}
										onChange={handleInputChange}
										className='w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-sm sm:text-base min-h-[48px]'
									>
										<option value='friendly'>Friendly & social dogs</option>
										<option value='calm'>Calm & well-behaved dogs</option>
										<option value='energetic'>Energetic & playful dogs</option>
										<option value='trained'>Well-trained dogs only</option>
									</select>
								</div>
							</div>
						</div>

						{/* Contact Information */}
						<div className='space-y-4 sm:space-y-6'>
							<h3 className='walkie-main-title text-xl sm:text-2xl font-semibold border-b border-gray-200 pb-3'>
								📞 Contact Information
							</h3>

							<div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
								<div>
									<label
										htmlFor='contactName'
										className='block text-sm sm:text-base font-medium walkie-subtitle mb-2'
									>
										Your Name *
									</label>
									<input
										type='text'
										id='contactName'
										name='contactName'
										value={formData.contactName}
										onChange={handleInputChange}
										placeholder='John Doe'
										className={`w-full px-3 sm:px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-sm sm:text-base min-h-[48px] ${
											errors.contactName ? 'border-red-500' : 'border-gray-300'
										}`}
									/>
									{errors.contactName && (
										<p className='text-red-500 text-xs sm:text-sm mt-1'>{errors.contactName}</p>
									)}
								</div>

								<div>
									<label
										htmlFor='contactPhone'
										className='block text-sm sm:text-base font-medium walkie-subtitle mb-2'
									>
										Phone Number *
									</label>
									<input
										type='tel'
										id='contactPhone'
										name='contactPhone'
										value={formData.contactPhone}
										onChange={handleInputChange}
										placeholder='(555) 123-4567'
										className={`w-full px-3 sm:px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-sm sm:text-base min-h-[48px] ${
											errors.contactPhone ? 'border-red-500' : 'border-gray-300'
										}`}
									/>
									{errors.contactPhone && (
										<p className='text-red-500 text-xs sm:text-sm mt-1'>{errors.contactPhone}</p>
									)}
								</div>

								<div>
									<label
										htmlFor='contactEmail'
										className='block text-sm sm:text-base font-medium walkie-subtitle mb-2'
									>
										Email Address *
									</label>
									<input
										type='email'
										id='contactEmail'
										name='contactEmail'
										value={formData.contactEmail}
										onChange={handleInputChange}
										placeholder='john@example.com'
										className={`w-full px-3 sm:px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-sm sm:text-base min-h-[48px] ${
											errors.contactEmail ? 'border-red-500' : 'border-gray-300'
										}`}
									/>
									{errors.contactEmail && (
										<p className='text-red-500 text-xs sm:text-sm mt-1'>{errors.contactEmail}</p>
									)}
								</div>
							</div>
						</div>

						{/* Additional Notes */}
						<div>
							<label
								htmlFor='additionalNotes'
								className='block text-sm sm:text-base font-medium walkie-subtitle mb-2'
							>
								Additional Notes
							</label>
							<textarea
								id='additionalNotes'
								name='additionalNotes'
								value={formData.additionalNotes}
								onChange={handleInputChange}
								rows='3'
								placeholder='Any special instructions, things to bring, or additional information...'
								className='w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors resize-vertical text-sm sm:text-base'
							/>
						</div>

						{/* Action Buttons */}
						<div className='flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 border-t border-gray-200'>
							<button
								type='submit'
								disabled={isSubmitting}
								className='walkie-button flex-1 inline-flex items-center justify-center font-medium text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-lg disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px] touch-manipulation'
							>
								{isSubmitting ? '⏳ Creating...' : '🎉 Create Event'}
							</button>
							<button
								type='button'
								onClick={handleClearDraft}
								className='flex-1 sm:flex-none inline-flex items-center justify-center font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-lg border border-gray-300 transition-colors min-h-[48px] touch-manipulation'
							>
								🗑️ Clear
							</button>
							<button
								type='button'
								onClick={handleCancel}
								className='flex-1 sm:flex-none inline-flex items-center justify-center font-medium text-gray-600 bg-white hover:bg-gray-50 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-lg border border-gray-300 transition-colors min-h-[48px] touch-manipulation'
							>
								Cancel
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
