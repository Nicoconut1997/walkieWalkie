// Home - Landing page for walkieWalkie following existing responsive patterns
// Features hero content, events list, and main CTA

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { EventsList } from '../components/EventsList';
import { sampleEvents } from '../data/sampleEvents';

export const Home = () => {
	const [userEvents, setUserEvents] = useState([]);

	// Load user-created events from localStorage
	useEffect(() => {
		const savedEvents = localStorage.getItem('walkieWalkie_events');
		if (savedEvents) {
			try {
				const parsedEvents = JSON.parse(savedEvents);
				setUserEvents(parsedEvents);
			} catch (error) {
				console.error('Error loading user events:', error);
			}
		}
	}, []);

	// Show most recent events (sample + user-created, limited to first 6)
	const displayEvents = [
		...sampleEvents.slice(0, 4),
		...userEvents.slice(-2), // Show 2 most recent user events
	].slice(0, 6);

	// Return
	return (
		<div className='walkie-background min-h-screen flex flex-col items-center px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-4'>
			{/* Team Attribution */}
			<div className='w-full text-center pb-4'>
				<p className='walkie-subtitle text-xs sm:text-sm'>Created by team Butter</p>
			</div>

			{/* Main content */}
			<div className='flex-1 flex flex-col items-center justify-start text-center space-y-6 sm:space-y-8 px-2 sm:px-4 w-full'>
				{/* Text content section */}
				<div className='space-y-4 sm:space-y-6'>
					{/* Main title */}
					<h2 className='walkie-main-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight px-4'>
						Dog Walks?
					</h2>

					{/* Subtitle */}
					<p className='walkie-subtitle text-lg sm:text-xl lg:text-2xl px-4'>
						Lets make it happen!
					</p>
				</div>

				{/* Events List Section */}
				<EventsList
					events={displayEvents}
					title='Join fellow dog lovers in your area for exciting walking adventures.'
					subtitle='Discover new routes, make friends, and give your furry companion the exercise they deserve.'
				/>
			</div>

			{/* CTA Buttons */}
			<div className='w-full text-center pb-2 sm:pb-4 px-4 mt-6 sm:mt-8 space-y-3 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center'>
				<Link
					to='/create-event'
					className='walkie-button inline-flex items-center justify-center font-medium text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-lg w-full sm:w-auto min-h-[48px] touch-manipulation no-underline'
				>
					✨ Create Event
				</Link>
				<Link
					to='/walks'
					className='inline-flex items-center justify-center font-medium text-gray-700 bg-white border-2 border-gray-300 hover:border-orange-500 hover:text-orange-500 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-lg w-full sm:w-auto min-h-[48px] touch-manipulation no-underline transition-colors'
				>
					🦮 View All Walks
				</Link>
			</div>
		</div>
	);
};
