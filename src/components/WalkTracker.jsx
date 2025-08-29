// WalkTracker - Component for starting, tracking, and completing walks with XP integration
// Handles real-time walk tracking and awards XP upon completion

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { calculateXPForWalk, ACTIVITY_TYPES } from '../data/constants';

export const WalkTracker = ({ dogs, onWalkCompleted }) => {
	const [activeWalk, setActiveWalk] = useState(null);
	const [walkData, setWalkData] = useState({
		selectedDogIds: [],
		activityType: 'casual',
		startTime: null,
		duration: 0,
		distance: 0,
	});
	const [timer, setTimer] = useState(0);

	// Load active walk from localStorage on mount
	useEffect(() => {
		const savedWalk = localStorage.getItem('walkieWalkie_activeWalk');
		if (savedWalk) {
			try {
				const parsed = JSON.parse(savedWalk);
				setActiveWalk(parsed);
				setWalkData(parsed);
				// Calculate elapsed time if walk is active
				if (parsed.startTime) {
					const elapsed = Math.floor((Date.now() - new Date(parsed.startTime)) / 1000);
					setTimer(elapsed);
				}
			} catch (error) {
				console.error('Error loading active walk:', error);
			}
		}
	}, []);

	// Timer effect for active walks
	useEffect(() => {
		let interval;
		if (activeWalk && activeWalk.startTime) {
			interval = setInterval(() => {
				const elapsed = Math.floor((Date.now() - new Date(activeWalk.startTime)) / 1000);
				setTimer(elapsed);
			}, 1000);
		}
		return () => clearInterval(interval);
	}, [activeWalk]);

	// Format time display (HH:MM:SS)
	const formatTime = seconds => {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const secs = seconds % 60;
		if (hours > 0) {
			return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
		}
		return `${minutes}:${secs.toString().padStart(2, '0')}`;
	};

	// Start a walk
	const handleStartWalk = () => {
		if (walkData.selectedDogIds.length === 0) {
			alert('Please select at least one dog for the walk!');
			return;
		}

		const newWalk = {
			...walkData,
			startTime: new Date().toISOString(),
			walkId: Date.now().toString(),
		};

		setActiveWalk(newWalk);
		setWalkData(newWalk);
		localStorage.setItem('walkieWalkie_activeWalk', JSON.stringify(newWalk));
		alert(`🚶 Walk started with ${walkData.selectedDogIds.length} dog(s)!`);
	};

	// Complete a walk
	const handleCompleteWalk = () => {
		if (!activeWalk) return;

		const durationMinutes = Math.max(1, Math.floor(timer / 60)); // Minimum 1 minute
		const distance = walkData.distance || 1; // Default 1km if not set

		// Calculate XP for each dog
		const xpGained = calculateXPForWalk(
			durationMinutes,
			distance,
			activeWalk.activityType,
			[] // TODO: Add achievement detection
		);

		// Award XP to each dog
		activeWalk.selectedDogIds.forEach(dogId => {
			onWalkCompleted(dogId, xpGained, {
				duration: durationMinutes,
				distance: distance,
				activityType: activeWalk.activityType,
				completedAt: new Date().toISOString(),
			});
		});

		// Clear active walk
		setActiveWalk(null);
		setWalkData({
			selectedDogIds: [],
			activityType: 'casual',
			startTime: null,
			duration: 0,
			distance: 0,
		});
		setTimer(0);
		localStorage.removeItem('walkieWalkie_activeWalk');

		alert(`🎉 Walk completed! Each dog gained ${xpGained} XP!`);
	};

	// Cancel a walk
	const handleCancelWalk = () => {
		if (window.confirm('Are you sure you want to cancel this walk? No XP will be awarded.')) {
			setActiveWalk(null);
			setWalkData({
				selectedDogIds: [],
				activityType: 'casual',
				startTime: null,
				duration: 0,
				distance: 0,
			});
			setTimer(0);
			localStorage.removeItem('walkieWalkie_activeWalk');
		}
	};

	// Update walk data
	const updateWalkData = (field, value) => {
		const updated = { ...walkData, [field]: value };
		setWalkData(updated);
		if (activeWalk) {
			const updatedWalk = { ...activeWalk, [field]: value };
			setActiveWalk(updatedWalk);
			localStorage.setItem('walkieWalkie_activeWalk', JSON.stringify(updatedWalk));
		}
	};

	// Toggle dog selection
	const toggleDogSelection = dogId => {
		const currentSelection = walkData.selectedDogIds;
		const newSelection = currentSelection.includes(dogId)
			? currentSelection.filter(id => id !== dogId)
			: [...currentSelection, dogId];

		updateWalkData('selectedDogIds', newSelection);
	};

	return (
		<div className='space-y-6'>
			{/* Active Walk Display */}
			{activeWalk ? (
				<div className='walkie-section-border bg-green-50 border-green-200 rounded-xl p-4 sm:p-6'>
					<div className='text-center mb-6'>
						<h3 className='text-xl sm:text-2xl font-bold text-green-800 mb-2'>
							🚶 Walk in Progress
						</h3>
						{activeWalk.eventTitle && (
							<div className='bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4'>
								<p className='text-blue-800 font-medium'>📅 Event: {activeWalk.eventTitle}</p>
								<p className='text-blue-600 text-sm'>📍 {activeWalk.eventLocation}</p>
							</div>
						)}
						<div className='text-3xl sm:text-4xl font-mono font-bold text-green-700 mb-2'>
							{formatTime(timer)}
						</div>
						<p className='text-green-600'>
							Walking with {activeWalk.selectedDogIds.length} dog(s) • {activeWalk.activityType}
						</p>
					</div>

					{/* Walk Controls */}
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6'>
						<div>
							<label className='block text-sm font-medium text-green-700 mb-2'>Distance (km)</label>
							<input
								type='number'
								step='0.1'
								value={walkData.distance}
								onChange={e => updateWalkData('distance', parseFloat(e.target.value) || 0)}
								className='w-full px-3 py-2 border border-green-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100 text-sm'
								placeholder='Enter distance...'
							/>
						</div>

						<div>
							<label className='block text-sm font-medium text-green-700 mb-2'>Activity Type</label>
							<select
								value={walkData.activityType}
								onChange={e => updateWalkData('activityType', e.target.value)}
								className='w-full px-3 py-2 border border-green-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100 text-sm'
							>
								{ACTIVITY_TYPES.map(activity => (
									<option key={activity.value} value={activity.value}>
										{activity.emoji} {activity.label}
									</option>
								))}
							</select>
						</div>
					</div>

					{/* Action Buttons */}
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
						<button
							onClick={handleCompleteWalk}
							className='bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-medium'
						>
							✅ Complete Walk
						</button>
						<button
							onClick={handleCancelWalk}
							className='bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors font-medium'
						>
							❌ Cancel Walk
						</button>
					</div>
				</div>
			) : (
				/* Start Walk Form */
				<div className='walkie-section-border bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6'>
					<h3 className='text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center'>
						🚶 Start a New Walk
					</h3>

					{/* Dog Selection */}
					<div className='mb-6'>
						<label className='block text-sm font-medium text-gray-700 mb-3'>
							Select Dogs for Walk *
						</label>
						{dogs.length === 0 ? (
							<p className='text-gray-500 text-center py-4'>
								No dogs found. Add a dog to your profile first!
							</p>
						) : (
							<div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
								{dogs.map(dog => (
									<button
										key={dog.id}
										onClick={() => toggleDogSelection(dog.id)}
										className={`p-3 rounded-lg border transition-colors text-left ${
											walkData.selectedDogIds.includes(dog.id)
												? 'border-primary-500 bg-primary-50 text-primary-700'
												: 'border-gray-300 hover:border-gray-400'
										}`}
									>
										<div className='font-medium'>{dog.dogName || 'Unnamed Dog'}</div>
										<div className='text-sm text-gray-500'>
											Level {dog.level || 1} • {dog.breed || 'Unknown breed'}
										</div>
									</button>
								))}
							</div>
						)}
					</div>

					{/* Activity Type */}
					<div className='mb-6'>
						<label className='block text-sm font-medium text-gray-700 mb-2'>Activity Type</label>
						<select
							value={walkData.activityType}
							onChange={e => updateWalkData('activityType', e.target.value)}
							className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100 text-sm'
						>
							{ACTIVITY_TYPES.map(activity => (
								<option key={activity.value} value={activity.value}>
									{activity.emoji} {activity.label}
								</option>
							))}
						</select>
					</div>

					{/* Start Walk Button */}
					<button
						onClick={handleStartWalk}
						disabled={walkData.selectedDogIds.length === 0}
						className={`w-full py-3 rounded-lg font-medium transition-colors ${
							walkData.selectedDogIds.length === 0
								? 'bg-gray-300 text-gray-500 cursor-not-allowed'
								: 'walkie-button text-white hover:opacity-90'
						}`}
					>
						🚶 Start Walk
					</button>
				</div>
			)}
		</div>
	);
};

WalkTracker.propTypes = {
	dogs: PropTypes.array.isRequired,
	onWalkCompleted: PropTypes.func.isRequired,
};
