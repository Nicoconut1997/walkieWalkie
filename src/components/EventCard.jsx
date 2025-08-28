// EventCard - Reusable component for displaying dog walking events
// Displays event title, location, attendee count, date and time

import PropTypes from 'prop-types';

export const EventCard = ({
	title,
	location,
	attendeeCount,
	date,
	startTime,
	endTime,
	emoji = '🌅',
}) => {
	// Variables / constants
	const timeRange = `${startTime} - ${endTime}`;
	const attendeeText = `${attendeeCount} people signed up`;

	// Return
	return (
		<div className='walkie-card bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5 lg:p-6 max-w-sm w-full hover:transform hover:scale-105 transition-all duration-200'>
			<div className='space-y-3 sm:space-y-4'>
				{/* Event Title */}
				<h3 className='walkie-main-title text-lg sm:text-xl lg:text-2xl font-bold text-left leading-tight'>
					{emoji} {title}
				</h3>

				{/* Location */}
				<div className='flex items-start text-left'>
					<span className='text-sm sm:text-base walkie-subtitle leading-relaxed break-words'>
						📍 {location}
					</span>
				</div>

				{/* People signed up */}
				<div className='flex items-center text-left'>
					<span className='text-sm sm:text-base walkie-subtitle'>👥 {attendeeText}</span>
				</div>

				{/* Date and Time */}
				<div className='space-y-1 sm:space-y-2 text-left'>
					<div className='flex items-center'>
						<span className='text-sm sm:text-base walkie-subtitle'>📅 {date}</span>
					</div>
					<div className='flex items-center'>
						<span className='text-sm sm:text-base walkie-subtitle'>⏰ {timeRange}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

EventCard.propTypes = {
	title: PropTypes.string.isRequired,
	location: PropTypes.string.isRequired,
	attendeeCount: PropTypes.number.isRequired,
	date: PropTypes.string.isRequired,
	startTime: PropTypes.string.isRequired,
	endTime: PropTypes.string.isRequired,
	emoji: PropTypes.string,
};
