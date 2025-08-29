// EventsSearchAndFilter - Combined search and filtering component with all logic
// Handles search UI, filters UI, and all filtering logic for dog walking events

import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
	ENERGY_LEVELS,
	FRIENDLINESS_LEVELS,
	DOG_SIZES,
	TIME_OF_DAY,
	ACTIVITY_TYPES,
	DISTANCE_OPTIONS,
	WALKING_PREFERENCE_FILTERS,
	DEFAULT_FILTERS,
} from '../data/constants';

// Helper functions moved outside component to prevent recreation
const getTimeOfDay = startTime => {
	const hour = parseInt(startTime.split(':')[0]);
	const isPM = startTime.includes('pm');
	const hour24 = isPM && hour !== 12 ? hour + 12 : !isPM && hour === 12 ? 0 : hour;

	if (hour24 >= 6 && hour24 < 12) return 'morning';
	if (hour24 >= 12 && hour24 < 17) return 'afternoon';
	return 'evening';
};

const getActivityType = event => {
	const title = event.title.toLowerCase();
	const emoji = event.emoji;

	if (title.includes('training') || title.includes('puppy') || emoji === '🐶') return 'training';
	if (title.includes('social') || title.includes('playdate') || emoji === '🎉') return 'playgroup';
	if (title.includes('hike') || title.includes('adventure') || emoji === '⛰️') return 'active';
	return 'casual';
};

const getDogSizeCompatibility = event => {
	const title = event.title.toLowerCase();
	const attendeeCount = event.attendeeCount;

	if (title.includes('puppy') || title.includes('small')) return 'small';
	if (title.includes('large') || attendeeCount > 15) return 'large';
	if (title.includes('hike') || title.includes('adventure')) return 'large';
	return 'medium'; // Default to medium for most events
};

const getDistance = location => {
	const match = location.match(/\((\d+)km\)/);
	return match ? parseInt(match[1]) : 3; // Default 3km if not specified
};

const matchesProfile = (event, dogProfile) => {
	if (!dogProfile) return true;

	const activityType = getActivityType(event);
	const timeOfDay = getTimeOfDay(event.startTime);
	const dogSize = getDogSizeCompatibility(event);

	// Check walking preferences
	if (dogProfile.walkingPreferences) {
		const preferences = dogProfile.walkingPreferences.map(p => p.toLowerCase());
		if (preferences.includes('morning walks') && timeOfDay !== 'morning') return false;
		if (preferences.includes('social groups') && activityType !== 'playgroup') return false;
		if (preferences.includes('beach areas') && !event.location.toLowerCase().includes('beach'))
			return false;
	}

	// Check energy level compatibility
	if (dogProfile.energy === 'High' && activityType === 'casual') return false;
	if (dogProfile.energy === 'Low' && activityType === 'active') return false;

	// Check size compatibility
	if (dogProfile.size === 'Small' && dogSize === 'large') return false;
	if (dogProfile.size === 'Large' && dogSize === 'small') return false;

	return true;
};

