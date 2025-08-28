// Global constants and tags for walkieWalkie app
// Centralized location for all filter options and tag definitions

export const ENERGY_LEVELS = [
	{ value: 'Low', label: 'Low Energy', emoji: '😴' },
	{ value: 'Medium', label: 'Medium Energy', emoji: '🚶' },
	{ value: 'High', label: 'High Energy', emoji: '⚡' },
	{ value: 'Very High', label: 'Very High Energy', emoji: '🏃' },
];

export const FRIENDLINESS_LEVELS = [
	{ value: 'Very Friendly', label: 'Very Friendly', emoji: '🤗' },
	{ value: 'Friendly', label: 'Friendly', emoji: '😊' },
	{ value: 'Somewhat Friendly', label: 'Somewhat Friendly', emoji: '🙂' },
	{ value: 'Selective', label: 'Selective', emoji: '🤔' },
	{ value: 'Not Social', label: 'Not Social', emoji: '😌' },
];

export const DOG_SIZES = [
	{ value: 'small', label: 'Small Dogs', emoji: '🐕‍🦺' },
	{ value: 'medium', label: 'Medium Dogs', emoji: '🐕' },
	{ value: 'large', label: 'Large Dogs', emoji: '🐕‍🦺' },
];

export const TIME_OF_DAY = [
	{ value: 'morning', label: 'Morning (6AM-12PM)', emoji: '🌅' },
	{ value: 'afternoon', label: 'Afternoon (12PM-5PM)', emoji: '☀️' },
	{ value: 'evening', label: 'Evening (5PM+)', emoji: '🌆' },
];

export const ACTIVITY_TYPES = [
	{ value: 'casual', label: 'Casual Walk', emoji: '🚶' },
	{ value: 'training', label: 'Training', emoji: '🎓' },
	{ value: 'playgroup', label: 'Playgroup', emoji: '🎾' },
	{ value: 'active', label: 'Active/Hiking', emoji: '⛰️' },
];

export const DISTANCE_OPTIONS = [
	{ value: 'close', label: 'Close (≤3km)', emoji: '📍' },
	{ value: 'far', label: 'Far (>3km)', emoji: '🗺️' },
];

export const WALKING_PREFERENCES = [
	'Morning walks',
	'Evening walks',
	'Beach areas',
	'Park areas',
	'Social groups',
	'Solo walks',
	'Long hikes',
	'Short walks',
	'Urban areas',
	'Nature trails',
	'Dog parks',
	'Off-leash areas',
	'Quiet routes',
	'Busy areas',
	'Weekend adventures',
	'Weekday walks',
	'Early morning',
	'Late evening',
	'Rainy weather',
	'Sunny weather',
	'Small groups',
	'Large groups',
	'Training focus',
	'Exercise focus',
	'Socialization focus',
];

// Filter options for multi-select walking preferences
export const WALKING_PREFERENCE_FILTERS = [
	{ value: 'Morning walks', label: 'Morning walks', emoji: '🌅' },
	{ value: 'Evening walks', label: 'Evening walks', emoji: '🌆' },
	{ value: 'Beach areas', label: 'Beach areas', emoji: '🏖️' },
	{ value: 'Park areas', label: 'Park areas', emoji: '🌳' },
	{ value: 'Social groups', label: 'Social groups', emoji: '👥' },
	{ value: 'Solo walks', label: 'Solo walks', emoji: '🚶‍♂️' },
	{ value: 'Long hikes', label: 'Long hikes', emoji: '🥾' },
	{ value: 'Short walks', label: 'Short walks', emoji: '👟' },
	{ value: 'Training focus', label: 'Training focus', emoji: '🎓' },
	{ value: 'Exercise focus', label: 'Exercise focus', emoji: '💪' },
	{ value: 'Socialization focus', label: 'Socialization focus', emoji: '🤝' },
];

export const DEFAULT_FILTERS = {
	timeOfDay: 'all',
	dogSize: 'all',
	distance: 'all',
	activityType: 'all',
	energyLevel: 'all',
	friendliness: 'all',
	walkingPreferences: [],
	smartMatch: false,
};
