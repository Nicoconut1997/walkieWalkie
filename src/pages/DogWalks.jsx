// DogWalks - Page for browsing dog walking events with comprehensive filtering
// Shows list of available walks with advanced search and filter capabilities

import { useState, useEffect, useCallback, useMemo } from 'react';
import { EventsList } from '../components/EventsList';
import { EventsSearchAndFilter } from '../components/EventsSearchAndFilter';
import { sampleEvents } from '../data/sampleEvents';

export const DogWalks = () => {
	const [userEvents, setUserEvents] = useState([]);
	const [dogProfile, setDogProfile] = useState(null);
	const [filteredEvents, setFilteredEvents] = useState([]);

	// Load user-created events and dog profile from localStorage
	useEffect(() => {
		// Load user events
		const savedEvents = localStorage.getItem('walkieWalkie_events');
		if (savedEvents) {
			try {
				const parsedEvents = JSON.parse(savedEvents);
				setUserEvents(parsedEvents);
			} catch (error) {
				console.error('Error loading user events:', error);
			}
		}

		// Load dog profile for smart matching
		const savedProfile = localStorage.getItem('walkieWalkie_dogProfile');
		if (savedProfile) {
			try {
				const parsedProfile = JSON.parse(savedProfile);
				setDogProfile(parsedProfile);
			} catch (error) {
				console.error('Error loading dog profile:', error);
			}
		}
	}, []);

	// Combine sample events with user-created events (memoized to prevent recreating on every render)
	const allEvents = useMemo(() => [...sampleEvents, ...userEvents], [userEvents]);

	// Create stable callback for filtered events
	const handleFilteredEventsChange = useCallback(newFilteredEvents => {
		setFilteredEvents(newFilteredEvents);
	}, []);

	// Initialize filtered events on mount
	useEffect(() => {
		setFilteredEvents(allEvents);
	}, [allEvents]);

	return (
		<div className='walkie-background min-h-screen'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8'>
				{/* Page Header */}
				<div className='text-center mb-8 sm:mb-10'>
					<h1 className='walkie-main-title text-3xl sm:text-4xl md:text-5xl font-bold mb-4'>
						🐕 Dog Walking Events
					</h1>
					<p className='walkie-subtitle text-base sm:text-lg lg:text-xl max-w-3xl mx-auto px-4'>
						Discover amazing walking adventures with fellow dog lovers in your area
					</p>
				</div>

				{/* Search and Filters */}
				<div className='mb-8 sm:mb-10'>
					<EventsSearchAndFilter
						events={allEvents}
						dogProfile={dogProfile}
						userEventCount={userEvents.length}
						onFilteredEventsChange={handleFilteredEventsChange}
					/>
				</div>

				{/* Events List */}
				<EventsList
					events={filteredEvents}
					title={filteredEvents.length > 0 ? undefined : 'No events found'}
					subtitle={
						filteredEvents.length > 0 ? undefined : 'Try adjusting your search or filter criteria'
					}
				/>
			</div>
		</div>
	);
};