export const EventsSearchAndFilter = ({
	events,
	dogProfile,
	userEventCount,
	onFilteredEventsChange,
}) => {
	const [showFilters, setShowFilters] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [filters, setFilters] = useState(DEFAULT_FILTERS);

	// Apply all filters to events
	const applyFilters = useCallback(() => {
		const filteredEvents = events.filter(event => {
			// Search term filter
			const matchesSearch =
				event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				event.location.toLowerCase().includes(searchTerm.toLowerCase());

			if (!matchesSearch) return false;

			// Smart match filter
			if (filters.smartMatch && !matchesProfile(event, dogProfile)) return false;

			// Time of day filter
			if (filters.timeOfDay !== 'all') {
				const eventTimeOfDay = getTimeOfDay(event.startTime);
				if (eventTimeOfDay !== filters.timeOfDay) return false;
			}

			// Dog size filter
			if (filters.dogSize !== 'all') {
				const eventDogSize = getDogSizeCompatibility(event);
				if (eventDogSize !== filters.dogSize) return false;
			}

			// Distance filter
			if (filters.distance !== 'all') {
				const eventDistance = getDistance(event.location);
				if (filters.distance === 'close' && eventDistance > 3) return false;
				if (filters.distance === 'far' && eventDistance <= 3) return false;
			}

			// Activity type filter
			if (filters.activityType !== 'all') {
				const eventActivityType = getActivityType(event);
				if (eventActivityType !== filters.activityType) return false;
			}

			// Energy level filter - match based on activity intensity
			if (filters.energyLevel !== 'all') {
				const eventActivityType = getActivityType(event);
				const eventEnergyRequirement =
					eventActivityType === 'active'
						? 'High'
						: eventActivityType === 'training'
						? 'Medium'
						: eventActivityType === 'playgroup'
						? 'Medium'
						: 'Low';

				if (filters.energyLevel !== eventEnergyRequirement) return false;
			}

			// Friendliness filter - match based on event type and size
			if (filters.friendliness !== 'all') {
				const eventActivityType = getActivityType(event);
				const attendeeCount = event.attendeeCount;

				// Determine required friendliness level
				const requiredFriendliness =
					eventActivityType === 'playgroup' || attendeeCount > 10
						? 'Very Friendly'
						: eventActivityType === 'training' || attendeeCount > 5
						? 'Friendly'
						: 'Somewhat Friendly';

				// Check if dog's friendliness level is compatible
				const friendlinessLevels = [
					'Not Social',
					'Selective',
					'Somewhat Friendly',
					'Friendly',
					'Very Friendly',
				];
				const dogFriendlinessIndex = friendlinessLevels.indexOf(filters.friendliness);
				const requiredFriendlinessIndex = friendlinessLevels.indexOf(requiredFriendliness);

				if (dogFriendlinessIndex < requiredFriendlinessIndex) return false;
			}

			// Walking preferences filter
			if (filters.walkingPreferences && filters.walkingPreferences.length > 0) {
				const eventDetails = `${event.title} ${event.location}`.toLowerCase();
				const timeOfDay = getTimeOfDay(event.startTime);
				const activityType = getActivityType(event);

				// Check if event matches any selected walking preferences
				const matchesPreferences = filters.walkingPreferences.some(pref => {
					const prefLower = pref.toLowerCase();

					// Time-based preferences
					if (prefLower.includes('morning') && timeOfDay === 'morning') return true;
					if (prefLower.includes('evening') && timeOfDay === 'evening') return true;

					// Location-based preferences
					if (prefLower.includes('beach') && eventDetails.includes('beach')) return true;
					if (prefLower.includes('park') && eventDetails.includes('park')) return true;

					// Activity-based preferences
					if (prefLower.includes('social') && activityType === 'playgroup') return true;
					if (prefLower.includes('training') && activityType === 'training') return true;
					if (prefLower.includes('exercise') && activityType === 'active') return true;

					// Group size preferences
					if (prefLower.includes('solo') && event.attendeeCount <= 3) return true;
					if (prefLower.includes('small groups') && event.attendeeCount <= 8) return true;
					if (prefLower.includes('large groups') && event.attendeeCount > 8) return true;

					// Distance preferences
					if (prefLower.includes('long') && getDistance(event.location) > 5) return true;
					if (prefLower.includes('short') && getDistance(event.location) <= 3) return true;

					return false;
				});

				if (!matchesPreferences) return false;
			}

			return true;
		});

		return filteredEvents;
	}, [events, searchTerm, filters, dogProfile]);

	// Update filtered events whenever search term, filters, or events change
	useEffect(() => {
		const filteredEvents = applyFilters();
		onFilteredEventsChange(filteredEvents);
	}, [applyFilters]);

	// Update individual filter
	const updateFilter = (filterType, value) => {
		setFilters(prev => ({
			...prev,
			[filterType]: value,
		}));
	};

	// Toggle walking preference
	const toggleWalkingPreference = preference => {
		const currentPrefs = filters.walkingPreferences || [];
		const newPrefs = currentPrefs.includes(preference)
			? currentPrefs.filter(p => p !== preference)
			: [...currentPrefs, preference];

		updateFilter('walkingPreferences', newPrefs);
	};

	// Clear all filters
	const clearFilters = () => {
		setFilters(DEFAULT_FILTERS);
		setSearchTerm('');
	};

	// Check if any filters are active
	const hasActiveFilters =
		Object.entries(filters).some(([key, value]) => {
			if (key === 'walkingPreferences') return Array.isArray(value) && value.length > 0;
			return value !== 'all' && value !== false;
		}) || searchTerm;

	// Get current filtered events for result count
	const currentFilteredEvents = applyFilters();

	return (
		<div className='space-y-4 sm:space-y-6'>
			{/* Combined Search Bar and Filter Controls */}
			<div className='walkie-section-border rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6'>
				{/* Search Bar with Filters Button */}
				<div className='flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center'>
					{/* Search Bar */}
					<div className='flex-1 relative'>
						<input
							type='text'
							placeholder='Search events by name or location...'
							value={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
							className='w-full px-4 py-3 pl-12 pr-4 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-colors duration-200 text-sm sm:text-base shadow-sm min-h-[48px]'
						/>
						<span className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg'>
							🔍
						</span>
					</div>

					{/* Filters Button */}
					<button
						onClick={() => setShowFilters(!showFilters)}
						className={`inline-flex items-center px-4 py-3 rounded-xl font-medium transition-colors duration-200 text-sm sm:text-base min-h-[48px] touch-manipulation whitespace-nowrap ${
							showFilters
								? 'walkie-button text-white shadow-sm'
								: 'border border-gray-300 text-gray-700 hover:bg-gray-50'
						}`}
					>
						🎯 {showFilters ? 'Hide' : 'Show'} Filters
					</button>
				</div>

				{/* Filter Actions Row - Only show when filters are open */}
				{showFilters && (
					<div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4 pt-4 border-t border-gray-200'>
						{/* Filter Actions */}
						<div className='flex flex-wrap items-center gap-3'>
							{/* Smart Match Toggle - Only show if dog profile exists */}
							{dogProfile && (
								<button
									onClick={() => updateFilter('smartMatch', !filters.smartMatch)}
									className={`inline-flex items-center px-4 py-2.5 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base min-h-[44px] touch-manipulation ${
										filters.smartMatch
											? 'bg-green-500 text-white shadow-sm hover:bg-green-600'
											: 'border border-gray-300 text-gray-700 hover:bg-gray-50'
									}`}
								>
									✨ Smart Match
								</button>
							)}

							{/* Clear All Filters */}
							{hasActiveFilters && (
								<button
									onClick={clearFilters}
									className='text-gray-500 hover:text-gray-700 text-sm underline transition-colors duration-200 px-2 py-1'
								>
									Clear all
								</button>
							)}
						</div>

						{/* Results Count */}
						<div className='text-sm text-gray-600 text-right'>
							<div>
								Showing {currentFilteredEvents.length} of {events.length} events
							</div>
							{userEventCount > 0 && (
								<div className='text-xs text-primary-500 mt-1'>
									(includes {userEventCount} user-created)
								</div>
							)}
						</div>
					</div>
				)}

				{/* Results Count (when filters closed) */}
				{!showFilters && (
					<div className='text-sm text-gray-600 text-right mt-3'>
						<div>
							Showing {currentFilteredEvents.length} of {events.length} events
						</div>
						{userEventCount > 0 && (
							<div className='text-xs text-primary-500 mt-1'>
								(includes {userEventCount} user-created)
							</div>
						)}
					</div>
				)}

				{/* Expandable Filter Grid */}
				{showFilters && (
					<div className='mt-6 pt-6 border-t border-gray-200'>
						<div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6'>
							{/* Time of Day Filter */}
							<div className='space-y-2'>
								<label className='block text-sm font-medium text-gray-700'>⏰ Time of Day</label>
								<select
									value={filters.timeOfDay}
									onChange={e => updateFilter('timeOfDay', e.target.value)}
									className='w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-colors duration-200 text-sm sm:text-base min-h-[44px] shadow-sm'
								>
									<option value='all'>All Times</option>
									{TIME_OF_DAY.map(time => (
										<option key={time.value} value={time.value}>
											{time.emoji} {time.label}
										</option>
									))}
								</select>
							</div>

							{/* Dog Size Filter */}
							<div className='space-y-2'>
								<label className='block text-sm font-medium text-gray-700'>🐕 Dog Size</label>
								<select
									value={filters.dogSize}
									onChange={e => updateFilter('dogSize', e.target.value)}
									className='w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-colors duration-200 text-sm sm:text-base min-h-[44px] shadow-sm'
								>
									<option value='all'>All Sizes</option>
									{DOG_SIZES.map(size => (
										<option key={size.value} value={size.value}>
											{size.emoji} {size.label}
										</option>
									))}
								</select>
							</div>

							{/* Distance Filter */}
							<div className='space-y-2'>
								<label className='block text-sm font-medium text-gray-700'>📍 Distance</label>
								<select
									value={filters.distance}
									onChange={e => updateFilter('distance', e.target.value)}
									className='w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-colors duration-200 text-sm sm:text-base min-h-[44px] shadow-sm'
								>
									<option value='all'>Any Distance</option>
									{DISTANCE_OPTIONS.map(distance => (
										<option key={distance.value} value={distance.value}>
											{distance.emoji} {distance.label}
										</option>
									))}
								</select>
							</div>

							{/* Activity Type Filter */}
							<div className='space-y-2'>
								<label className='block text-sm font-medium text-gray-700'>🎯 Activity Type</label>
								<select
									value={filters.activityType}
									onChange={e => updateFilter('activityType', e.target.value)}
									className='w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-colors duration-200 text-sm sm:text-base min-h-[44px] shadow-sm'
								>
									<option value='all'>All Activities</option>
									{ACTIVITY_TYPES.map(activity => (
										<option key={activity.value} value={activity.value}>
											{activity.emoji} {activity.label}
										</option>
									))}
								</select>
							</div>

							{/* Energy Level Filter */}
							<div className='space-y-2'>
								<label className='block text-sm font-medium text-gray-700'>⚡ Energy Level</label>
								<select
									value={filters.energyLevel}
									onChange={e => updateFilter('energyLevel', e.target.value)}
									className='w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-colors duration-200 text-sm sm:text-base min-h-[44px] shadow-sm'
								>
									<option value='all'>All Energy Levels</option>
									{ENERGY_LEVELS.map(energy => (
										<option key={energy.value} value={energy.value}>
											{energy.emoji} {energy.label}
										</option>
									))}
								</select>
							</div>

							{/* Friendliness Filter */}
							<div className='space-y-2'>
								<label className='block text-sm font-medium text-gray-700'>👥 Friendliness</label>
								<select
									value={filters.friendliness}
									onChange={e => updateFilter('friendliness', e.target.value)}
									className='w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-colors duration-200 text-sm sm:text-base min-h-[44px] shadow-sm'
								>
									<option value='all'>All Friendliness Levels</option>
									{FRIENDLINESS_LEVELS.map(friendliness => (
										<option key={friendliness.value} value={friendliness.value}>
											{friendliness.emoji} {friendliness.label}
										</option>
									))}
								</select>
							</div>
						</div>

						{/* Walking Preferences Filter */}
						<div className='mt-6 pt-6 border-t border-gray-200'>
							<label className='block text-sm font-medium text-gray-700 mb-3'>
								🚶‍♂️ Walking Preferences
								{filters.walkingPreferences?.length > 0 && (
									<span className='ml-2 text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full'>
										{filters.walkingPreferences.length} selected
									</span>
								)}
							</label>
							<div className='flex flex-wrap gap-2'>
								{WALKING_PREFERENCE_FILTERS.map(pref => {
									const isSelected = filters.walkingPreferences?.includes(pref.value);
									return (
										<button
											key={pref.value}
											onClick={() => toggleWalkingPreference(pref.value)}
											className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors duration-200 min-h-[44px] touch-manipulation ${
												isSelected
													? 'walkie-button text-white shadow-sm'
													: 'border border-gray-300 text-gray-700 hover:bg-gray-50'
											}`}
										>
											{pref.emoji} {pref.label}
										</button>
									);
								})}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

EventsSearchAndFilter.propTypes = {
	events: PropTypes.array.isRequired,
	dogProfile: PropTypes.object,
	userEventCount: PropTypes.number.isRequired,
	onFilteredEventsChange: PropTypes.func.isRequired,
};
