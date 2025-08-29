// BadgeDisplay - Shows achievements and badges earned by a dog
// Displays earned achievements with visual badges and progress indicators

import { ACHIEVEMENTS, getAchievementById } from '../data/constants';

export const BadgeDisplay = ({ dog, compact = false }) => {
	const earnedAchievements = dog.achievements || [];
	const earnedBadges = earnedAchievements.map(id => getAchievementById(id)).filter(Boolean);

	// Group achievements by category
	const groupedBadges = earnedBadges.reduce((groups, badge) => {
		const category = badge.category || 'other';
		if (!groups[category]) {
			groups[category] = [];
		}
		groups[category].push(badge);
		return groups;
	}, {});

	if (compact) {
		// Compact view for smaller spaces
		return (
			<div className='bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-3'>
				<div className='flex items-center justify-between mb-2'>
					<h4 className='text-sm font-semibold text-gray-800'>🏆 Achievements</h4>
					<span className='text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full'>
						{earnedAchievements.length}
					</span>
				</div>

				{earnedAchievements.length > 0 ? (
					<div className='flex flex-wrap gap-1'>
						{earnedBadges.slice(0, 6).map(badge => (
							<div
								key={badge.id}
								className='flex items-center bg-white rounded-full px-2 py-1 shadow-sm border border-gray-200'
								title={`${badge.name}: ${badge.description}`}
							>
								<span className='text-sm mr-1'>{badge.emoji}</span>
								<span className='text-xs font-medium text-gray-700 hidden sm:inline'>
									{badge.name}
								</span>
							</div>
						))}
						{earnedBadges.length > 6 && (
							<div className='flex items-center bg-gray-100 rounded-full px-2 py-1'>
								<span className='text-xs text-gray-600'>+{earnedBadges.length - 6}</span>
							</div>
						)}
					</div>
				) : (
					<p className='text-xs text-gray-500'>Complete walks to earn your first badge!</p>
				)}
			</div>
		);
	}

	// Full view for main profile display
	return (
		<div className='bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4 sm:p-6'>
			<div className='flex items-center justify-between mb-4'>
				<h3 className='text-lg sm:text-xl font-bold text-gray-800 flex items-center'>
					🏆 <span className='ml-2'>Achievements</span>
				</h3>
				<div className='bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-sm font-semibold'>
					{earnedAchievements.length} Earned
				</div>
			</div>

			{earnedAchievements.length > 0 ? (
				<div className='space-y-4'>
					{Object.entries(groupedBadges).map(([category, badges]) => (
						<div key={category}>
							<h4 className='text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2 capitalize'>
								{category} ({badges.length})
							</h4>
							<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
								{badges.map(badge => (
									<div
										key={badge.id}
										className='bg-white rounded-lg p-3 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200'
									>
										<div className='flex items-start'>
											<div className='text-2xl mr-3 flex-shrink-0'>{badge.emoji}</div>
											<div className='flex-1 min-w-0'>
												<h5 className='text-sm font-semibold text-gray-800 truncate'>
													{badge.name}
												</h5>
												<p className='text-xs text-gray-600 mt-1 leading-relaxed'>
													{badge.description}
												</p>
												{badge.xpBonus > 0 && (
													<div className='mt-2'>
														<span className='inline-flex items-center bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full'>
															+{badge.xpBonus} XP
														</span>
													</div>
												)}
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			) : (
				<div className='text-center py-8'>
					<div className='text-4xl mb-3'>🎯</div>
					<h4 className='text-lg font-semibold text-gray-700 mb-2'>No Achievements Yet</h4>
					<p className='text-gray-600 text-sm max-w-sm mx-auto'>
						Complete walks and reach milestones to earn your first badges! Each achievement comes
						with bonus XP.
					</p>
				</div>
			)}

			{/* Quick Stats */}
			{earnedAchievements.length > 0 && (
				<div className='mt-6 pt-4 border-t border-yellow-200'>
					<div className='grid grid-cols-2 sm:grid-cols-4 gap-4 text-center'>
						<div>
							<div className='text-lg font-bold text-gray-800'>{earnedAchievements.length}</div>
							<div className='text-xs text-gray-600'>Total Badges</div>
						</div>
						<div>
							<div className='text-lg font-bold text-gray-800'>
								{Object.keys(groupedBadges).length}
							</div>
							<div className='text-xs text-gray-600'>Categories</div>
						</div>
						<div>
							<div className='text-lg font-bold text-gray-800'>
								{earnedBadges.reduce((sum, badge) => sum + badge.xpBonus, 0)}
							</div>
							<div className='text-xs text-gray-600'>Bonus XP</div>
						</div>
						<div>
							<div className='text-lg font-bold text-gray-800'>
								{Math.round((earnedAchievements.length / Object.keys(ACHIEVEMENTS).length) * 100)}%
							</div>
							<div className='text-xs text-gray-600'>Completion</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
