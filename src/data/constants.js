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

// Dog size options for profile forms
export const DOG_SIZE_OPTIONS = [
	{ value: 'Small', label: 'Small (under 25 lbs)', emoji: '🐕‍🦺' },
	{ value: 'Medium', label: 'Medium (25-60 lbs)', emoji: '🐕' },
	{ value: 'Large', label: 'Large (over 60 lbs)', emoji: '🐕‍🦺' },
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

// Experience System Constants (Solo Leveling inspired!)
export const EXPERIENCE_SYSTEM = {
	// Base XP per minute of walking
	BASE_XP_PER_MINUTE: 10,

	// Difficulty multipliers based on activity type
	DIFFICULTY_MULTIPLIERS: {
		casual: 1.0, // Easy walks
		training: 1.5, // Training sessions
		playgroup: 1.2, // Social activities
		active: 2.0, // Hard hikes/adventures
	},

	// Distance bonus XP (per km)
	DISTANCE_BONUS_XP: 5,

	// Level progression formula: 200, 300, 400, 500... XP per level
	LEVEL_PROGRESSION: {
		FIRST_LEVEL_XP: 200, // XP needed for level 1->2
		INCREMENT: 100, // Each level requires 100 more XP than the previous
		MAX_LEVEL: 50, // Level cap
	},

	// Special achievement bonuses
	ACHIEVEMENT_BONUSES: {
		FIRST_WALK: 50,
		PERFECT_WEEK: 100, // 7 days in a row
		LONG_DISTANCE: 25, // Walks over 5km
		EARLY_BIRD: 15, // Morning walks before 7AM
		SOCIAL_BUTTERFLY: 20, // Playgroup activities
	},

	// Level thresholds for visual effects
	MILESTONE_LEVELS: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
};

// Achievement system definitions
export const ACHIEVEMENTS = {
	// Beginner achievements
	FIRST_WALK: {
		id: 'FIRST_WALK',
		name: 'First Steps',
		description: 'Completed your very first walk',
		emoji: '👶',
		category: 'milestone',
		criteria: { walksCompleted: 1 },
		xpBonus: 50,
	},
	EARLY_ADOPTER: {
		id: 'EARLY_ADOPTER',
		name: 'Early Adopter',
		description: 'Joined the walkieWalkie community',
		emoji: '🌟',
		category: 'milestone',
		criteria: { profileCreated: true },
		xpBonus: 25,
	},

	// Walking frequency achievements
	WEEKEND_WARRIOR: {
		id: 'WEEKEND_WARRIOR',
		name: 'Weekend Warrior',
		description: 'Completed 5 walks',
		emoji: '⚡',
		category: 'frequency',
		criteria: { walksCompleted: 5 },
		xpBonus: 75,
	},
	DEDICATED_WALKER: {
		id: 'DEDICATED_WALKER',
		name: 'Dedicated Walker',
		description: 'Completed 25 walks',
		emoji: '🏃',
		category: 'frequency',
		criteria: { walksCompleted: 25 },
		xpBonus: 150,
	},
	WALKING_LEGEND: {
		id: 'WALKING_LEGEND',
		name: 'Walking Legend',
		description: 'Completed 100 walks',
		emoji: '👑',
		category: 'frequency',
		criteria: { walksCompleted: 100 },
		xpBonus: 500,
	},

	// Level achievements
	LEVEL_UP_ROOKIE: {
		id: 'LEVEL_UP_ROOKIE',
		name: 'Level Up Rookie',
		description: 'Reached level 5',
		emoji: '🥉',
		category: 'level',
		criteria: { level: 5 },
		xpBonus: 100,
	},
	LEVEL_UP_VETERAN: {
		id: 'LEVEL_UP_VETERAN',
		name: 'Veteran Walker',
		description: 'Reached level 10',
		emoji: '🥈',
		category: 'level',
		criteria: { level: 10 },
		xpBonus: 200,
	},
	LEVEL_UP_MASTER: {
		id: 'LEVEL_UP_MASTER',
		name: 'Master Walker',
		description: 'Reached level 20',
		emoji: '🥇',
		category: 'level',
		criteria: { level: 20 },
		xpBonus: 500,
	},

	// Time-based achievements
	EARLY_BIRD: {
		id: 'EARLY_BIRD',
		name: 'Early Bird',
		description: 'Completed a walk before 7 AM',
		emoji: '🌅',
		category: 'time',
		criteria: { walkBefore: '07:00' },
		xpBonus: 25,
	},
	NIGHT_OWL: {
		id: 'NIGHT_OWL',
		name: 'Night Owl',
		description: 'Completed a walk after 9 PM',
		emoji: '🌙',
		category: 'time',
		criteria: { walkAfter: '21:00' },
		xpBonus: 25,
	},
	MARATHON_WALKER: {
		id: 'MARATHON_WALKER',
		name: 'Marathon Walker',
		description: 'Walked for over 2 hours in one session',
		emoji: '🏃‍♂️',
		category: 'endurance',
		criteria: { walkDuration: 120 }, // minutes
		xpBonus: 100,
	},

	// Social achievements
	SOCIAL_BUTTERFLY: {
		id: 'SOCIAL_BUTTERFLY',
		name: 'Social Butterfly',
		description: 'Participated in a group walk',
		emoji: '🦋',
		category: 'social',
		criteria: { activityType: 'playgroup' },
		xpBonus: 30,
	},
	EVENT_ENTHUSIAST: {
		id: 'EVENT_ENTHUSIAST',
		name: 'Event Enthusiast',
		description: 'Joined 5 walking events',
		emoji: '🎉',
		category: 'social',
		criteria: { eventsJoined: 5 },
		xpBonus: 75,
	},

	// Activity-specific achievements
	TRAINING_SPECIALIST: {
		id: 'TRAINING_SPECIALIST',
		name: 'Training Specialist',
		description: 'Completed 10 training sessions',
		emoji: '🎯',
		category: 'activity',
		criteria: { trainingWalks: 10 },
		xpBonus: 100,
	},
	EXPLORER: {
		id: 'EXPLORER',
		name: 'Explorer',
		description: 'Walked in 5 different locations',
		emoji: '🗺️',
		category: 'exploration',
		criteria: { uniqueLocations: 5 },
		xpBonus: 125,
	},
	SPEED_DEMON: {
		id: 'SPEED_DEMON',
		name: 'Speed Demon',
		description: 'Completed a 5km+ walk',
		emoji: '💨',
		category: 'distance',
		criteria: { walkDistance: 5 }, // km
		xpBonus: 75,
	},

	// Special achievements
	PERFECT_WEEK: {
		id: 'PERFECT_WEEK',
		name: 'Perfect Week',
		description: 'Walked 7 days in a row',
		emoji: '🔥',
		category: 'streak',
		criteria: { walkStreak: 7 },
		xpBonus: 200,
	},
	WEATHER_WARRIOR: {
		id: 'WEATHER_WARRIOR',
		name: 'Weather Warrior',
		description: 'Walked in challenging weather',
		emoji: '⛈️',
		category: 'special',
		criteria: { weatherCondition: 'challenging' },
		xpBonus: 50,
	},
	PHOTO_PERFECTIONIST: {
		id: 'PHOTO_PERFECTIONIST',
		name: 'Photo Perfectionist',
		description: 'Added a profile photo',
		emoji: '📸',
		category: 'profile',
		criteria: { hasPhoto: true },
		xpBonus: 25,
	},
};

// XP calculation utility functions
export const calculateXPForWalk = (
	durationMinutes,
	distanceKm,
	activityType = 'casual',
	bonuses = []
) => {
	const baseXP = durationMinutes * EXPERIENCE_SYSTEM.BASE_XP_PER_MINUTE;
	const difficultyMultiplier = EXPERIENCE_SYSTEM.DIFFICULTY_MULTIPLIERS[activityType] || 1.0;
	const distanceBonus = distanceKm * EXPERIENCE_SYSTEM.DISTANCE_BONUS_XP;

	let totalXP = baseXP * difficultyMultiplier + distanceBonus;

	// Add achievement bonuses
	bonuses.forEach(bonus => {
		totalXP += EXPERIENCE_SYSTEM.ACHIEVEMENT_BONUSES[bonus] || 0;
	});

	return Math.round(totalXP);
};

export const calculateLevelFromXP = totalXP => {
	const { MAX_LEVEL } = EXPERIENCE_SYSTEM.LEVEL_PROGRESSION;

	// New system XP thresholds:
	// Level 1: 0-199 XP (need 200 for Level 2)
	// Level 2: 200-499 XP (need 500 total for Level 3)
	// Level 3: 500-899 XP (need 900 total for Level 4)
	// Level N total XP: 50 * (N-1) * (N+2)

	if (totalXP < 200) return 1;
	if (totalXP < 500) return 2;
	if (totalXP < 900) return 3;
	if (totalXP < 1400) return 4;

	// For higher levels, use the formula
	for (let level = 5; level <= MAX_LEVEL; level++) {
		const xpForThisLevel = 50 * (level - 1) * (level + 2);
		if (totalXP < xpForThisLevel) {
			return level - 1;
		}
	}

	return MAX_LEVEL;
};

export const calculateXPForNextLevel = currentLevel => {
	const { FIRST_LEVEL_XP, INCREMENT } = EXPERIENCE_SYSTEM.LEVEL_PROGRESSION;
	// Total XP needed to reach level (currentLevel + 1)
	const nextLevel = currentLevel + 1;
	return 50 * (nextLevel - 1) * (nextLevel + 2);
};

export const calculateXPForCurrentLevel = currentLevel => {
	if (currentLevel <= 1) return 0;
	const { FIRST_LEVEL_XP, INCREMENT } = EXPERIENCE_SYSTEM.LEVEL_PROGRESSION;
	// Total XP needed to reach current level
	return 50 * (currentLevel - 1) * (currentLevel + 2);
};

// Achievement checking utility functions
export const checkAchievements = (dog, walkData = {}) => {
	const newAchievements = [];
	const currentAchievements = dog.achievements || [];

	Object.values(ACHIEVEMENTS).forEach(achievement => {
		// Skip if already earned
		if (currentAchievements.includes(achievement.id)) {
			return;
		}

		// Check criteria
		let earned = false;
		const criteria = achievement.criteria;

		if (criteria.walksCompleted && dog.walksCompleted >= criteria.walksCompleted) {
			earned = true;
		}
		if (criteria.level && dog.level >= criteria.level) {
			earned = true;
		}
		if (criteria.hasPhoto && dog.photo) {
			earned = true;
		}
		if (criteria.profileCreated && dog.dogName) {
			earned = true;
		}
		if (criteria.walkDuration && walkData.durationMinutes >= criteria.walkDuration) {
			earned = true;
		}
		if (criteria.walkDistance && walkData.distanceKm >= criteria.walkDistance) {
			earned = true;
		}
		if (criteria.activityType && walkData.activityType === criteria.activityType) {
			earned = true;
		}
		if (criteria.walkBefore && walkData.startTime) {
			const walkHour = new Date(walkData.startTime).getHours();
			const criteriaHour = parseInt(criteria.walkBefore.split(':')[0]);
			if (walkHour < criteriaHour) {
				earned = true;
			}
		}
		if (criteria.walkAfter && walkData.startTime) {
			const walkHour = new Date(walkData.startTime).getHours();
			const criteriaHour = parseInt(criteria.walkAfter.split(':')[0]);
			if (walkHour >= criteriaHour) {
				earned = true;
			}
		}

		if (earned) {
			newAchievements.push(achievement.id);
		}
	});

	return newAchievements;
};

export const getAchievementById = achievementId => {
	return ACHIEVEMENTS[achievementId];
};

export const calculateAchievementBonus = achievementIds => {
	return achievementIds.reduce((total, id) => {
		const achievement = ACHIEVEMENTS[id];
		return total + (achievement?.xpBonus || 0);
	}, 0);
};
