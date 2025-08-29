// OwnerInfoForm - Component for managing owner information
// Handles owner name input with validation and styling

import PropTypes from 'prop-types';

export const OwnerInfoForm = ({ profile, isEditing, onInputChange, validationErrors }) => {
	const hasFieldError = fieldName => {
		return Boolean(validationErrors[fieldName]);
	};

	const getFieldError = fieldName => {
		return validationErrors[fieldName];
	};

	return (
		<div className='walkie-section-border bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6 mb-4 sm:mb-6'>
			<h3 className='text-lg sm:text-xl font-bold text-gray-900 mb-4'>👤 Owner Information</h3>
			<div>
				<label className='block text-sm font-medium text-gray-700 mb-2'>Owner Name *</label>
				<input
					type='text'
					name='ownerName'
					value={profile.ownerName}
					onChange={onInputChange}
					className={`w-full px-4 py-3 border rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-colors duration-200 text-sm sm:text-base shadow-sm min-h-[48px] ${
						hasFieldError('ownerName')
							? 'border-red-300 focus:border-red-500 focus:ring-red-100'
							: 'border-gray-300'
					}`}
					readOnly={!isEditing}
				/>
				{hasFieldError('ownerName') && (
					<p className='mt-2 text-sm text-red-600'>{getFieldError('ownerName')}</p>
				)}
			</div>
		</div>
	);
};

OwnerInfoForm.propTypes = {
	profile: PropTypes.object.isRequired,
	isEditing: PropTypes.bool.isRequired,
	onInputChange: PropTypes.func.isRequired,
	validationErrors: PropTypes.object.isRequired,
};
