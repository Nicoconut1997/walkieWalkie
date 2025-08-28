// MyWalks - Page displaying walks the user has joined
// Shows a grid of joined events with ability to view details and manage joined walks

import { useState, useEffect } from 'react';
import { EventCard } from '../components/EventCard';
import { sampleEvents } from '../data/sampleEvents';

export const MyWalks = () => {
	// Component state
	const [joinedWalks, setJoinedWalks] = useState([]);
	const [loading, setLoading] = useState(true);

	// Load joined walks from localStorage
	useEffect(() => {
		const loadJoinedWalks = () => {
			try {
				const savedJoinedWalks = localStorage.getItem('walkieWalkie_joinedWalks');
				const joinedWalkIds = savedJoinedWalks ? JSON.parse(savedJoinedWalks) : [];
				
				// Filter events to only show joined ones
				const joinedEvents = sampleEvents.filter(event => 
					joinedWalkIds.includes(event.id.toString())
				);
				
				setJoinedWalks(joinedEvents);
			} catch (error) {
				console.error('Error loading joined walks:', error);
				setJoinedWalks([]);
			} finally {
				setLoading(false);
			}
		};

		loadJoinedWalks();

		// Listen for updates to joined walks
		const handleJoinedWalksUpdate = () => {
			loadJoinedWalks();
		};

		window.addEventListener('joinedWalksUpdated', handleJoinedWalksUpdate);

		return () => {
			window.removeEventListener('joinedWalksUpdated', handleJoinedWalksUpdate);
		};
	}, []);

	// Return
	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
				{/* Header */}
				<div className="text-center mb-8 sm:mb-12">
					<h1 className="walkie-main-title text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
						🐾 My Walks
					</h1>
					<p className="walkie-subtitle text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
						All the dog walks you've joined. Get ready for some pawsome adventures!
					</p>
				</div>

				{/* Content */}
				{loading ? (
					<div className="flex justify-center items-center py-12">
						<div className="text-center">
							<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
							<p className="walkie-subtitle text-gray-600">Loading your walks...</p>
						</div>
					</div>
				) : joinedWalks.length === 0 ? (
					<div className="text-center py-12 sm:py-16">
						<div className="mb-6">
							<span className="text-6xl sm:text-7xl lg:text-8xl">🐕‍🦺</span>
						</div>
						<h2 className="walkie-subtitle text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-700 mb-4">
							No walks joined yet
						</h2>
						<p className="walkie-subtitle text-base sm:text-lg text-gray-500 mb-8 max-w-md mx-auto">
							Start exploring available dog walks and join some adventures with fellow dog lovers!
						</p>
						<a
							href="/walks"
							className="walkie-button inline-flex items-center justify-center font-medium text-white px-6 py-3 text-sm sm:text-base rounded-lg min-h-[44px] touch-manipulation"
						>
							🔍 Browse Available Walks
						</a>
					</div>
				) : (
					<>
						{/* Results Count */}
						<div className="mb-6 sm:mb-8">
							<p className="walkie-subtitle text-sm sm:text-base text-gray-600">
								{joinedWalks.length} walk{joinedWalks.length !== 1 ? 's' : ''} joined
							</p>
						</div>

						{/* Events Grid */}
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 justify-items-center">
							{joinedWalks.map(event => (
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
									showCreateButton={false}
								/>
							))}
						</div>
					</>
				)}
			</div>
		</div>
	);
};
