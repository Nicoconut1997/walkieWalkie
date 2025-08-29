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

	const [isExpanded, setIsExpanded] = useState(false);

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

	if (!isExpanded) {
		return (
			<div className='bg-purple-50 border border-purple-200 rounded-lg p-3'>
				<button
					onClick={() => setIsExpanded(true)}
					className='w-full text-left flex items-center justify-between text-purple-700 font-medium'
				>
					<span>🚶 Walk Simulator</span>
					<span className='text-sm'>Click to expand</span>
				</button>
			</div>
		);
	}

	const simulatedXP = calculateXPForWalk(
		walkData.duration,
		walkData.distance,
		walkData.activityType,
		walkData.bonuses
	);

	return (
		<div className='bg-purple-50 border border-purple-200 rounded-lg p-4'>
			<div className='flex items-center justify-between mb-4'>
				<h3 className='text-lg font-semibold text-purple-800'>🚶 Walk Simulator</h3>
				<button
					onClick={() => setIsExpanded(false)}
					className='text-purple-600 hover:text-purple-800 text-sm'
				>
					Minimize
				</button>
			</div>

			{/* Walk Parameters */}
			<div className='mb-4'>
				<h4 className='text-sm font-semibold text-purple-700 mb-2'>Walk Parameters</h4>
				<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
					<div>
						<label className='block text-xs font-medium text-purple-700 mb-1'>
							Duration (minutes)
						</label>
						<input
							type='number'
							value={walkData.duration}
							onChange={e =>
								setWalkData(prev => ({ ...prev, duration: parseInt(e.target.value) || 0 }))
							}
							className='w-full px-3 py-2 border border-purple-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500'
							min='5'
							max='180'
						/>
					</div>

					<div>
						<label className='block text-xs font-medium text-purple-700 mb-1'>Distance (km)</label>
						<input
							type='number'
							step='0.1'
							value={walkData.distance}
							onChange={e =>
								setWalkData(prev => ({ ...prev, distance: parseFloat(e.target.value) || 0 }))
							}
							className='w-full px-3 py-2 border border-purple-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500'
							min='0.1'
							max='20'
						/>
					</div>
				</div>
			</div>

			{/* Activity Type */}
			<div className='mb-4'>
				<h4 className='text-sm font-semibold text-purple-700 mb-2'>Activity Type</h4>
				<select
					value={walkData.activityType}
					onChange={e => setWalkData(prev => ({ ...prev, activityType: e.target.value }))}
					className='w-full px-3 py-2 border border-purple-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500'
				>
					{Object.keys(EXPERIENCE_SYSTEM.DIFFICULTY_MULTIPLIERS).map(type => (
						<option key={type} value={type}>
							{type.charAt(0).toUpperCase() + type.slice(1)} (x
							{EXPERIENCE_SYSTEM.DIFFICULTY_MULTIPLIERS[type]} XP)
						</option>
					))}
				</select>
			</div>

			{/* Achievement Bonuses */}
			<div className='mb-4'>
				<h4 className='text-sm font-semibold text-purple-700 mb-2'>
					Achievement Bonuses (Optional)
				</h4>
				<div className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
					{Object.entries(EXPERIENCE_SYSTEM.ACHIEVEMENT_BONUSES).map(([bonus, xp]) => (
						<label key={bonus} className='flex items-center text-xs bg-white rounded p-2'>
							<input
								type='checkbox'
								checked={walkData.bonuses.includes(bonus)}
								onChange={() => toggleBonus(bonus)}
								className='mr-2'
							/>
							{bonus.replace('_', ' ')} (+{xp})
						</label>
					))}
				</div>
			</div>

			{/* XP Preview */}
			<div className='bg-green-50 border border-green-200 rounded-lg p-3 mb-4'>
				<h4 className='text-sm font-semibold text-green-700 mb-2'>XP Preview</h4>
				<div className='text-xl font-bold text-green-800 mb-2'>{simulatedXP} XP</div>
				<div className='text-xs text-green-600 space-y-1'>
					<div>
						Base: {walkData.duration * EXPERIENCE_SYSTEM.BASE_XP_PER_MINUTE} XP ({walkData.duration}{' '}
						min × {EXPERIENCE_SYSTEM.BASE_XP_PER_MINUTE})
					</div>
					<div>
						Difficulty: ×{EXPERIENCE_SYSTEM.DIFFICULTY_MULTIPLIERS[walkData.activityType]} (
						{walkData.activityType})
					</div>
					<div>
						Distance: +{walkData.distance * EXPERIENCE_SYSTEM.DISTANCE_BONUS_XP} XP (
						{walkData.distance} km × {EXPERIENCE_SYSTEM.DISTANCE_BONUS_XP})
					</div>
					<div>
						Bonuses: +
						{walkData.bonuses.reduce(
							(sum, bonus) => sum + (EXPERIENCE_SYSTEM.ACHIEVEMENT_BONUSES[bonus] || 0),
							0
						)}{' '}
						XP
					</div>
				</div>
			</div>

			{/* Action Buttons */}
			<div className='flex gap-2'>
				<button
					onClick={handleSimulateWalk}
					className='flex-1 px-4 py-2 bg-purple-600 text-white rounded text-sm font-medium hover:bg-purple-700'
				>
					🎯 Simulate Walk
				</button>
				{onResetXP && (
					<button
						onClick={() => onResetXP(dog.id)}
						className='px-4 py-2 bg-red-600 text-white rounded text-sm font-medium hover:bg-red-700'
					>
						🔄 Reset XP
					</button>
				)}
			</div>

			{/* Stats */}
			<div className='mt-4 pt-3 border-t border-purple-200'>
				<div className='grid grid-cols-3 gap-4 text-center text-sm'>
					<div>
						<div className='font-semibold text-purple-800'>{dog.totalXP || 0}</div>
						<div className='text-purple-600'>Current XP</div>
					</div>
					<div>
						<div className='font-semibold text-purple-800'>{dog.level || 1}</div>
						<div className='text-purple-600'>Level</div>
					</div>
					<div>
						<div className='font-semibold text-purple-800'>{dog.walksCompleted || 0}</div>
						<div className='text-purple-600'>Walks</div>
					</div>
				</div>
			</div>
		</div>
	);
};

XPSimulator.propTypes = {
	dog: PropTypes.object.isRequired,
	onXPGained: PropTypes.func.isRequired,
	onResetXP: PropTypes.func,
};
