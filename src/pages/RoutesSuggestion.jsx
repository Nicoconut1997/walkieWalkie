// RoutesSuggestion - Page showing walking routes based on dog preferences
// Filters routes by user's walking preferences and displays matching options

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sampleRoutes } from '../data/sampleRoutes';

export const RoutesSuggestion = () => {
	const navigate = useNavigate();
	const [userPreferences, setUserPreferences] = useState([]);
	const [filteredRoutes, setFilteredRoutes] = useState(sampleRoutes);
	const [selectedDifficulty, setSelectedDifficulty] = useState('all');
	const [selectedDistance, setSelectedDistance] = useState('all');

	// Load user preferences from localStorage
	useEffect(() => {
		const savedProfile = localStorage.getItem('walkieWalkie_dogProfile');
		if (savedProfile) {
			try {
				const parsedProfile = JSON.parse(savedProfile);
				setUserPreferences(parsedProfile.walkingPreferences || []);
			} catch (error) {
				console.error('Error loading dog profile:', error);
			}
		}
	}, []);

	// Filter routes based on preferences and filters
	useEffect(() => {
		let routes = sampleRoutes;

		// Filter by user preferences (if any)
		if (userPreferences.length > 0) {
			routes = routes.filter(route => route.tags.some(tag => userPreferences.includes(tag)));
		}

		// Filter by difficulty
		if (selectedDifficulty !== 'all') {
			routes = routes.filter(
				route => route.difficulty.toLowerCase() === selectedDifficulty.toLowerCase()
			);
		}

		// Filter by distance
		if (selectedDistance !== 'all') {
			routes = routes.filter(route => {
				const distance = parseFloat(route.distance);
				switch (selectedDistance) {
					case 'short':
						return distance <= 2.0;
					case 'medium':
						return distance > 2.0 && distance <= 3.5;
					case 'long':
						return distance > 3.5;
					default:
						return true;
				}
			});
		}

		setFilteredRoutes(routes);
	}, [userPreferences, selectedDifficulty, selectedDistance]);

	const handleRouteClick = routeId => {
		navigate(`/place-detail/${routeId}`);
	};

	const getDifficultyColor = difficulty => {
		switch (difficulty.toLowerCase()) {
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

	const getMatchingPreferences = routeTags => {
		return routeTags.filter(tag => userPreferences.includes(tag));
	};

	return (
		<div className='walkie-background min-h-screen'>
			<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8'>
				{/* Page Header */}
				<div className='text-center mb-6 sm:mb-8'>
					<h1 className='walkie-main-title text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4'>
						🗺️ Route Suggestions
					</h1>
					<p className='walkie-subtitle text-base sm:text-lg max-w-3xl mx-auto px-4'>
						Discover perfect walking routes tailored to your dog's preferences and energy level
					</p>
				</div>

				{/* User Preferences Display */}
				{userPreferences.length > 0 && (
					<div className='walkie-section-border bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6 mb-6'>
						<h3 className='text-lg font-semibold text-gray-900 mb-3'>
							🎯 Based on your preferences:
						</h3>
						<div className='flex flex-wrap gap-2'>
							{userPreferences.map((pref, index) => (
								<span
									key={index}
									className='px-3 py-1 bg-orange-50 border border-orange-200 text-orange-800 rounded-full text-sm'
								>
									{pref}
								</span>
							))}
						</div>
					</div>
				)}

				{/* Filters */}
				<div className='walkie-section-border bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6 mb-6'>
					<h3 className='text-lg font-semibold text-gray-900 mb-4'>🔍 Filter Routes</h3>
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
						{/* Difficulty Filter */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								Difficulty Level
							</label>
							<select
								value={selectedDifficulty}
								onChange={e => setSelectedDifficulty(e.target.value)}
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-colors text-sm min-h-[44px]'
							>
								<option value='all'>All Difficulties</option>
								<option value='easy'>Easy</option>
								<option value='moderate'>Moderate</option>
								<option value='hard'>Hard</option>
							</select>
						</div>

						{/* Distance Filter */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>Distance Range</label>
							<select
								value={selectedDistance}
								onChange={e => setSelectedDistance(e.target.value)}
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-colors text-sm min-h-[44px]'
							>
								<option value='all'>All Distances</option>
								<option value='short'>Short (≤ 2km)</option>
								<option value='medium'>Medium (2-3.5km)</option>
								<option value='long'>Long (&gt; 3.5km)</option>
							</select>
						</div>

						{/* Results Count */}
						<div className='flex items-end'>
							<div className='w-full'>
								<label className='block text-sm font-medium text-gray-700 mb-2'>
									Results Found
								</label>
								<div className='px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 text-sm min-h-[44px] flex items-center'>
									{filteredRoutes.length} route{filteredRoutes.length !== 1 ? 's' : ''}
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Routes Grid */}
				{filteredRoutes.length > 0 ? (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{filteredRoutes.map(route => {
							const matchingPrefs = getMatchingPreferences(route.tags);
							return (
								<div
									key={route.id}
									onClick={() => handleRouteClick(route.id)}
									className='walkie-section-border bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6 cursor-pointer hover:transform hover:scale-105 transition-all duration-200 hover:shadow-lg'
								>
									{/* Route Header */}
									<div className='mb-3'>
										<h3 className='walkie-main-title text-lg sm:text-xl font-bold mb-2 leading-tight'>
											{route.name}
										</h3>
										<p className='walkie-subtitle text-sm text-gray-600'>📍 {route.location}</p>
									</div>

									{/* Route Stats */}
									<div className='grid grid-cols-2 gap-2 mb-3 text-xs sm:text-sm'>
										<div className='flex items-center'>
											<span className='walkie-subtitle'>📏 {route.distance}</span>
										</div>
										<div className='flex items-center'>
											<span className='walkie-subtitle'>⏱️ {route.estimatedTime}</span>
										</div>
									</div>

									{/* Difficulty Badge */}
									<div className='mb-3'>
										<span
											className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(
												route.difficulty
											)}`}
										>
											{route.difficulty}
										</span>
									</div>

									{/* Matching Preferences */}
									{matchingPrefs.length > 0 && (
										<div className='mb-3'>
											<p className='text-xs text-orange-600 font-medium mb-1'>
												✨ Matches {matchingPrefs.length} preference
												{matchingPrefs.length !== 1 ? 's' : ''}:
											</p>
											<div className='flex flex-wrap gap-1'>
												{matchingPrefs.slice(0, 3).map((pref, index) => (
													<span
														key={index}
														className='px-2 py-1 bg-orange-50 text-orange-700 rounded-md text-xs'
													>
														{pref}
													</span>
												))}
												{matchingPrefs.length > 3 && (
													<span className='px-2 py-1 bg-gray-50 text-gray-600 rounded-md text-xs'>
														+{matchingPrefs.length - 3} more
													</span>
												)}
											</div>
										</div>
									)}

									{/* Rating and Check-ins */}
									<div className='flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100'>
										<div className='flex items-center'>
											<span>⭐ {route.rating}</span>
										</div>
										<div className='flex items-center'>
											<span>👥 {route.checkIns} check-ins</span>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				) : (
					<div className='walkie-section-border bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center'>
						<div className='text-6xl mb-4'>🔍</div>
						<h3 className='text-xl font-bold text-gray-900 mb-2'>No routes found</h3>
						<p className='text-gray-600 mb-4'>
							Try adjusting your filters or updating your walking preferences in your dog profile.
						</p>
						<button
							onClick={() => navigate('/profile')}
							className='walkie-button inline-flex items-center justify-center font-medium text-white px-6 py-3 text-base rounded-lg min-h-[48px] touch-manipulation'
						>
							Update Preferences
						</button>
					</div>
				)}
			</div>
		</div>
	);
};
