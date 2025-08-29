// EventDetails - Detailed view of a specific dog walking event
// Shows comprehensive information about the event including description, requirements, and participants

import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { sampleEvents } from '../data/sampleEvents';
import { EventHeader } from '../components/EventHeader';
import { EventInfoGrid } from '../components/EventInfoGrid';
import { EventDescription } from '../components/EventDescription';
import { EventRequirements } from '../components/EventRequirements';
import { EventMeetingDetails } from '../components/EventMeetingDetails';
import { EventActions } from '../components/EventActions';

export const EventDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	// Find the event by ID (for demo, using sample events)
	const event = sampleEvents.find(e => e.id === parseInt(id)) || sampleEvents[0];

	const [isJoined, setIsJoined] = useState(false);
	const [dogs, setDogs] = useState([]);

	// Load joined status and dogs on mount
	useEffect(() => {
		// Check if user has joined this event
		const savedJoinedWalks = localStorage.getItem('walkieWalkie_joinedWalks');
		if (savedJoinedWalks) {
			const joinedWalkIds = JSON.parse(savedJoinedWalks);
			setIsJoined(joinedWalkIds.includes(event.id.toString()));
		}

		// Load dogs from profile
		const savedProfile = localStorage.getItem('walkieWalkie_dogProfile');
		if (savedProfile) {
			const profile = JSON.parse(savedProfile);
			setDogs(profile.dogs || []);
		}
	}, [event.id]);

	// Handle joining/leaving event
	const handleJoinToggle = () => {
		try {
			const savedJoinedWalks = localStorage.getItem('walkieWalkie_joinedWalks');
			const joinedWalkIds = savedJoinedWalks ? JSON.parse(savedJoinedWalks) : [];

			if (isJoined) {
				// Leave event
				const updatedIds = joinedWalkIds.filter(joinedId => joinedId !== event.id.toString());
				localStorage.setItem('walkieWalkie_joinedWalks', JSON.stringify(updatedIds));
				setIsJoined(false);
				alert('❌ Left the walk event');
			} else {
				// Join event
				const updatedIds = [...joinedWalkIds, event.id.toString()];
				localStorage.setItem('walkieWalkie_joinedWalks', JSON.stringify(updatedIds));
				setIsJoined(true);
				alert('🎉 Successfully joined the walk!');
			}

			// Dispatch event for other components to update
			window.dispatchEvent(new CustomEvent('joinedWalksUpdated'));
		} catch (error) {
			console.error('Error toggling join status:', error);
			alert('❌ Something went wrong. Please try again.');
		}
	};

	// Handle starting a walk for this event
	const handleStartWalk = () => {
		if (dogs.length === 0) {
			alert('❌ You need to add a dog to your profile first!');
			navigate('/profile');
			return;
		}

		// Create event-based walk data
		const eventWalk = {
			eventId: event.id,
			eventTitle: event.title,
			eventLocation: event.location,
			selectedDogIds: dogs.map(dog => dog.id), // Pre-select all dogs
			activityType: event.title.toLowerCase().includes('training')
				? 'training'
				: event.title.toLowerCase().includes('hike')
				? 'active'
				: event.title.toLowerCase().includes('social')
				? 'playgroup'
				: 'casual',
			startTime: new Date().toISOString(),
			walkId: Date.now().toString(),
		};

		// Save to localStorage
		localStorage.setItem('walkieWalkie_activeWalk', JSON.stringify(eventWalk));

		// Navigate to MyWalks with tracker tab
		navigate('/my-walks?tab=tracker');

		alert(`🚶 Started walk for "${event.title}"!`);
	};

	return (
		<div className='walkie-background min-h-screen'>
			<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8'>
				{/* Back Navigation */}
				<div className='mb-4 sm:mb-6'>
					<Link
						to='/walks'
						className='inline-flex items-center text-primary-500 hover:text-primary-600 font-medium transition-colors duration-200 text-sm sm:text-base min-h-[44px] touch-manipulation'
					>
						← Back to Dog Walks
					</Link>
				</div>

				{/* Event Header */}
				<EventHeader event={event} />

				{/* Event Info Grid */}
				<EventInfoGrid event={event} />

				{/* Event Description */}
				<EventDescription event={event} />

				{/* What to Bring */}
				<EventRequirements />

				{/* Meeting Details */}
				<EventMeetingDetails event={event} />

				{/* Action Buttons */}
				<EventActions
					event={event}
					isJoined={isJoined}
					onJoinToggle={handleJoinToggle}
					onStartWalk={handleStartWalk}
				/>
			</div>
		</div>
	);
};
