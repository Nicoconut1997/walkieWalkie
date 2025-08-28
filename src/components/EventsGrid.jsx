// EventsGrid - Reusable grid component for displaying events
// Handles responsive layout and can be used with any events array

import PropTypes from 'prop-types';
import { EventCard } from './EventCard';

export const EventsGrid = ({ events }) => {
	if (!events || events.length === 0) {
		return (
			<div className='text-center py-6 sm:py-8'>
				<p className='walkie-subtitle text-base sm:text-lg'>No events available at the moment.</p>
				<p className='walkie-subtitle text-xs sm:text-sm mt-2'>
					Check back soon for new walking adventures!
				</p>
			</div>
		);
	}

	return (
		<div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 justify-items-center'>
			{events.map(event => (
				<EventCard
					key={event.id}
					id={event.id}
					title={event.title}
					location={event.location}
					attendeeCount={event.attendeeCount}
					date={event.date}
					startTime={event.startTime}
					endTime={event.endTime}
					emoji={event.emoji}
				/>
			))}
		</div>
	);
};

EventsGrid.propTypes = {
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
};
