// EventDetails - Detailed view of a specific dog walking event
// Shows comprehensive information about the event including description, requirements, and participants

import { useParams, Link } from 'react-router-dom';
import { sampleEvents } from '../data/sampleEvents';

export const EventDetails = () => {
	const { id } = useParams();

	// Find the event by ID (for demo, using sample events)
	const event = sampleEvents.find(e => e.id === parseInt(id)) || sampleEvents[0];

	const timeRange = `${event.startTime} - ${event.endTime}`;
	const attendeeText = `${event.attendeeCount} people signed up`;

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
				<div className='walkie-section-border bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6'>
					<div className='text-center mb-4 sm:mb-6'>
						<div className='text-4xl sm:text-6xl lg:text-8xl mb-3 sm:mb-4'>{event.emoji}</div>
						<h1 className='walkie-main-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 px-2'>
							{event.title}
						</h1>
						<div className='flex items-center justify-center text-primary-500 font-medium text-base sm:text-lg px-2'>
							<span className='mr-2'>📍</span>
							<span className='break-words'>{event.location}</span>
						</div>
					</div>

					{/* Quick Info Grid */}
					<div className='grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6'>
						<div className='text-center p-3 sm:p-4 bg-gray-50 rounded-lg'>
							<div className='text-xl sm:text-2xl mb-1 sm:mb-2'>📅</div>
							<div className='font-medium text-gray-900 text-sm sm:text-base break-words'>
								{event.date}
							</div>
							<div className='text-xs sm:text-sm text-gray-600'>Date</div>
						</div>
						<div className='text-center p-3 sm:p-4 bg-gray-50 rounded-lg'>
							<div className='text-xl sm:text-2xl mb-1 sm:mb-2'>⏰</div>
							<div className='font-medium text-gray-900 text-sm sm:text-base'>{timeRange}</div>
							<div className='text-xs sm:text-sm text-gray-600'>Time</div>
						</div>
						<div className='text-center p-3 sm:p-4 bg-gray-50 rounded-lg'>
							<div className='text-xl sm:text-2xl mb-1 sm:mb-2'>👥</div>
							<div className='font-medium text-gray-900 text-sm sm:text-base'>
								{event.attendeeCount}
							</div>
							<div className='text-xs sm:text-sm text-gray-600'>Attendees</div>
						</div>
					</div>
				</div>

				{/* Event Description */}
				<div className='walkie-section-border bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6'>
					<h2 className='text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4'>
						📝 About This Walk
					</h2>
					<p className='text-gray-600 leading-relaxed mb-4'>
						Join us for an amazing dog walking adventure! This {event.title.toLowerCase()} is
						perfect for dogs of all sizes and energy levels. We'll explore beautiful{' '}
						{event.location.includes('Beach')
							? 'coastal paths'
							: event.location.includes('Park')
							? 'park trails'
							: 'urban routes'}
						while our furry friends socialize and get great exercise.
					</p>
					<p className='text-gray-600 leading-relaxed'>
						Whether you're a local or just visiting, this is a wonderful opportunity to meet fellow
						dog lovers and discover new walking spots in the area.
					</p>
				</div>

				{/* What to Bring */}
				<div className='walkie-section-border bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6'>
					<h2 className='text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4'>
						🎒 What to Bring
					</h2>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
						<div className='space-y-2 sm:space-y-3'>
							<div className='flex items-center text-sm sm:text-base'>
								<span className='text-green-500 mr-2 sm:mr-3 min-w-[16px]'>✓</span>
								<span>Leash and collar with ID tags</span>
							</div>
							<div className='flex items-center text-sm sm:text-base'>
								<span className='text-green-500 mr-2 sm:mr-3 min-w-[16px]'>✓</span>
								<span>Water bowl and fresh water</span>
							</div>
							<div className='flex items-center text-sm sm:text-base'>
								<span className='text-green-500 mr-2 sm:mr-3 min-w-[16px]'>✓</span>
								<span>Waste bags for cleanup</span>
							</div>
						</div>
						<div className='space-y-2 sm:space-y-3'>
							<div className='flex items-center text-sm sm:text-base'>
								<span className='text-green-500 mr-2 sm:mr-3 min-w-[16px]'>✓</span>
								<span>Treats for good behavior</span>
							</div>
							<div className='flex items-center text-sm sm:text-base'>
								<span className='text-green-500 mr-2 sm:mr-3 min-w-[16px]'>✓</span>
								<span>Comfortable walking shoes</span>
							</div>
							<div className='flex items-center text-sm sm:text-base'>
								<span className='text-green-500 mr-2 sm:mr-3 min-w-[16px]'>✓</span>
								<span>Positive attitude and smile!</span>
							</div>
						</div>
					</div>
				</div>

				{/* Meeting Details */}
				<div className='walkie-section-border bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6'>
					<h2 className='text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4'>
						📍 Meeting Point
					</h2>
					<div className='bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4'>
						<div className='flex items-start'>
							<span className='text-blue-500 text-xl mr-3 mt-1'>ℹ️</span>
							<div>
								<div className='font-medium text-blue-900 mb-1'>
									Look for the walkieWalkie group!
								</div>
								<div className='text-blue-800 text-sm'>
									We'll be gathering near the main entrance. Look for people with dogs and
									walkieWalkie signs or t-shirts.
								</div>
							</div>
						</div>
					</div>
					<div className='text-gray-600'>
						<strong>Address:</strong> {event.location}
						<br />
						<strong>Arrival:</strong> Please arrive 5-10 minutes early for introductions
						<br />
						<strong>Contact:</strong> Message the organizer if you're running late
					</div>
				</div>

				{/* Join Button */}
				<div className='walkie-section-border bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6 lg:p-8 text-center'>
					<h2 className='text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4'>
						Ready to Join?
					</h2>
					<p className='text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base'>
						{attendeeText} so far! Don't miss out on this tail-wagging adventure.
					</p>
					<div className='space-y-3 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center'>
						<button className='walkie-button inline-flex items-center justify-center font-medium text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-lg w-full sm:w-auto min-h-[48px] touch-manipulation'>
							🐕 Join This Walk
						</button>
						<button className='inline-flex items-center justify-center font-medium text-gray-700 bg-white border-2 border-gray-300 hover:border-primary-500 hover:text-primary-500 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-lg w-full sm:w-auto min-h-[48px] touch-manipulation transition-colors duration-200'>
							💬 Message Organizer
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
