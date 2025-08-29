// EventMeetingDetails - Meeting point information and arrival instructions
// Provides clear guidance on where and when to meet for the walk event

export const EventMeetingDetails = ({ event }) => {
	return (
		<div className='walkie-section-border bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6'>
			<h2 className='text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4'>
				📍 Meeting Point
			</h2>
			<div className='bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4'>
				<div className='flex items-start'>
					<span className='text-blue-500 text-xl mr-3 mt-1'>ℹ️</span>
					<div>
						<div className='font-medium text-blue-900 mb-1'>Look for the walkieWalkie group!</div>
						<div className='text-blue-800 text-sm'>
							We'll be gathering near the main entrance. Look for people with dogs and walkieWalkie
							signs or t-shirts.
						</div>
					</div>
				</div>
			</div>
			<div className='text-gray-600'>
				<strong>Address:</strong> {event.location}
				<br />
				<strong>Arrival:</strong> Please arrive 5-10 minutes early for introductions
				<br />
				<strong>Contact:</strong> Message the organizer if you're running late
			</div>
		</div>
	);
};
