// EventHeader - Main event title, emoji, and location display
// Shows the primary event information in a visually appealing header format

export const EventHeader = ({ event }) => {
	return (
		<div className='walkie-section-border bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6'>
			<div className='text-center mb-4 sm:mb-6'>
				<div className='text-4xl sm:text-6xl lg:text-8xl mb-3 sm:mb-4'>{event.emoji}</div>
				<h1 className='walkie-main-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 px-2'>
					{event.title}
				</h1>
				<div className='flex items-center justify-center text-primary-500 font-medium text-base sm:text-lg px-2'>
					<span className='mr-2'>📍</span>
					<span className='break-words'>{event.location}</span>
				</div>
			</div>
		</div>
	);
};
