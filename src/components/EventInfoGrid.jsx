// EventInfoGrid - Quick information grid displaying date, time, and attendee count
// Provides at-a-glance event details in a responsive card layout

export const EventInfoGrid = ({ event }) => {
	const timeRange = `${event.startTime} - ${event.endTime}`;

	return (
		<div className='walkie-section-border bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6'>
			{/* Quick Info Grid */}
			<div className='grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6'>
				<div className='text-center p-3 sm:p-4 bg-gray-50 rounded-lg'>
					<div className='text-xl sm:text-2xl mb-1 sm:mb-2'>📅</div>
					<div className='font-medium text-gray-900 text-sm sm:text-base break-words'>
						{event.date}
					</div>
					<div className='text-xs sm:text-sm text-gray-600'>Date</div>
				</div>
				<div className='text-center p-3 sm:p-4 bg-gray-50 rounded-lg'>
					<div className='text-xl sm:text-2xl mb-1 sm:mb-2'>⏰</div>
					<div className='font-medium text-gray-900 text-sm sm:text-base'>{timeRange}</div>
					<div className='text-xs sm:text-sm text-gray-600'>Time</div>
				</div>
				<div className='text-center p-3 sm:p-4 bg-gray-50 rounded-lg'>
					<div className='text-xl sm:text-2xl mb-1 sm:mb-2'>👥</div>
					<div className='font-medium text-gray-900 text-sm sm:text-base'>
						{event.attendeeCount}
					</div>
					<div className='text-xs sm:text-sm text-gray-600'>Attendees</div>
				</div>
			</div>
		</div>
	);
};
