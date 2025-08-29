// AchievementSimulator - Development tool for testing achievement system
// Allows manually adding/removing achievements to verify the badge system works

import { useState } from 'react';
import { ACHIEVEMENTS, getAchievementById, calculateAchievementBonus } from '../data/constants';

export const AchievementSimulator = ({ dog, onAchievementUpdate }) => {
	const [selectedAchievement, setSelectedAchievement] = useState('');
	const [isExpanded, setIsExpanded] = useState(false);

	const currentAchievements = dog.achievements || [];
	const availableAchievements = Object.keys(ACHIEVEMENTS).filter(
		id => !currentAchievements.includes(id)
	);

	const handleAddAchievement = () => {
		if (!selectedAchievement || currentAchievements.includes(selectedAchievement)) {
			return;
		}

		const achievement = getAchievementById(selectedAchievement);
		if (!achievement) return;

		// Add achievement and apply bonus XP
		const newAchievements = [...currentAchievements, selectedAchievement];
		const bonusXP = achievement.xpBonus || 0;

		onAchievementUpdate(dog.id, {
			achievements: newAchievements,
			totalXP: (dog.totalXP || 0) + bonusXP,
		});

		// Show notification
		alert(`🏆 Achievement Added!\n${achievement.emoji} ${achievement.name}\n+${bonusXP} XP`);

		setSelectedAchievement('');
	};

	const handleRemoveAchievement = achievementId => {
		const achievement = getAchievementById(achievementId);
		if (!achievement) return;

		const newAchievements = currentAchievements.filter(id => id !== achievementId);
		const bonusXP = achievement.xpBonus || 0;

		onAchievementUpdate(dog.id, {
			achievements: newAchievements,
			totalXP: Math.max(0, (dog.totalXP || 0) - bonusXP),
		});

		alert(`❌ Achievement Removed!\n${achievement.emoji} ${achievement.name}\n-${bonusXP} XP`);
	};

	const handleResetAllAchievements = () => {
		if (!window.confirm('Reset all achievements? This will remove all badges and bonus XP.')) {
			return;
		}

		const totalBonusXP = calculateAchievementBonus(currentAchievements);

		onAchievementUpdate(dog.id, {
			achievements: [],
			totalXP: Math.max(0, (dog.totalXP || 0) - totalBonusXP),
		});

		alert(`🔄 All achievements reset!\n-${totalBonusXP} XP removed`);
	};

	const handleUnlockAll = () => {
		if (!window.confirm('Unlock ALL achievements? This will add every badge and lots of XP.')) {
			return;
		}

		const allAchievementIds = Object.keys(ACHIEVEMENTS);
		const totalBonusXP = calculateAchievementBonus(allAchievementIds);

		onAchievementUpdate(dog.id, {
			achievements: allAchievementIds,
			totalXP: (dog.totalXP || 0) + calculateAchievementBonus(availableAchievements),
		});

		alert(
			`🎉 All achievements unlocked!\n+${calculateAchievementBonus(availableAchievements)} XP added`
		);
	};

	if (!isExpanded) {
		return (
			<div className='bg-purple-50 border border-purple-200 rounded-lg p-3'>
				<button
					onClick={() => setIsExpanded(true)}
					className='w-full text-left flex items-center justify-between text-purple-700 font-medium'
				>
					<span>🛠️ Achievement Dev Tools</span>
					<span className='text-sm'>Click to expand</span>
				</button>
			</div>
		);
	}

	return (
		<div className='bg-purple-50 border border-purple-200 rounded-lg p-4'>
			<div className='flex items-center justify-between mb-4'>
				<h3 className='text-lg font-semibold text-purple-800'>🛠️ Achievement Dev Tools</h3>
				<button
					onClick={() => setIsExpanded(false)}
					className='text-purple-600 hover:text-purple-800 text-sm'
				>
					Minimize
				</button>
			</div>

			{/* Current Achievements */}
			<div className='mb-4'>
				<h4 className='text-sm font-semibold text-purple-700 mb-2'>
					Current Achievements ({currentAchievements.length})
				</h4>
				{currentAchievements.length > 0 ? (
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-32 overflow-y-auto'>
						{currentAchievements.map(id => {
							const achievement = getAchievementById(id);
							if (!achievement) return null;
							return (
								<div
									key={id}
									className='flex items-center justify-between bg-white rounded p-2 text-sm'
								>
									<span>
										{achievement.emoji} {achievement.name}
									</span>
									<button
										onClick={() => handleRemoveAchievement(id)}
										className='text-red-500 hover:text-red-700 text-xs px-2 py-1 rounded bg-red-50 hover:bg-red-100'
									>
										Remove
									</button>
								</div>
							);
						})}
					</div>
				) : (
					<p className='text-sm text-purple-600 italic'>No achievements yet</p>
				)}
			</div>

			{/* Add Achievement */}
			<div className='mb-4'>
				<h4 className='text-sm font-semibold text-purple-700 mb-2'>Add Achievement</h4>
				<div className='flex gap-2'>
					<select
						value={selectedAchievement}
						onChange={e => setSelectedAchievement(e.target.value)}
						className='flex-1 rounded border border-purple-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500'
					>
						<option value=''>Select achievement to add...</option>
						{availableAchievements.map(id => {
							const achievement = getAchievementById(id);
							return (
								<option key={id} value={id}>
									{achievement.emoji} {achievement.name} (+{achievement.xpBonus} XP)
								</option>
							);
						})}
					</select>
					<button
						onClick={handleAddAchievement}
						disabled={!selectedAchievement}
						className='px-4 py-2 bg-purple-600 text-white rounded text-sm font-medium hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed'
					>
						Add
					</button>
				</div>
			</div>

			{/* Bulk Actions */}
			<div className='flex gap-2'>
				<button
					onClick={handleUnlockAll}
					disabled={availableAchievements.length === 0}
					className='flex-1 px-3 py-2 bg-green-600 text-white rounded text-sm font-medium hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed'
				>
					🎉 Unlock All ({availableAchievements.length})
				</button>
				<button
					onClick={handleResetAllAchievements}
					disabled={currentAchievements.length === 0}
					className='flex-1 px-3 py-2 bg-red-600 text-white rounded text-sm font-medium hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed'
				>
					🔄 Reset All
				</button>
			</div>

			{/* Stats */}
			<div className='mt-4 pt-3 border-t border-purple-200'>
				<div className='grid grid-cols-3 gap-4 text-center text-sm'>
					<div>
						<div className='font-semibold text-purple-800'>{currentAchievements.length}</div>
						<div className='text-purple-600'>Earned</div>
					</div>
					<div>
						<div className='font-semibold text-purple-800'>{availableAchievements.length}</div>
						<div className='text-purple-600'>Available</div>
					</div>
					<div>
						<div className='font-semibold text-purple-800'>
							{calculateAchievementBonus(currentAchievements)}
						</div>
						<div className='text-purple-600'>Bonus XP</div>
					</div>
				</div>
			</div>

			{/* Achievement Categories Preview */}
			<details className='mt-4'>
				<summary className='text-sm font-medium text-purple-700 cursor-pointer hover:text-purple-800'>
					View All Achievements ({Object.keys(ACHIEVEMENTS).length})
				</summary>
				<div className='mt-2 max-h-40 overflow-y-auto'>
					{Object.entries(ACHIEVEMENTS).map(([id, achievement]) => (
						<div
							key={id}
							className={`flex items-center justify-between p-2 text-xs rounded mb-1 ${
								currentAchievements.includes(id)
									? 'bg-green-100 text-green-800'
									: 'bg-gray-100 text-gray-600'
							}`}
						>
							<span>
								{achievement.emoji} {achievement.name}
							</span>
							<div className='flex items-center gap-2'>
								<span className='text-purple-600'>+{achievement.xpBonus} XP</span>
								{currentAchievements.includes(id) && (
									<span className='text-green-600 text-xs'>✓</span>
								)}
							</div>
						</div>
					))}
				</div>
			</details>
		</div>
	);
};
