// WalkingHistory - Shows user's check-in history and walking statistics
// Displays past walks, achievements, and activity summary

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const WalkingHistory = () => {
	const navigate = useNavigate();
	const [checkIns, setCheckIns] = useState([]);
	const [stats, setStats] = useState({
		totalWalks: 0,
		totalDistance: 0,
		uniquePlaces: 0,
		thisMonth: 0,
	});

	// Load check-ins from localStorage
	useEffect(() => {
		const savedCheckIns = localStorage.getItem('walkieWalkie_checkIns');
		if (savedCheckIns) {
			try {
				const parsedCheckIns = JSON.parse(savedCheckIns);
				// Sort by date (newest first)
				const sortedCheckIns = parsedCheckIns.sort((a, b) => new Date(b.date) - new Date(a.date));
				setCheckIns(sortedCheckIns);

				// Calculate statistics
				const totalWalks = sortedCheckIns.length;
				const totalDistance = sortedCheckIns.reduce((total, checkIn) => {
					const distance = parseFloat(checkIn.distance);
					return total + (isNaN(distance) ? 0 : distance);
				}, 0);
				const uniquePlaces = new Set(sortedCheckIns.map(checkIn => checkIn.placeId)).size;

				// Count walks this month
				const now = new Date();
				const thisMonth = sortedCheckIns.filter(checkIn => {
					const checkInDate = new Date(checkIn.date);
					return (
						checkInDate.getMonth() === now.getMonth() &&
						checkInDate.getFullYear() === now.getFullYear()
					);
				}).length;

				setStats({
					totalWalks,
					totalDistance: Math.round(totalDistance * 10) / 10, // Round to 1 decimal
					uniquePlaces,
					thisMonth,
				});
			} catch (error) {
				console.error('Error loading walking history:', error);
			}
		}
	}, []);

	const formatDate = dateString => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			weekday: 'short',
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		});
	};

	const formatTime = dateString => {
		const date = new Date(dateString);
		return date.toLocaleTimeString('en-US', {
			hour: 'numeric',
			minute: '2-digit',
			hour12: true,
		});
	};

	const getDifficultyColor = difficulty => {
		switch (difficulty?.toLowerCase()) {
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

	const getAchievements = () => {
		const achievements = [];

		if (stats.totalWalks >= 1)
			achievements.push({ emoji: '🎯', title: 'First Walk', desc: 'Completed your first walk!' });
		if (stats.totalWalks >= 5)
			achievements.push({ emoji: '🏃', title: 'Regular Walker', desc: '5 walks completed' });
		if (stats.totalWalks >= 10)
			achievements.push({ emoji: '🌟', title: 'Walking Star', desc: '10 walks completed' });
		if (stats.totalWalks >= 20)
			achievements.push({ emoji: '🏆', title: 'Walking Champion', desc: '20 walks completed' });
		if (stats.uniquePlaces >= 3)
			achievements.push({ emoji: '🗺️', title: 'Explorer', desc: 'Visited 3+ different places' });
		if (stats.uniquePlaces >= 5)
			achievements.push({
				emoji: '🧭',
				title: 'Adventure Seeker',
				desc: 'Visited 5+ different places',
			});
		if (stats.totalDistance >= 10)
			achievements.push({ emoji: '🚀', title: 'Distance Walker', desc: 'Walked 10+ km total' });
		if (stats.totalDistance >= 25)
			achievements.push({ emoji: '🌍', title: 'Long Distance', desc: 'Walked 25+ km total' });

		return achievements;
	};

	const achievements = getAchievements();

	return (
		<div className='walkie-background min-h-screen'>
			<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8'>
				{/* Page Header */}
				<div className='text-center mb-6 sm:mb-8'>
					<h1 className='walkie-main-title text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4'>
						📋 Walking History
					</h1>
					<p className='walkie-subtitle text-base sm:text-lg max-w-2xl mx-auto px-4'>
						Track your walking adventures and see your progress over time
					</p>
				</div>

				{/* Statistics Cards */}
				<div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
					<div className='walkie-section-border bg-white rounded-xl border border-gray-200 shadow-sm p-4 text-center'>
						<div className='text-3xl mb-2'>🚶‍♀️</div>
						<div className='text-2xl font-bold walkie-main-title'>{stats.totalWalks}</div>
						<div className='text-sm walkie-subtitle'>Total Walks</div>
					</div>
					<div className='walkie-section-border bg-white rounded-xl border border-gray-200 shadow-sm p-4 text-center'>
						<div className='text-3xl mb-2'>📏</div>
						<div className='text-2xl font-bold walkie-main-title'>{stats.totalDistance} km</div>
						<div className='text-sm walkie-subtitle'>Total Distance</div>
					</div>
					<div className='walkie-section-border bg-white rounded-xl border border-gray-200 shadow-sm p-4 text-center'>
						<div className='text-3xl mb-2'>📍</div>
						<div className='text-2xl font-bold walkie-main-title'>{stats.uniquePlaces}</div>
						<div className='text-sm walkie-subtitle'>Places Visited</div>
					</div>
					<div className='walkie-section-border bg-white rounded-xl border border-gray-200 shadow-sm p-4 text-center'>
						<div className='text-3xl mb-2'>📅</div>
						<div className='text-2xl font-bold walkie-main-title'>{stats.thisMonth}</div>
						<div className='text-sm walkie-subtitle'>This Month</div>
					</div>
				</div>

				{/* Achievements */}
				{achievements.length > 0 && (
					<div className='walkie-section-border bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6 mb-6'>
						<h3 className='text-lg sm:text-xl font-bold text-gray-900 mb-4'>🏆 Achievements</h3>
						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
							{achievements.map((achievement, index) => (
								<div
									key={index}
									className='flex items-center p-3 bg-orange-50 border border-orange-200 rounded-lg'
								>
									<div className='text-2xl mr-3'>{achievement.emoji}</div>
									<div>
										<div className='font-semibold text-orange-800'>{achievement.title}</div>
										<div className='text-sm text-orange-600'>{achievement.desc}</div>
									</div>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Recent Walks */}
				<div className='walkie-section-border bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6'>
					<div className='flex items-center justify-between mb-4'>
						<h3 className='text-lg sm:text-xl font-bold text-gray-900'>🦮 Recent Walks</h3>
						<button
							onClick={() => navigate('/routes')}
							className='text-orange-500 hover:text-orange-600 font-medium transition-colors text-sm'
						>
							Find New Routes →
						</button>
					</div>

					{checkIns.length > 0 ? (
						<div className='space-y-4'>
							{checkIns.map(checkIn => (
								<div
									key={checkIn.id}
									onClick={() => navigate(`/place-detail/${checkIn.placeId}`)}
									className='p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-all cursor-pointer'
								>
									<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
										<div className='flex-1'>
											<h4 className='font-semibold text-gray-900 mb-1'>{checkIn.placeName}</h4>
											<p className='text-sm text-gray-600 mb-2'>📍 {checkIn.location}</p>

											<div className='flex flex-wrap gap-2 items-center'>
												<span className='text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded'>
													📏 {checkIn.distance}
												</span>
												<span className='text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded'>
													⏱️ {checkIn.estimatedTime}
												</span>
												{checkIn.difficulty && (
													<span
														className={`text-xs px-2 py-1 rounded border ${getDifficultyColor(
															checkIn.difficulty
														)}`}
													>
														{checkIn.difficulty}
													</span>
												)}
											</div>
										</div>

										<div className='text-right text-sm text-gray-500'>
											<div>{formatDate(checkIn.date)}</div>
											<div>{formatTime(checkIn.date)}</div>
										</div>
									</div>
								</div>
							))}
						</div>
					) : (
						<div className='text-center py-8'>
							<div className='text-6xl mb-4'>🦮</div>
							<h3 className='text-xl font-bold text-gray-900 mb-2'>No walks yet!</h3>
							<p className='text-gray-600 mb-6'>
								Start exploring dog-friendly routes and check in to build your walking history.
							</p>
							<button
								onClick={() => navigate('/routes')}
								className='walkie-button inline-flex items-center justify-center font-medium text-white px-6 py-3 text-base rounded-lg min-h-[48px] touch-manipulation'
							>
								Discover Routes
							</button>
						</div>
					)}
				</div>

				{/* Back to My Walks */}
				<div className='text-center mt-6'>
					<button
						onClick={() => navigate('/my-walks')}
						className='text-gray-600 hover:text-orange-500 transition-colors'
					>
						← Back to My Walks
					</button>
				</div>
			</div>
		</div>
	);
};
