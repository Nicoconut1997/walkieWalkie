// XPSimulator - Development utility to simulate walk completion and XP gain
// Allows testing the experience system without actual walk data

import { useState } from 'react';
import PropTypes from 'prop-types';
import { calculateXPForWalk, EXPERIENCE_SYSTEM } from '../data/constants';

export const XPSimulator = ({ dog, onXPGained, onResetXP }) => {
	const [walkData, setWalkData] = useState({
		duration: 30,
		distance: 2,
		activityType: 'casual',
		bonuses: [],
	});

	const [showSimulator, setShowSimulator] = useState(false);

	const handleSimulateWalk = () => {
		const xpGained = calculateXPForWalk(
			walkData.duration,
			walkData.distance,
			walkData.activityType,
			walkData.bonuses
		);

		onXPGained(dog.id, xpGained);

		// Show success message
		alert(`🎉 Walk completed! ${dog.dogName} gained ${xpGained} XP!`);
	};

	const toggleBonus = bonus => {
		setWalkData(prev => ({
			...prev,
			bonuses: prev.bonuses.includes(bonus)
				? prev.bonuses.filter(b => b !== bonus)
				: [...prev.bonuses, bonus],
		}));
	};

	if (!showSimulator) {
		return (
			<div className='text-center'>
				<button
					onClick={() => setShowSimulator(true)}
					className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm'
				>
					🚶 Simulate Walk (Dev Tool)
				</button>
			</div>
		);
	}

	const previewXP = calculateXPForWalk(
		walkData.duration,
		walkData.distance,
		walkData.activityType,
		walkData.bonuses
	);

	return (
		<div className='bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4'>
			<div className='flex justify-between items-center mb-4'>
				<h4 className='text-sm font-semibold text-blue-800'>🚶 Walk Simulator</h4>
				<button
					onClick={() => setShowSimulator(false)}
					className='text-blue-600 hover:text-blue-800 text-sm'
				>
					×
				</button>
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4'>
				<div>
					<label className='block text-xs font-medium text-blue-700 mb-1'>Duration (minutes)</label>
					<input
						type='number'
						value={walkData.duration}
						onChange={e =>
							setWalkData(prev => ({ ...prev, duration: parseInt(e.target.value) || 0 }))
						}
						className='w-full px-3 py-2 border border-blue-300 rounded-lg text-sm'
						min='5'
						max='180'
					/>
				</div>

				<div>
					<label className='block text-xs font-medium text-blue-700 mb-1'>Distance (km)</label>
					<input
						type='number'
						step='0.1'
						value={walkData.distance}
						onChange={e =>
							setWalkData(prev => ({ ...prev, distance: parseFloat(e.target.value) || 0 }))
						}
						className='w-full px-3 py-2 border border-blue-300 rounded-lg text-sm'
						min='0.1'
						max='20'
					/>
				</div>

				<div className='sm:col-span-2'>
					<label className='block text-xs font-medium text-blue-700 mb-1'>Activity Type</label>
					<select
						value={walkData.activityType}
						onChange={e => setWalkData(prev => ({ ...prev, activityType: e.target.value }))}
						className='w-full px-3 py-2 border border-blue-300 rounded-lg text-sm'
					>
						<option value='casual'>Casual Walk (1.0x XP)</option>
						<option value='training'>Training Session (1.5x XP)</option>
						<option value='playgroup'>Playgroup (1.2x XP)</option>
						<option value='active'>Active/Hiking (2.0x XP)</option>
					</select>
				</div>
			</div>

			{/* Achievement Bonuses */}
			<div className='mb-4'>
				<label className='block text-xs font-medium text-blue-700 mb-2'>Achievement Bonuses</label>
				<div className='flex flex-wrap gap-2'>
					{Object.entries(EXPERIENCE_SYSTEM.ACHIEVEMENT_BONUSES).map(([bonus, xp]) => (
						<button
							key={bonus}
							onClick={() => toggleBonus(bonus)}
							className={`px-2 py-1 text-xs rounded ${
								walkData.bonuses.includes(bonus)
									? 'bg-blue-500 text-white'
									: 'bg-blue-100 text-blue-700 hover:bg-blue-200'
							}`}
						>
							{bonus.replace('_', ' ')} (+{xp})
						</button>
					))}
				</div>
			</div>

			{/* XP Preview */}
			<div className='bg-white rounded-lg p-3 mb-4'>
				<div className='text-sm text-gray-600 mb-2'>Walk Preview:</div>
				<div className='text-lg font-bold text-green-600'>+{previewXP} XP</div>
				<div className='text-xs text-gray-500'>
					Base: {walkData.duration * EXPERIENCE_SYSTEM.BASE_XP_PER_MINUTE} XP ×{' '}
					{EXPERIENCE_SYSTEM.DIFFICULTY_MULTIPLIERS[walkData.activityType]}x (difficulty) +{' '}
					{walkData.distance * EXPERIENCE_SYSTEM.DISTANCE_BONUS_XP} (distance)
					{walkData.bonuses.length > 0 &&
						` + ${walkData.bonuses.reduce(
							(sum, bonus) => sum + EXPERIENCE_SYSTEM.ACHIEVEMENT_BONUSES[bonus],
							0
						)} (bonuses)`}
				</div>
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
				<button
					onClick={handleSimulateWalk}
					className='bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors font-medium'
				>
					🏃 Complete Walk (+{previewXP} XP)
				</button>

				{onResetXP && (
					<button
						onClick={() => onResetXP(dog.id)}
						className='bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors font-medium'
					>
						🔄 Reset XP
					</button>
				)}
			</div>
		</div>
	);
};

XPSimulator.propTypes = {
	dog: PropTypes.object.isRequired,
	onXPGained: PropTypes.func.isRequired,
	onResetXP: PropTypes.func,
};
