// BasicBooking - Walk booking component for scheduling walks with selected walker
// Handles booking form, time selection, and walk preferences

import { useState } from 'react';
import PropTypes from 'prop-types';

export const BasicBooking = ({
	walker,
	selectedDay,
	selectedTime,
	onBookingComplete,
	onCancel,
}) => {
	const [bookingData, setBookingData] = useState({
		walkDuration: '60 min',
		walkType: 'standard',
		dogCount: 1,
		dogNames: [''],
		specialInstructions: '',
		emergencyContact: '',
		emergencyPhone: '',
		recurringWeeks: 1,
		isRecurring: false,
	});

	const [currentStep, setCurrentStep] = useState(1);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const walkTypes = [
		{ id: 'standard', name: 'Standard Walk', description: 'Regular neighborhood walk', icon: '🚶' },
		{
			id: 'adventure',
			name: 'Adventure Walk',
			description: 'Longer walk with exploration',
			icon: '🏔️',
		},
		{
			id: 'training',
			name: 'Training Walk',
			description: 'Focus on behavior and training',
			icon: '🎯',
		},
		{
			id: 'socialization',
			name: 'Socialization Walk',
			description: 'Meet other dogs and people',
			icon: '👥',
		},
		{
			id: 'gentle',
			name: 'Gentle Walk',
			description: 'Slow-paced for senior or special needs dogs',
			icon: '💚',
		},
	];

	const handleInputChange = (field, value) => {
		setBookingData(prev => ({ ...prev, [field]: value }));
	};

	const handleDogNameChange = (index, name) => {
		const newDogNames = [...bookingData.dogNames];
		newDogNames[index] = name;
		setBookingData(prev => ({ ...prev, dogNames: newDogNames }));
	};

	const addDog = () => {
		if (bookingData.dogCount < 4) {
			setBookingData(prev => ({
				...prev,
				dogCount: prev.dogCount + 1,
				dogNames: [...prev.dogNames, ''],
			}));
		}
	};

	const removeDog = () => {
		if (bookingData.dogCount > 1) {
			setBookingData(prev => ({
				...prev,
				dogCount: prev.dogCount - 1,
				dogNames: prev.dogNames.slice(0, -1),
			}));
		}
	};

	const calculateTotal = () => {
		const baseCost = walker.hourlyRate * (parseInt(bookingData.walkDuration) / 60);
		const dogMultiplier = bookingData.dogCount > 1 ? 1 + (bookingData.dogCount - 1) * 0.5 : 1;
		const walkTypeMultiplier =
			bookingData.walkType === 'adventure' ? 1.3 : bookingData.walkType === 'training' ? 1.2 : 1;

		return Math.round(baseCost * dogMultiplier * walkTypeMultiplier * 100) / 100;
	};

	const handleSubmit = async () => {
		setIsSubmitting(true);

		// Simulate API call
		await new Promise(resolve => setTimeout(resolve, 2000));

		const booking = {
			id: Date.now(),
			walkerId: walker.id,
			walkerName: walker.name,
			day: selectedDay,
			time: selectedTime,
			...bookingData,
			totalCost: calculateTotal(),
			status: 'pending',
			createdAt: new Date().toISOString(),
		};

		setIsSubmitting(false);
		if (onBookingComplete) {
			onBookingComplete(booking);
		}
	};

	const getFormattedDay = () => {
		const days = {
			monday: 'Monday',
			tuesday: 'Tuesday',
			wednesday: 'Wednesday',
			thursday: 'Thursday',
			friday: 'Friday',
			saturday: 'Saturday',
			sunday: 'Sunday',
		};
		return days[selectedDay] || selectedDay;
	};

	const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
	const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

	return (
		<div className='bg-white rounded-xl border border-gray-200 shadow-lg p-6 max-w-2xl mx-auto'>
			{/* Header */}
			<div className='flex items-center justify-between mb-6'>
				<div>
					<h2 className='text-2xl font-bold text-gray-900'>Book a Walk</h2>
					<p className='text-gray-600'>
						with {walker.name} • {getFormattedDay()} at {selectedTime}
					</p>
				</div>
				{onCancel && (
					<button
						onClick={onCancel}
						className='text-gray-400 hover:text-gray-600 p-2'
						aria-label='Cancel booking'
					>
						✕
					</button>
				)}
			</div>

			{/* Progress Indicator */}
			<div className='flex items-center justify-between mb-8'>
				{[1, 2, 3].map(step => (
					<div key={step} className='flex items-center'>
						<div
							className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
								step === currentStep
									? 'bg-blue-600 text-white'
									: step < currentStep
									? 'bg-green-600 text-white'
									: 'bg-gray-200 text-gray-600'
							}`}
						>
							{step < currentStep ? '✓' : step}
						</div>
						{step < 3 && (
							<div
								className={`flex-1 h-1 mx-4 ${step < currentStep ? 'bg-green-600' : 'bg-gray-200'}`}
							/>
						)}
					</div>
				))}
			</div>

			{/* Step 1: Walk Details */}
			{currentStep === 1 && (
				<div className='space-y-6'>
					<h3 className='text-lg font-semibold text-gray-900'>Walk Details</h3>

					{/* Walk Duration */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>Walk Duration</label>
						<div className='grid grid-cols-3 gap-3'>
							{walker.walkDuration.map(duration => (
								<button
									key={duration}
									onClick={() => handleInputChange('walkDuration', duration)}
									className={`p-3 border rounded-lg text-center ${
										bookingData.walkDuration === duration
											? 'border-blue-600 bg-blue-50 text-blue-600'
											: 'border-gray-300 hover:border-gray-400'
									}`}
								>
									{duration}
								</button>
							))}
						</div>
					</div>

					{/* Walk Type */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>Walk Type</label>
						<div className='space-y-2'>
							{walkTypes.map(type => (
								<button
									key={type.id}
									onClick={() => handleInputChange('walkType', type.id)}
									className={`w-full p-3 border rounded-lg text-left flex items-center space-x-3 ${
										bookingData.walkType === type.id
											? 'border-blue-600 bg-blue-50'
											: 'border-gray-300 hover:border-gray-400'
									}`}
								>
									<span className='text-2xl'>{type.icon}</span>
									<div>
										<div className='font-medium'>{type.name}</div>
										<div className='text-sm text-gray-600'>{type.description}</div>
									</div>
								</button>
							))}
						</div>
					</div>

					{/* Recurring Option */}
					<div>
						<label className='flex items-center space-x-2'>
							<input
								type='checkbox'
								checked={bookingData.isRecurring}
								onChange={e => handleInputChange('isRecurring', e.target.checked)}
								className='rounded border-gray-300 text-blue-600'
							/>
							<span className='text-sm font-medium text-gray-700'>Make this a recurring walk</span>
						</label>
						{bookingData.isRecurring && (
							<div className='mt-2'>
								<select
									value={bookingData.recurringWeeks}
									onChange={e => handleInputChange('recurringWeeks', parseInt(e.target.value))}
									className='w-full px-3 py-2 border border-gray-300 rounded-lg'
								>
									<option value={1}>1 week</option>
									<option value={2}>2 weeks</option>
									<option value={4}>4 weeks</option>
									<option value={8}>8 weeks</option>
									<option value={12}>12 weeks</option>
								</select>
							</div>
						)}
					</div>
				</div>
			)}

			{/* Step 2: Dog Information */}
			{currentStep === 2 && (
				<div className='space-y-6'>
					<h3 className='text-lg font-semibold text-gray-900'>Dog Information</h3>

					{/* Number of Dogs */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							Number of Dogs ({bookingData.dogCount})
						</label>
						<div className='flex items-center space-x-4'>
							<button
								onClick={removeDog}
								disabled={bookingData.dogCount <= 1}
								className='w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50'
							>
								−
							</button>
							<span className='text-lg font-medium'>{bookingData.dogCount}</span>
							<button
								onClick={addDog}
								disabled={bookingData.dogCount >= 4}
								className='w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50'
							>
								+
							</button>
						</div>
					</div>

					{/* Dog Names */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>Dog Names</label>
						<div className='space-y-3'>
							{Array.from({ length: bookingData.dogCount }, (_, index) => (
								<input
									key={index}
									type='text'
									placeholder={`Dog ${index + 1} name`}
									value={bookingData.dogNames[index] || ''}
									onChange={e => handleDogNameChange(index, e.target.value)}
									className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
								/>
							))}
						</div>
					</div>

					{/* Special Instructions */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							Special Instructions (Optional)
						</label>
						<textarea
							value={bookingData.specialInstructions}
							onChange={e => handleInputChange('specialInstructions', e.target.value)}
							placeholder='Any special instructions, medical needs, or behavioral notes...'
							rows={4}
							className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
						/>
					</div>
				</div>
			)}

			{/* Step 3: Contact & Payment */}
			{currentStep === 3 && (
				<div className='space-y-6'>
					<h3 className='text-lg font-semibold text-gray-900'>Emergency Contact & Summary</h3>

					{/* Emergency Contact */}
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								Emergency Contact Name
							</label>
							<input
								type='text'
								value={bookingData.emergencyContact}
								onChange={e => handleInputChange('emergencyContact', e.target.value)}
								placeholder='Contact name'
								className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								Emergency Phone
							</label>
							<input
								type='tel'
								value={bookingData.emergencyPhone}
								onChange={e => handleInputChange('emergencyPhone', e.target.value)}
								placeholder='Phone number'
								className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
							/>
						</div>
					</div>

					{/* Booking Summary */}
					<div className='bg-gray-50 rounded-lg p-4'>
						<h4 className='font-semibold text-gray-900 mb-3'>Booking Summary</h4>
						<div className='space-y-2 text-sm'>
							<div className='flex justify-between'>
								<span>Walker:</span>
								<span>{walker.name}</span>
							</div>
							<div className='flex justify-between'>
								<span>Date & Time:</span>
								<span>
									{getFormattedDay()} at {selectedTime}
								</span>
							</div>
							<div className='flex justify-between'>
								<span>Duration:</span>
								<span>{bookingData.walkDuration}</span>
							</div>
							<div className='flex justify-between'>
								<span>Dogs:</span>
								<span>
									{bookingData.dogCount} dog{bookingData.dogCount !== 1 ? 's' : ''}
								</span>
							</div>
							<div className='flex justify-between'>
								<span>Walk Type:</span>
								<span>{walkTypes.find(t => t.id === bookingData.walkType)?.name}</span>
							</div>
							{bookingData.isRecurring && (
								<div className='flex justify-between'>
									<span>Recurring:</span>
									<span>
										{bookingData.recurringWeeks} week{bookingData.recurringWeeks !== 1 ? 's' : ''}
									</span>
								</div>
							)}
							<div className='border-t pt-2 mt-2'>
								<div className='flex justify-between font-semibold'>
									<span>Total:</span>
									<span>${calculateTotal()}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Navigation Buttons */}
			<div className='flex justify-between pt-6 border-t border-gray-200 mt-8'>
				<div>
					{currentStep > 1 && (
						<button
							onClick={prevStep}
							className='px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50'
						>
							Previous
						</button>
					)}
				</div>
				<div>
					{currentStep < 3 ? (
						<button
							onClick={nextStep}
							className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
						>
							Next
						</button>
					) : (
						<button
							onClick={handleSubmit}
							disabled={isSubmitting}
							className='px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed'
						>
							{isSubmitting ? 'Booking...' : 'Confirm Booking'}
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

BasicBooking.propTypes = {
	walker: PropTypes.object.isRequired,
	selectedDay: PropTypes.string.isRequired,
	selectedTime: PropTypes.string.isRequired,
	onBookingComplete: PropTypes.func,
	onCancel: PropTypes.func,
};
