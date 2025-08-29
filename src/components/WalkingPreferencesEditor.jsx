// WalkingPreferencesEditor - Component for managing walking preferences
// Handles adding, removing, and displaying walking preferences with suggestions

import { useState } from 'react';
import PropTypes from 'prop-types';
import { WALKING_PREFERENCE_FILTERS } from '../data/constants';

export const WalkingPreferencesEditor = ({
	walkingPreferences,
	isEditing,
	onAddPreference,
	onRemovePreference,
}) => {
	const [newPreference, setNewPreference] = useState('');

	const handleAddPreference = () => {
		if (newPreference.trim() && !walkingPreferences.includes(newPreference.trim())) {
			onAddPreference(newPreference.trim());
			setNewPreference('');
		}
	};

	const handleQuickAdd = preferenceValue => {
		if (!walkingPreferences.includes(preferenceValue)) {
			onAddPreference(preferenceValue);
		}
	};

	return (
		<div>
			<label className='block text-sm font-medium text-gray-700 mb-3'>
				🚶‍♂️ Walking Preferences
				{isEditing && <span className='text-orange-500 ml-1'>(Click × to remove)</span>}
			</label>

			<div className='flex flex-wrap gap-2 mb-4'>
				{walkingPreferences.map((pref, index) => (
					<span
						key={index}
						className={`px-3 py-2 rounded-lg text-xs sm:text-sm flex items-center gap-1 ${
							isEditing
								? 'walkie-button text-white shadow-sm'
								: 'bg-primary-50 border border-primary-200 text-primary-800'
						}`}
					>
						{pref}
						{isEditing && (
							<button
								onClick={() => onRemovePreference(index)}
								className='ml-1 text-white hover:text-gray-200 transition-colors'
								aria-label={`Remove ${pref}`}
							>
								×
							</button>
						)}
					</span>
				))}
			</div>

			{/* Add new preference - only in edit mode */}
			{isEditing && (
				<div className='space-y-4'>
					<div className='flex gap-3'>
						<input
							type='text'
							value={newPreference}
							onChange={e => setNewPreference(e.target.value)}
							placeholder='Add walking preference...'
							className='flex-1 px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-colors duration-200 text-sm sm:text-base shadow-sm min-h-[48px]'
							onKeyPress={e => e.key === 'Enter' && handleAddPreference()}
						/>
						<button
							onClick={handleAddPreference}
							className='walkie-button px-6 py-3 text-white rounded-xl min-h-[48px] touch-manipulation font-medium'
						>
							Add
						</button>
					</div>

					{/* Suggestion tags */}
					<div>
						<p className='text-sm font-medium text-gray-700 mb-3'>Quick suggestions:</p>
						<div className='flex flex-wrap gap-2'>
							{WALKING_PREFERENCE_FILTERS.filter(pref => !walkingPreferences.includes(pref.value))
								.slice(0, 8)
								.map(suggestion => (
									<button
										key={suggestion.value}
										onClick={() => handleQuickAdd(suggestion.value)}
										className='px-3 py-2 text-xs sm:text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-primary-100 hover:text-primary-700 transition-colors border border-gray-300 min-h-[44px] touch-manipulation'
									>
										{suggestion.emoji} {suggestion.label}
									</button>
								))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

WalkingPreferencesEditor.propTypes = {
	walkingPreferences: PropTypes.array.isRequired,
	isEditing: PropTypes.bool.isRequired,
	onAddPreference: PropTypes.func.isRequired,
	onRemovePreference: PropTypes.func.isRequired,
};
