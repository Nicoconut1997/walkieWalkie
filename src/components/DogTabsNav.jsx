// DogTabsNav - Component for dog selection tabs and management
// Handles dog tab navigation, adding new dogs, and deleting dogs

import PropTypes from 'prop-types';

export const DogTabsNav = ({ dogs, selectedDogId, onDogSelect, onAddDog, onDeleteDog }) => {
	return (
		<div className='walkie-section-border bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6 mb-4 sm:mb-6'>
			<div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6'>
				<h3 className='text-lg sm:text-xl font-bold text-gray-900'>🐕 Your Dogs</h3>
				<button
					onClick={onAddDog}
					className='walkie-button inline-flex items-center px-4 py-2.5 rounded-lg font-medium text-white text-sm sm:text-base min-h-[44px] touch-manipulation'
				>
					➕ Add Dog
				</button>
			</div>

			{/* Dog Tabs */}
			{dogs.length > 0 && (
				<div className='flex flex-wrap gap-2 mb-6'>
					{dogs.map(dog => (
						<div
							key={dog.id}
							className={`inline-flex items-center rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base min-h-[44px] ${
								selectedDogId === dog.id
									? 'walkie-button text-white shadow-sm'
									: 'border border-gray-300 text-gray-700 hover:bg-gray-50'
							}`}
						>
							<button
								onClick={() => onDogSelect(dog.id)}
								className='px-4 py-2.5 flex-1 text-left touch-manipulation'
							>
								{dog.dogName || 'New Dog'}
							</button>
							{dogs.length > 1 && (
								<button
									onClick={() => onDeleteDog(dog.id)}
									className='px-2 py-2.5 text-red-500 hover:text-red-700 transition-colors touch-manipulation'
									aria-label={`Delete ${dog.dogName || 'this dog'}`}
								>
									×
								</button>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

DogTabsNav.propTypes = {
	dogs: PropTypes.array.isRequired,
	selectedDogId: PropTypes.string.isRequired,
	onDogSelect: PropTypes.func.isRequired,
	onAddDog: PropTypes.func.isRequired,
	onDeleteDog: PropTypes.func.isRequired,
};
