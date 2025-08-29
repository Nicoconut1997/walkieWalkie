// EventDescription - Detailed description and context about the walking event
// Provides engaging information about the walk experience and location

export const EventDescription = ({ event }) => {
	const getLocationContext = () => {
		if (event.location.includes('Beach')) return 'coastal paths';
		if (event.location.includes('Park')) return 'park trails';
		return 'urban routes';
	};

	return (
		<div className='walkie-section-border bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6'>
			<h2 className='text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4'>
				📝 About This Walk
			</h2>
			<p className='text-gray-600 leading-relaxed mb-4'>
				Join us for an amazing dog walking adventure! This {event.title.toLowerCase()} is perfect
				for dogs of all sizes and energy levels. We'll explore beautiful {getLocationContext()}{' '}
				while our furry friends socialize and get great exercise.
			</p>
			<p className='text-gray-600 leading-relaxed'>
				Whether you're a local or just visiting, this is a wonderful opportunity to meet fellow dog
				lovers and discover new walking spots in the area.
			</p>
		</div>
	);
};
