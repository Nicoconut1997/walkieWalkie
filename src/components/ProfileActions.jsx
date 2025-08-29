// ProfileActions - Component for profile action buttons
// Handles save, cancel, edit, and navigation actions

import PropTypes from 'prop-types';

export const ProfileActions = ({ isEditing, onSave, onCancel, onEdit, onNavigateToHistory }) => {
	return (
		<div className='flex flex-col sm:flex-row gap-3 sm:gap-4'>
			{isEditing ? (
				<>
					<button
						onClick={onSave}
						className='walkie-button flex-1 inline-flex items-center justify-center font-medium text-white px-6 py-3 text-base rounded-xl min-h-[48px] touch-manipulation shadow-sm'
					>
						💾 Save Changes
					</button>
					<button
						onClick={onCancel}
						className='flex-1 inline-flex items-center justify-center font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 text-base rounded-xl transition-colors duration-200 min-h-[48px] touch-manipulation'
					>
						❌ Cancel
					</button>
				</>
			) : (
				<>
					<button
						onClick={onEdit}
						className='walkie-button flex-1 inline-flex items-center justify-center font-medium text-white px-6 py-3 text-base rounded-xl min-h-[48px] touch-manipulation shadow-sm'
					>
						✏️ Edit Profiles
					</button>
					<button
						onClick={onNavigateToHistory}
						className='flex-1 inline-flex items-center justify-center font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 text-base rounded-xl transition-colors duration-200 min-h-[48px] touch-manipulation'
					>
						📋 Walking History
					</button>
				</>
			)}
		</div>
	);
};

ProfileActions.propTypes = {
	isEditing: PropTypes.bool.isRequired,
	onSave: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
	onEdit: PropTypes.func.isRequired,
	onNavigateToHistory: PropTypes.func.isRequired,
};
