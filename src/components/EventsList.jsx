// EventsList - Component for managing and displaying list of dog walking events
// Handles data and layout for the events section

import PropTypes from 'prop-types';
import { EventsGrid } from './EventsGrid';

export const EventsList = ({
	events,
	title = 'Join fellow dog lovers in your area for exciting walking adventures.',
	subtitle = 'Discover new routes, make friends, and give your furry companion the exercise they deserve.',
}) => {
	return (
		<div className='walkie-section-border bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-2 sm:mx-4 space-y-6 sm:space-y-8'>
			{/* Section Header */}
			<div className='text-center space-y-2 sm:space-y-3'>
				<p className='walkie-subtitle text-base sm:text-lg lg:text-xl px-2'>{title}</p>
				<p className='walkie-subtitle text-sm sm:text-base text-gray-600 px-2'>{subtitle}</p>
			</div>

			{/* Events Grid */}
			<EventsGrid events={events} />
		</div>
	);
};

EventsList.propTypes = {
	events: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			title: PropTypes.string.isRequired,
			location: PropTypes.string.isRequired,
			attendeeCount: PropTypes.number.isRequired,
			date: PropTypes.string.isRequired,
			startTime: PropTypes.string.isRequired,
			endTime: PropTypes.string.isRequired,
			emoji: PropTypes.string,
		})
	).isRequired,
	title: PropTypes.string,
	subtitle: PropTypes.string,
};
