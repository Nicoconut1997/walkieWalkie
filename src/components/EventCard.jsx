// EventCard - Reusable component for displaying dog walking events
// Displays event title, location, attendee count, date and time with favorite functionality

import { useState, useEffect } from 'react';
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
	// Component state
	const [isFavorited, setIsFavorited] = useState(false);
	const [isJoined, setIsJoined] = useState(false);
	const navigate = useNavigate();

	// Variables / constants
	const timeRange = `${startTime} - ${endTime}`;
	const attendeeText = `${attendeeCount} people signed up`;

	// Load favorite and joined status from localStorage
	useEffect(() => {
		const loadStatus = () => {
			// Load favorites
			const savedFavorites = localStorage.getItem('walkieWalkie_favorites');
			if (savedFavorites) {
				try {
					const parsedFavorites = JSON.parse(savedFavorites);
					setIsFavorited(parsedFavorites.includes(id.toString()));
				} catch (error) {
					console.error('Error loading favorites:', error);
				}
			}

			// Load joined walks
			const savedJoinedWalks = localStorage.getItem('walkieWalkie_joinedWalks');
			if (savedJoinedWalks) {
				try {
					const parsedJoinedWalks = JSON.parse(savedJoinedWalks);
					setIsJoined(parsedJoinedWalks.includes(id.toString()));
				} catch (error) {
					console.error('Error loading joined walks:', error);
				}
			}
		};

		loadStatus();

		// Listen for updates to joined walks
		const handleJoinedWalksUpdate = () => {
			loadStatus();
		};

		window.addEventListener('joinedWalksUpdated', handleJoinedWalksUpdate);

		return () => {
			window.removeEventListener('joinedWalksUpdated', handleJoinedWalksUpdate);
		};
	}, [id]);

	// Functions
	const handleCreateEvent = e => {
		e.preventDefault();
		e.stopPropagation();
		navigate('/create-event');
	};

	const handleJoinEvent = e => {
		e.preventDefault();
		e.stopPropagation();
		
		try {
			const savedJoinedWalks = localStorage.getItem('walkieWalkie_joinedWalks');
			let joinedWalks = savedJoinedWalks ? JSON.parse(savedJoinedWalks) : [];
			
			const eventIdString = id.toString();
			
			if (isJoined) {
				// Leave the walk
				joinedWalks = joinedWalks.filter(walkId => walkId !== eventIdString);
				setIsJoined(false);
			} else {
				// Join the walk
				joinedWalks.push(eventIdString);
				setIsJoined(true);
			}
			
			localStorage.setItem('walkieWalkie_joinedWalks', JSON.stringify(joinedWalks));
			
			// Dispatch custom event to notify other components
			window.dispatchEvent(new CustomEvent('joinedWalksUpdated'));
		} catch (error) {
			console.error('Error updating joined walks:', error);
		}
	};

	const handleFavoriteToggle = e => {
		e.preventDefault();
		e.stopPropagation();
		
		try {
			const savedFavorites = localStorage.getItem('walkieWalkie_favorites');
			let favorites = savedFavorites ? JSON.parse(savedFavorites) : [];
			
			const eventIdString = id.toString();
			
			if (isFavorited) {
				// Remove from favorites
				favorites = favorites.filter(favId => favId !== eventIdString);
				setIsFavorited(false);
			} else {
				// Add to favorites
				favorites.push(eventIdString);
				setIsFavorited(true);
			}
			
			localStorage.setItem('walkieWalkie_favorites', JSON.stringify(favorites));
			
			// Dispatch custom event to notify other components
			window.dispatchEvent(new CustomEvent('favoritesUpdated'));
		} catch (error) {
			console.error('Error updating favorites:', error);
		}
	};

	// Return clickable card
	return (
		<div className='relative walkie-card bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5 lg:p-6 max-w-sm w-full hover:transform hover:scale-105 transition-all duration-200'>
			{/* Favorite Heart Button */}
			<button
				onClick={handleFavoriteToggle}
				className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 touch-manipulation ${
					isFavorited 
						? 'text-red-500 bg-red-50 hover:bg-red-100' 
						: 'text-gray-400 bg-gray-50 hover:bg-gray-100 hover:text-red-500'
				}`}
				aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
			>
				{isFavorited ? '❤️' : '🤍'}
			</button>

			<Link
				to={`/event/${id}`}
				className='block no-underline'
			>
				<div className='space-y-3 sm:space-y-4'>
					{/* Event Title */}
					<h3 className='walkie-main-title text-lg sm:text-xl lg:text-2xl font-bold text-left leading-tight pr-12'>
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
							className={`w-full inline-flex items-center justify-center font-medium px-4 py-3 text-sm rounded-lg min-h-[44px] touch-manipulation transition-all duration-200 ${
								isJoined
									? 'bg-green-100 text-green-700 border-2 border-green-300 hover:bg-green-200'
									: 'walkie-button text-white'
							}`}
						>
							{isJoined ? '✅ Joined!' : '🐕 Join This Walk'}
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
		</div>
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
