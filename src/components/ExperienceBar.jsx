// ExperienceBar - Solo Leveling inspired XP visualization component
// Shows level, current XP, progress bar, and next level requirements

import PropTypes from 'prop-types';
import {
	calculateLevelFromXP,
	calculateXPForNextLevel,
	calculateXPForCurrentLevel,
	EXPERIENCE_SYSTEM,
} from '../data/constants';

export const ExperienceBar = ({ totalXP, showDetails = true, compact = false }) => {
	// Always calculate level fresh from totalXP to avoid sync issues
	const currentLevel = calculateLevelFromXP(totalXP || 0);
	const currentLevelStartXP = calculateXPForCurrentLevel(currentLevel); // XP where current level started
	const nextLevelXP = calculateXPForNextLevel(currentLevel);
	const currentLevelProgress = totalXP - currentLevelStartXP; // Progress within current level
	const xpNeededForNext = nextLevelXP - currentLevelStartXP; // Total XP needed for current level
	const progressPercentage = Math.max(
		0,
		Math.min(100, (currentLevelProgress / xpNeededForNext) * 100)
	);

	const isMaxLevel = currentLevel >= EXPERIENCE_SYSTEM.LEVEL_PROGRESSION.MAX_LEVEL;
	const isMilestone = EXPERIENCE_SYSTEM.MILESTONE_LEVELS.includes(currentLevel);

	// Visual styling based on level and milestones
	const getLevelBadgeStyle = () => {
		if (isMaxLevel) {
			return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg';
		}
		if (isMilestone) {
			return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md';
		}
		if (currentLevel >= 25) {
			return 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white';
		}
		if (currentLevel >= 10) {
			return 'bg-gradient-to-r from-green-500 to-teal-500 text-white';
		}
		return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
	};

	const getProgressBarStyle = () => {
		if (isMaxLevel) {
			return 'bg-gradient-to-r from-yellow-400 to-orange-500';
		}
		if (isMilestone) {
			return 'bg-gradient-to-r from-purple-400 to-pink-400';
		}
		if (currentLevel >= 25) {
			return 'bg-gradient-to-r from-blue-400 to-indigo-500';
		}
		if (currentLevel >= 10) {
			return 'bg-gradient-to-r from-green-400 to-teal-400';
		}
		return 'bg-gradient-to-r from-gray-400 to-gray-500';
	};

	if (compact) {
		return (
			<div className='flex items-center gap-2'>
				<div className={`px-2 py-1 rounded-md text-xs font-bold ${getLevelBadgeStyle()}`}>
					Lv.{currentLevel}
				</div>
				<div className='flex-1 bg-gray-200 rounded-full h-2 overflow-hidden'>
					<div
						className={`h-full transition-all duration-500 ${getProgressBarStyle()}`}
						style={{ width: `${isMaxLevel ? 100 : progressPercentage}%` }}
					/>
				</div>
				{!isMaxLevel && (
					<span className='text-xs text-gray-600'>
						{currentLevelProgress}/{xpNeededForNext}
					</span>
				)}
			</div>
		);
	}

	return (
		<div className='bg-white rounded-xl border border-gray-200 p-4 shadow-sm'>
			{showDetails && (
				<div className='flex items-center justify-between mb-3'>
					<h4 className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
						⚡ Experience Level
						{isMilestone && (
							<span className='text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full'>
								Milestone!
							</span>
						)}
					</h4>
					<div className='text-xs text-gray-500'>Total XP: {totalXP.toLocaleString()}</div>
				</div>
			)}

			<div className='flex items-center gap-4'>
				{/* Level Badge */}
				<div className={`px-4 py-2 rounded-lg font-bold text-lg ${getLevelBadgeStyle()}`}>
					{isMaxLevel ? (
						<span className='flex items-center gap-1'>👑 MAX</span>
					) : (
						`Lv.${currentLevel}`
					)}
				</div>

				{/* Progress Section */}
				<div className='flex-1'>
					{/* Progress Bar */}
					<div className='bg-gray-200 rounded-full h-4 overflow-hidden mb-2 shadow-inner'>
						<div
							className={`h-full transition-all duration-700 ease-out ${getProgressBarStyle()} ${
								progressPercentage > 0 ? 'shadow-sm' : ''
							}`}
							style={{ width: `${isMaxLevel ? 100 : progressPercentage}%` }}
						/>
					</div>

					{/* Progress Text */}
					<div className='flex justify-between items-center text-sm'>
						{isMaxLevel ? (
							<span className='text-yellow-600 font-semibold'>🎉 Max Level Reached!</span>
						) : (
							<>
								<span className='text-gray-600'>
									{currentLevelProgress.toLocaleString()} / {xpNeededForNext.toLocaleString()} XP
								</span>
								<span className='text-gray-500 text-xs'>
									{Math.round(progressPercentage)}% to Lv.{currentLevel + 1}
								</span>
							</>
						)}
					</div>
				</div>
			</div>

			{showDetails && !isMaxLevel && (
				<div className='mt-3 pt-3 border-t border-gray-100'>
					<div className='flex justify-between text-xs text-gray-500'>
						<span>XP needed for next level: {(nextLevelXP - totalXP).toLocaleString()}</span>
						{isMilestone && (
							<span className='text-purple-600 font-medium'>🌟 Milestone Level!</span>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

ExperienceBar.propTypes = {
	totalXP: PropTypes.number.isRequired,
	showDetails: PropTypes.bool,
	compact: PropTypes.bool,
};
