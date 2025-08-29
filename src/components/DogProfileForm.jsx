// DogProfileForm - Component for individual dog profile editing
// Handles all dog-specific fields including basic info and walking preferences

import PropTypes from 'prop-types';
import { ENERGY_LEVELS, FRIENDLINESS_LEVELS, DOG_SIZE_OPTIONS } from '../data/constants';
import { WalkingPreferencesEditor } from './WalkingPreferencesEditor';
import { ExperienceBar } from './ExperienceBar';
import { XPSimulator } from './XPSimulator';
import { DogPhotoUpload } from './DogPhotoUpload';

export const DogProfileForm = ({
	dog,
	isEditing,
	validationErrors,
	onInputChange,
	onAddPreference,
	onRemovePreference,
	onXPGained,
	onResetXP,
	onPhotoUpload,
	onPhotoRemove,
}) => {
	const hasFieldError = fieldName => {
		const errorKey = `${dog.id}_${fieldName}`;
		return Boolean(validationErrors[errorKey]);
	};

	const getFieldError = fieldName => {
		const errorKey = `${dog.id}_${fieldName}`;
		return validationErrors[errorKey];
	};

	const handleWalkingPreferenceAdd = preference => {
		onAddPreference(dog.id, preference);
	};

	const handleWalkingPreferenceRemove = index => {
		onRemovePreference(dog.id, index);
	};

	return (
		<div className='walkie-section-border bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6 mb-4 sm:mb-6'>
			{/* Dog Photo Upload */}
			<DogPhotoUpload
				dog={dog}
				isEditing={isEditing}
				onPhotoUpload={onPhotoUpload}
				onPhotoRemove={onPhotoRemove}
			/>

			{/* Experience Bar - Solo Leveling Style! */}
			<div className='mb-6'>
				<ExperienceBar totalXP={dog.totalXP || 0} showDetails={true} />
			</div>

			{/* Dog Information */}
			<div className='space-y-6'>
				<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>Dog's Name *</label>
						<input
							type='text'
							name='dogName'
							value={dog.dogName}
							onChange={onInputChange}
							placeholder='Enter dog name'
							className={`w-full px-4 py-3 border rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-colors duration-200 text-sm sm:text-base shadow-sm min-h-[48px] ${
								hasFieldError('dogName')
									? 'border-red-300 focus:border-red-500 focus:ring-red-100'
									: 'border-gray-300'
							}`}
							readOnly={!isEditing}
						/>
						{hasFieldError('dogName') && (
							<p className='mt-2 text-sm text-red-600'>{getFieldError('dogName')}</p>
						)}
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>Breed *</label>
						<input
							type='text'
							name='breed'
							value={dog.breed}
							onChange={onInputChange}
							placeholder='Enter breed'
							className={`w-full px-4 py-3 border rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-colors duration-200 text-sm sm:text-base shadow-sm min-h-[48px] ${
								hasFieldError('breed')
									? 'border-red-300 focus:border-red-500 focus:ring-red-100'
									: 'border-gray-300'
							}`}
							readOnly={!isEditing}
						/>
						{hasFieldError('breed') && (
							<p className='mt-2 text-sm text-red-600'>{getFieldError('breed')}</p>
						)}
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>Age *</label>
						<input
							type='text'
							name='age'
							value={dog.age}
							onChange={onInputChange}
							placeholder='e.g., 3 years old'
							className={`w-full px-4 py-3 border rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-colors duration-200 text-sm sm:text-base shadow-sm min-h-[48px] ${
								hasFieldError('age')
									? 'border-red-300 focus:border-red-500 focus:ring-red-100'
									: 'border-gray-300'
							}`}
							readOnly={!isEditing}
						/>
						{hasFieldError('age') && (
							<p className='mt-2 text-sm text-red-600'>{getFieldError('age')}</p>
						)}
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>Size *</label>
						{isEditing ? (
							<div>
								<select
									name='size'
									value={dog.size}
									onChange={onInputChange}
									className={`w-full px-4 py-3 border rounded-xl bg-white text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-colors duration-200 text-sm sm:text-base min-h-[48px] shadow-sm ${
										hasFieldError('size')
											? 'border-red-300 focus:border-red-500 focus:ring-red-100'
											: 'border-gray-300'
									}`}
								>
									<option value=''>Select size</option>
									{DOG_SIZE_OPTIONS.map(size => (
										<option key={size.value} value={size.value}>
											{size.emoji} {size.label}
										</option>
									))}
								</select>
								{hasFieldError('size') && (
									<p className='mt-2 text-sm text-red-600'>{getFieldError('size')}</p>
								)}
							</div>
						) : (
							<div className='px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm sm:text-base min-h-[48px] flex items-center'>
								{dog.size}
							</div>
						)}
					</div>
				</div>

				{/* Additional Info */}
				<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>Energy Level *</label>
						{isEditing ? (
							<div>
								<select
									name='energy'
									value={dog.energy}
									onChange={onInputChange}
									className={`w-full px-4 py-3 border rounded-xl bg-white text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-colors duration-200 text-sm sm:text-base min-h-[48px] shadow-sm ${
										hasFieldError('energy')
											? 'border-red-300 focus:border-red-500 focus:ring-red-100'
											: 'border-gray-300'
									}`}
								>
									<option value=''>Select energy level</option>
									{ENERGY_LEVELS.map(energy => (
										<option key={energy.value} value={energy.value}>
											{energy.emoji} {energy.label}
										</option>
									))}
								</select>
								{hasFieldError('energy') && (
									<p className='mt-2 text-sm text-red-600'>{getFieldError('energy')}</p>
								)}
							</div>
						) : (
							<div className='px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-green-800 text-sm sm:text-base min-h-[48px] flex items-center'>
								⚡ {dog.energy}
							</div>
						)}
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>Friendliness *</label>
						{isEditing ? (
							<div>
								<select
									name='friendliness'
									value={dog.friendliness}
									onChange={onInputChange}
									className={`w-full px-4 py-3 border rounded-xl bg-white text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-colors duration-200 text-sm sm:text-base min-h-[48px] shadow-sm ${
										hasFieldError('friendliness')
											? 'border-red-300 focus:border-red-500 focus:ring-red-100'
											: 'border-gray-300'
									}`}
								>
									<option value=''>Select friendliness level</option>
									{FRIENDLINESS_LEVELS.map(friendliness => (
										<option key={friendliness.value} value={friendliness.value}>
											{friendliness.emoji} {friendliness.label}
										</option>
									))}
								</select>
								{hasFieldError('friendliness') && (
									<p className='mt-2 text-sm text-red-600'>{getFieldError('friendliness')}</p>
								)}
							</div>
						) : (
							<div className='px-4 py-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-800 text-sm sm:text-base min-h-[48px] flex items-center'>
								👥 {dog.friendliness}
							</div>
						)}
					</div>
				</div>

				{/* Walking Preferences */}
				<WalkingPreferencesEditor
					walkingPreferences={dog.walkingPreferences}
					isEditing={isEditing}
					onAddPreference={handleWalkingPreferenceAdd}
					onRemovePreference={handleWalkingPreferenceRemove}
				/>

				{/* XP Simulator - Development Tool */}
				{onXPGained && <XPSimulator dog={dog} onXPGained={onXPGained} onResetXP={onResetXP} />}
			</div>
		</div>
	);
};

DogProfileForm.propTypes = {
	dog: PropTypes.object.isRequired,
	isEditing: PropTypes.bool.isRequired,
	validationErrors: PropTypes.object.isRequired,
	onInputChange: PropTypes.func.isRequired,
	onAddPreference: PropTypes.func.isRequired,
	onRemovePreference: PropTypes.func.isRequired,
	onXPGained: PropTypes.func,
	onResetXP: PropTypes.func,
	onPhotoUpload: PropTypes.func,
	onPhotoRemove: PropTypes.func,
};
