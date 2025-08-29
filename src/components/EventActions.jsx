// EventActions - Action buttons for joining events and starting walks
// Handles the main user interactions with event participation

export const EventActions = ({ event, isJoined, onJoinToggle, onStartWalk }) => {
	const attendeeText = `${event.attendeeCount} people signed up`;

	return (
		<div className='walkie-section-border bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6 lg:p-8 text-center'>
			{isJoined ? (
				<>
					<h2 className='text-lg sm:text-xl lg:text-2xl font-bold text-green-700 mb-3 sm:mb-4'>
						✅ You're Joined!
					</h2>
					<p className='text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base'>
						Ready to start your walk? Track your progress and earn XP for your dogs!
					</p>
					<div className='space-y-3 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center'>
						<button
							onClick={onStartWalk}
							className='walkie-button inline-flex items-center justify-center font-medium text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-lg w-full sm:w-auto min-h-[48px] touch-manipulation'
						>
							🚶 Start Walk
						</button>
						<button
							onClick={onJoinToggle}
							className='inline-flex items-center justify-center font-medium text-red-600 bg-white border-2 border-red-300 hover:border-red-500 hover:bg-red-50 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-lg w-full sm:w-auto min-h-[48px] touch-manipulation transition-colors duration-200'
						>
							❌ Leave Walk
						</button>
						<button className='inline-flex items-center justify-center font-medium text-gray-700 bg-white border-2 border-gray-300 hover:border-primary-500 hover:text-primary-500 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-lg w-full sm:w-auto min-h-[48px] touch-manipulation transition-colors duration-200'>
							💬 Message Organizer
						</button>
					</div>
				</>
			) : (
				<>
					<h2 className='text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4'>
						Ready to Join?
					</h2>
					<p className='text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base'>
						{attendeeText} so far! Don't miss out on this tail-wagging adventure.
					</p>
					<div className='space-y-3 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center'>
						<button
							onClick={onJoinToggle}
							className='walkie-button inline-flex items-center justify-center font-medium text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-lg w-full sm:w-auto min-h-[48px] touch-manipulation'
						>
							🐕 Join This Walk
						</button>
						<button className='inline-flex items-center justify-center font-medium text-gray-700 bg-white border-2 border-gray-300 hover:border-primary-500 hover:text-primary-500 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-lg w-full sm:w-auto min-h-[48px] touch-manipulation transition-colors duration-200'>
							💬 Message Organizer
						</button>
					</div>
				</>
			)}
		</div>
	);
};
