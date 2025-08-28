// EventCard - Reusable component for displaying dog walking events
// Displays event title, location, attendee count, date and time

import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';

export const EventCard = ({
	id,
	title,
	location,
	attendeeCount,
	date,
	startTime,
	endTime,
	emoji = '🌅',
	showCreateButton = false,
}) => {
	const navigate = useNavigate();

	// Variables / constants
	const timeRange = `${startTime} - ${endTime}`;
	const attendeeText = `${attendeeCount} people signed up`;

	const handleCreateEvent = e => {
		e.preventDefault();
		e.stopPropagation();
		navigate('/create-event');
	};

	const handleJoinEvent = e => {
		e.preventDefault();
		e.stopPropagation();
		// This would handle joining an event in the future
		alert('🎉 Join event functionality coming soon!');
	};

	// Return clickable card
	return (
		<Link
			to={`/event/${id}`}
			className='block walkie-card bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5 lg:p-6 max-w-sm w-full hover:transform hover:scale-105 transition-all duration-200 cursor-pointer no-underline'
		>
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

				{/* Action Buttons */}
				<div className='pt-2 space-y-2'>
					{showCreateButton ? (
						<button
							onClick={handleCreateEvent}
							className='w-full walkie-button inline-flex items-center justify-center font-medium text-white px-4 py-3 text-sm rounded-lg min-h-[44px] touch-manipulation'
						>
							✨ Create Similar Event
						</button>
					) : (
						<button
							onClick={handleJoinEvent}
							className='w-full walkie-button inline-flex items-center justify-center font-medium text-white px-4 py-3 text-sm rounded-lg min-h-[44px] touch-manipulation'
						>
							🐕 Join This Walk
						</button>
					)}
				</div>

				{/* View Details Indicator */}
				<div className='pt-2 border-t border-gray-100'>
					<span className='text-xs sm:text-sm text-primary-500 font-medium'>
						Click card for full details →
					</span>
				</div>
			</div>
		</Link>
	);
};

EventCard.propTypes = {
	id: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	location: PropTypes.string.isRequired,
	attendeeCount: PropTypes.number.isRequired,
	date: PropTypes.string.isRequired,
	startTime: PropTypes.string.isRequired,
	endTime: PropTypes.string.isRequired,
	emoji: PropTypes.string,
	showCreateButton: PropTypes.bool,
};
