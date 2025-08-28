// FavoriteWalks - Page for viewing user's favorite dog walking events
// Shows all events that user has favorited with heart functionality

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { EventsList } from '../components/EventsList';
import { sampleEvents } from '../data/sampleEvents';

export const FavoriteWalks = () => {
	// Component state
	const [favoriteEvents, setFavoriteEvents] = useState([]);
	const [userEvents, setUserEvents] = useState([]);

	// Function to load favorites
	const loadFavorites = () => {
		const savedFavorites = localStorage.getItem('walkieWalkie_favorites');
		if (savedFavorites) {
			try {
				const parsedFavorites = JSON.parse(savedFavorites);
				
				// Load user-created events
				const savedUserEvents = localStorage.getItem('walkieWalkie_events');
				const parsedUserEvents = savedUserEvents ? JSON.parse(savedUserEvents) : [];
				setUserEvents(parsedUserEvents);
				
				// Combine all events to find favorites
				const allEvents = [...sampleEvents, ...parsedUserEvents];
				const favorites = allEvents.filter(event => 
					parsedFavorites.includes(event.id.toString())
				);
				
				setFavoriteEvents(favorites);
			} catch (error) {
				console.error('Error loading favorites:', error);
			}
		} else {
			setFavoriteEvents([]);
		}
	};

	// Load favorites and user events from localStorage
	useEffect(() => {
		loadFavorites();
		
		// Listen for favorites updates
		const handleFavoritesUpdate = () => {
			loadFavorites();
		};
		
		window.addEventListener('favoritesUpdated', handleFavoritesUpdate);
		
		return () => {
			window.removeEventListener('favoritesUpdated', handleFavoritesUpdate);
		};
	}, []);

	// Return
	return (
		<div className='walkie-background min-h-screen'>
			<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8'>
				
				{/* Page Header */}
				<div className='text-center mb-8 sm:mb-12'>
					<h1 className='walkie-main-title text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4'>
						❤️ Favorite Walks
					</h1>
					<p className='walkie-subtitle text-base sm:text-lg max-w-2xl mx-auto px-4'>
						Your saved walking adventures. Tap the heart on any walk to add it to your favorites!
					</p>
				</div>

				{/* Favorites Content */}
				{favoriteEvents.length > 0 ? (
					<>
						{/* Stats */}
						<div className='mb-6 sm:mb-8'>
							<div className='walkie-section-border bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6'>
								<div className='text-center'>
									<p className='walkie-subtitle text-sm sm:text-base'>
										You have <span className='walkie-main-title font-semibold'>{favoriteEvents.length}</span> favorite walk{favoriteEvents.length !== 1 ? 's' : ''}
									</p>
								</div>
							</div>
						</div>

						{/* Favorites Grid */}
						<EventsList events={favoriteEvents} />
					</>
				) : (
					/* Empty State */
					<div className='text-center py-12 sm:py-16'>
						<div className='walkie-section-border bg-white rounded-xl border border-gray-200 shadow-sm p-8 sm:p-12 max-w-md mx-auto'>
							<div className='text-6xl sm:text-7xl mb-4'>💝</div>
							<h3 className='walkie-main-title text-xl sm:text-2xl font-bold mb-4'>
								No Favorites Yet
							</h3>
							<p className='walkie-subtitle text-base sm:text-lg mb-6'>
								Start exploring dog walks and tap the ❤️ on any event you'd like to save for later!
							</p>
							<div className='space-y-3 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center'>
								<Link
									to='/walks'
									className='walkie-button inline-flex items-center justify-center font-medium text-white px-6 py-3 text-base rounded-lg w-full sm:w-auto min-h-[48px] touch-manipulation no-underline'
								>
									🦮 Browse Walks
								</Link>
								<Link
									to='/create-event'
									className='inline-flex items-center justify-center font-medium text-gray-700 bg-white border-2 border-gray-300 hover:border-orange-500 hover:text-orange-500 px-6 py-3 text-base rounded-lg w-full sm:w-auto min-h-[48px] touch-manipulation no-underline transition-colors'
								>
									✨ Create Event
								</Link>
							</div>
						</div>
					</div>
				)}

			</div>
		</div>
	);
};
