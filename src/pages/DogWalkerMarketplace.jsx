// DogWalkerMarketplace - Main marketplace page for finding and booking dog walkers
// Combines discovery, profiles, booking, and review components

import { useState } from 'react';
import { WalkerDiscovery } from '../components/WalkerDiscovery';
import { DogWalkerProfile } from '../components/DogWalkerProfile';
import { BasicBooking } from '../components/BasicBooking';
import { WalkerReviews } from '../components/WalkerReviews';
import { BackgroundCheckBadge } from '../components/BackgroundCheckBadge';
import { SAMPLE_WALKERS, SAMPLE_REVIEWS } from '../data/sampleWalkers';

export const DogWalkerMarketplace = () => {
	const [currentView, setCurrentView] = useState('discovery'); // discovery, profile, booking, confirmation
	const [selectedWalker, setSelectedWalker] = useState(null);
	const [selectedDay, setSelectedDay] = useState(null);
	const [selectedTime, setSelectedTime] = useState(null);
	const [bookingHistory, setBookingHistory] = useState([]);
	const [reviews, setReviews] = useState(SAMPLE_REVIEWS);

	const handleSelectWalker = walker => {
		setSelectedWalker(walker);
		setCurrentView('profile');
	};

	const handleBookWalk = (walker, day, time) => {
		setSelectedWalker(walker);
		setSelectedDay(day);
		setSelectedTime(time);
		setCurrentView('booking');
	};

	const handleBookingComplete = booking => {
		setBookingHistory(prev => [...prev, booking]);
		setCurrentView('confirmation');
	};

	const handleAddReview = review => {
		setReviews(prev => [...prev, review]);
	};

	const goBack = () => {
		if (currentView === 'booking') {
			setCurrentView('profile');
		} else if (currentView === 'profile' || currentView === 'confirmation') {
			setCurrentView('discovery');
		}
	};

	const goToDiscovery = () => {
		setCurrentView('discovery');
		setSelectedWalker(null);
		setSelectedDay(null);
		setSelectedTime(null);
	};

	// Discovery View
	if (currentView === 'discovery') {
		return (
			<WalkerDiscovery
				walkers={SAMPLE_WALKERS}
				onBookWalk={handleBookWalk}
				onSelectWalker={handleSelectWalker}
			/>
		);
	}

	// Walker Profile View
	if (currentView === 'profile' && selectedWalker) {
		return (
			<div className='bg-gray-50 min-h-screen py-6'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					{/* Navigation */}
					<div className='mb-6'>
						<button
							onClick={goBack}
							className='flex items-center text-blue-600 hover:text-blue-800 font-medium'
						>
							← Back to Discovery
						</button>
					</div>

					<div className='grid grid-cols-1 xl:grid-cols-3 gap-8'>
						{/* Main Profile */}
						<div className='xl:col-span-2'>
							<DogWalkerProfile walker={selectedWalker} onBookWalk={handleBookWalk} />
						</div>

						{/* Sidebar */}
						<div className='space-y-6'>
							{/* Background Check */}
							<BackgroundCheckBadge
								backgroundCheck={selectedWalker.backgroundCheck}
								showDetails={true}
							/>

							{/* Reviews */}
							<WalkerReviews
								walkerId={selectedWalker.id}
								reviews={reviews}
								onAddReview={handleAddReview}
								compact={true}
							/>

							{/* Quick Stats */}
							<div className='bg-white rounded-xl border border-gray-200 shadow-sm p-6'>
								<h4 className='text-lg font-semibold text-gray-900 mb-4'>📊 Quick Stats</h4>
								<div className='space-y-3'>
									<div className='flex justify-between text-sm'>
										<span className='text-gray-600'>Experience:</span>
										<span className='text-gray-900 font-medium'>{selectedWalker.experience}</span>
									</div>
									<div className='flex justify-between text-sm'>
										<span className='text-gray-600'>Response Time:</span>
										<span className='text-gray-900 font-medium'>{selectedWalker.responseTime}</span>
									</div>
									<div className='flex justify-between text-sm'>
										<span className='text-gray-600'>Group Size:</span>
										<span className='text-gray-900 font-medium'>{selectedWalker.groupSize}</span>
									</div>
									<div className='flex justify-between text-sm'>
										<span className='text-gray-600'>Service Areas:</span>
										<span className='text-gray-900 font-medium text-right'>
											{selectedWalker.serviceArea.join(', ')}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Full Reviews Section */}
					<div className='mt-8'>
						<WalkerReviews
							walkerId={selectedWalker.id}
							reviews={reviews}
							onAddReview={handleAddReview}
						/>
					</div>
				</div>
			</div>
		);
	}

	// Booking View
	if (currentView === 'booking' && selectedWalker) {
		return (
			<div className='bg-gray-50 min-h-screen py-6'>
				<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
					{/* Navigation */}
					<div className='mb-6'>
						<button
							onClick={goBack}
							className='flex items-center text-blue-600 hover:text-blue-800 font-medium'
						>
							← Back to Profile
						</button>
					</div>

					<BasicBooking
						walker={selectedWalker}
						selectedDay={selectedDay}
						selectedTime={selectedTime}
						onBookingComplete={handleBookingComplete}
						onCancel={goBack}
					/>
				</div>
			</div>
		);
	}

	// Booking Confirmation View
	if (currentView === 'confirmation' && selectedWalker) {
		const latestBooking = bookingHistory[bookingHistory.length - 1];

		return (
			<div className='bg-gray-50 min-h-screen py-6'>
				<div className='max-w-2xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='bg-white rounded-xl border border-gray-200 shadow-lg p-8 text-center'>
						{/* Success Icon */}
						<div className='text-6xl mb-6'>✅</div>

						{/* Title */}
						<h1 className='text-2xl font-bold text-gray-900 mb-4'>Booking Confirmed!</h1>

						{/* Booking Details */}
						<div className='bg-gray-50 rounded-lg p-6 mb-6 text-left'>
							<h3 className='text-lg font-semibold text-gray-900 mb-4'>Booking Details</h3>
							<div className='space-y-2 text-sm'>
								<div className='flex justify-between'>
									<span className='text-gray-600'>Walker:</span>
									<span className='text-gray-900 font-medium'>{selectedWalker.name}</span>
								</div>
								<div className='flex justify-between'>
									<span className='text-gray-600'>Date & Time:</span>
									<span className='text-gray-900 font-medium'>
										{selectedDay} at {selectedTime}
									</span>
								</div>
								{latestBooking && (
									<>
										<div className='flex justify-between'>
											<span className='text-gray-600'>Duration:</span>
											<span className='text-gray-900 font-medium'>
												{latestBooking.walkDuration}
											</span>
										</div>
										<div className='flex justify-between'>
											<span className='text-gray-600'>Dogs:</span>
											<span className='text-gray-900 font-medium'>
												{latestBooking.dogNames.filter(name => name.trim()).join(', ')}
											</span>
										</div>
										<div className='flex justify-between'>
											<span className='text-gray-600'>Total Cost:</span>
											<span className='text-gray-900 font-bold text-lg'>
												${latestBooking.totalCost}
											</span>
										</div>
									</>
								)}
							</div>
						</div>

						{/* Next Steps */}
						<div className='bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6 text-left'>
							<h4 className='font-semibold text-blue-900 mb-3'>📱 What happens next?</h4>
							<ul className='text-sm text-blue-800 space-y-2'>
								<li className='flex items-start'>
									<span className='mr-2'>1.</span>
									<span>Your walker will receive the booking request within minutes</span>
								</li>
								<li className='flex items-start'>
									<span className='mr-2'>2.</span>
									<span>
										You'll get a confirmation call or message within {selectedWalker.responseTime}
									</span>
								</li>
								<li className='flex items-start'>
									<span className='mr-2'>3.</span>
									<span>Payment will be processed after the completed walk</span>
								</li>
								<li className='flex items-start'>
									<span className='mr-2'>4.</span>
									<span>You'll receive updates and photos during the walk</span>
								</li>
							</ul>
						</div>

						{/* Contact Info */}
						<div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6'>
							<p className='text-sm text-yellow-800'>
								<strong>Need to make changes?</strong> Contact your walker directly or reach out to
								our support team.
							</p>
						</div>

						{/* Action Buttons */}
						<div className='flex flex-col sm:flex-row gap-4 justify-center'>
							<button
								onClick={goToDiscovery}
								className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200'
							>
								Book Another Walk
							</button>
							<button
								onClick={() => setCurrentView('profile')}
								className='px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200'
							>
								View Walker Profile
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}

	// Fallback
	return (
		<div className='bg-gray-50 min-h-screen flex items-center justify-center'>
			<div className='text-center'>
				<div className='text-6xl mb-4'>🔄</div>
				<h2 className='text-xl font-semibold text-gray-900'>Loading...</h2>
			</div>
		</div>
	);
};
