// MyWalks - Page displaying walks the user has joined and places they've checked in
// Shows both joined events and check-in places with navigation to details

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventCard } from '../components/EventCard';
import { sampleEvents } from '../data/sampleEvents';
import { sampleRoutes } from '../data/sampleRoutes';

export const MyWalks = () => {
	const navigate = useNavigate();

	// Component state
	const [joinedWalks, setJoinedWalks] = useState([]);
	const [checkInPlaces, setCheckInPlaces] = useState([]);
	const [loading, setLoading] = useState(true);
	const [activeTab, setActiveTab] = useState('events'); // 'events' or 'places'
	const [userReviews, setUserReviews] = useState([]);

	// Load joined walks and check-in places from localStorage
	useEffect(() => {
		const loadData = () => {
			try {
				// Load joined walks
				const savedJoinedWalks = localStorage.getItem('walkieWalkie_joinedWalks');
				const joinedWalkIds = savedJoinedWalks ? JSON.parse(savedJoinedWalks) : [];

				// Filter events to only show joined ones
				const joinedEvents = sampleEvents.filter(event =>
					joinedWalkIds.includes(event.id.toString())
				);
				setJoinedWalks(joinedEvents);

				// Load check-in places
				const savedCheckIns = localStorage.getItem('walkieWalkie_checkIns');
				const savedReviews = localStorage.getItem('walkieWalkie_reviews');
				const reviews = savedReviews ? JSON.parse(savedReviews) : [];
				setUserReviews(reviews);

				if (savedCheckIns) {
					const checkIns = JSON.parse(savedCheckIns);

					// Get unique places from check-ins
					const uniquePlaceIds = [...new Set(checkIns.map(checkIn => checkIn.placeId))];
					const checkInPlacesData = uniquePlaceIds
						.map(placeId => {
							const place = sampleRoutes.find(route => route.id === placeId);
							if (place) {
								const placeCheckIns = checkIns.filter(checkIn => checkIn.placeId === placeId);
								const placeReviews = reviews.filter(review => review.placeId === placeId);
								return {
									...place,
									checkInCount: placeCheckIns.length,
									lastCheckIn: placeCheckIns[placeCheckIns.length - 1].date,
									userReviews: placeReviews,
									userRating:
										placeReviews.length > 0 ? placeReviews[placeReviews.length - 1].rating : null,
									latestReview:
										placeReviews.length > 0 ? placeReviews[placeReviews.length - 1] : null,
								};
							}
							return null;
						})
						.filter(Boolean)
						.sort((a, b) => new Date(b.lastCheckIn) - new Date(a.lastCheckIn)); // Sort by most recent

					setCheckInPlaces(checkInPlacesData);
				}
			} catch (error) {
				console.error('Error loading data:', error);
				setJoinedWalks([]);
				setCheckInPlaces([]);
			} finally {
				setLoading(false);
			}
		};

		loadData();

		// Listen for updates
		const handleDataUpdate = () => {
			loadData();
		};

		window.addEventListener('joinedWalksUpdated', handleDataUpdate);
		window.addEventListener('checkInsUpdated', handleDataUpdate);
		window.addEventListener('reviewsUpdated', handleDataUpdate);

		return () => {
			window.removeEventListener('joinedWalksUpdated', handleDataUpdate);
			window.removeEventListener('checkInsUpdated', handleDataUpdate);
			window.removeEventListener('reviewsUpdated', handleDataUpdate);
		};
	}, []);

	const formatDate = dateString => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
		});
	};

	// Return
	return (
		<div className='walkie-background min-h-screen'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8'>
				{/* Header */}
				<div className='text-center mb-6 sm:mb-8'>
					<h1 className='walkie-main-title text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4'>
						🐾 My Walks
					</h1>
					<p className='walkie-subtitle text-base sm:text-lg text-gray-600 max-w-2xl mx-auto'>
						Your dog walking adventures and check-in history
					</p>
				</div>

				{/* Tabs */}
				<div className='flex justify-center mb-6'>
					<div className='walkie-section-border bg-white rounded-xl border border-gray-200 shadow-sm p-1 flex'>
						<button
							onClick={() => setActiveTab('events')}
							className={`px-4 py-2 rounded-lg font-medium transition-colors min-h-[44px] touch-manipulation ${
								activeTab === 'events'
									? 'walkie-button text-white'
									: 'text-gray-600 hover:text-gray-900'
							}`}
						>
							📅 Joined Events ({joinedWalks.length})
						</button>
						<button
							onClick={() => setActiveTab('places')}
							className={`px-4 py-2 rounded-lg font-medium transition-colors min-h-[44px] touch-manipulation ${
								activeTab === 'places'
									? 'walkie-button text-white'
									: 'text-gray-600 hover:text-gray-900'
							}`}
						>
							📍 Check-in Places ({checkInPlaces.length})
						</button>
					</div>
				</div>

				{/* Content */}
				{loading ? (
					<div className='flex justify-center items-center py-12'>
						<div className='text-center'>
							<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4'></div>
							<p className='walkie-subtitle text-gray-600'>Loading your walks...</p>
						</div>
					</div>
				) : (
					<>
						{/* Joined Events Tab */}
						{activeTab === 'events' && (
							<>
								{joinedWalks.length === 0 ? (
									<div className='text-center py-12 sm:py-16'>
										<div className='mb-6'>
											<span className='text-6xl sm:text-7xl lg:text-8xl'>🐕‍🦺</span>
										</div>
										<h2 className='walkie-subtitle text-xl sm:text-2xl font-semibold text-gray-700 mb-4'>
											No events joined yet
										</h2>
										<p className='walkie-subtitle text-base sm:text-lg text-gray-500 mb-8 max-w-md mx-auto'>
											Start exploring available dog walks and join some adventures with fellow dog
											lovers!
										</p>
										<button
											onClick={() => navigate('/walks')}
											className='walkie-button inline-flex items-center justify-center font-medium text-white px-6 py-3 text-base rounded-lg min-h-[48px] touch-manipulation'
										>
											🔍 Browse Available Walks
										</button>
									</div>
								) : (
									<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 justify-items-center'>
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
								)}
							</>
						)}

						{/* Check-in Places Tab */}
						{activeTab === 'places' && (
							<>
								{checkInPlaces.length === 0 ? (
									<div className='text-center py-12 sm:py-16'>
										<div className='mb-6'>
											<span className='text-6xl sm:text-7xl lg:text-8xl'>📍</span>
										</div>
										<h2 className='walkie-subtitle text-xl sm:text-2xl font-semibold text-gray-700 mb-4'>
											No places visited yet
										</h2>
										<p className='walkie-subtitle text-base sm:text-lg text-gray-500 mb-8 max-w-md mx-auto'>
											Explore routes and check in at beautiful walking spots to build your history!
										</p>
										<button
											onClick={() => navigate('/routes')}
											className='walkie-button inline-flex items-center justify-center font-medium text-white px-6 py-3 text-base rounded-lg min-h-[48px] touch-manipulation'
										>
											🗺️ Discover Routes
										</button>
									</div>
								) : (
									<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
										{checkInPlaces.map(place => (
											<div
												key={place.id}
												onClick={() => navigate(`/place-detail/${place.id}`)}
												className='walkie-section-border bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6 cursor-pointer hover:transform hover:scale-105 transition-all duration-200 hover:shadow-lg'
											>
												{/* User Photo (if exists) */}
												{place.latestReview?.photo && (
													<div className='mb-3 -mx-4 -mt-4 sm:-mx-6 sm:-mt-6'>
														<img
															src={place.latestReview.photo}
															alt={`Your photo from ${place.name}`}
															className='w-full h-32 object-cover rounded-t-xl'
														/>
													</div>
												)}

												{/* Place Header */}
												<div className='mb-3'>
													<h3 className='walkie-main-title text-lg sm:text-xl font-bold mb-2 leading-tight'>
														{place.name}
													</h3>
													<p className='walkie-subtitle text-sm text-gray-600'>
														📍 {place.location}
													</p>
												</div>

												{/* User Review (if exists) */}
												{place.latestReview && (
													<div className='mb-3 p-3 bg-orange-50 rounded-lg border border-orange-100'>
														<div className='flex items-center gap-1 mb-1'>
															<span className='text-sm font-medium text-orange-700'>
																Your review:
															</span>
															<div className='flex'>
																{[...Array(place.latestReview.rating)].map((_, i) => (
																	<span key={i} className='text-yellow-400 text-xs'>
																		⭐
																	</span>
																))}
															</div>
														</div>
														{place.latestReview.comment && (
															<p className='text-xs text-gray-700 italic'>
																"{place.latestReview.comment}"
															</p>
														)}
													</div>
												)}

												{/* Check-in Stats */}
												<div className='grid grid-cols-2 gap-2 mb-3 text-xs sm:text-sm'>
													<div className='flex items-center'>
														<span className='walkie-subtitle'>
															✅ {place.checkInCount} check-in{place.checkInCount !== 1 ? 's' : ''}
														</span>
													</div>
													<div className='flex items-center'>
														<span className='walkie-subtitle'>📏 {place.distance}</span>
													</div>
												</div>

												{/* Last Visit */}
												<div className='text-xs text-gray-500 border-t border-gray-100 pt-2'>
													<span>Last visit: {formatDate(place.lastCheckIn)}</span>
												</div>

												{/* Rating */}
												<div className='flex items-center justify-between text-xs text-gray-500 mt-2'>
													<div className='flex items-center'>
														<span>⭐ {place.rating}</span>
													</div>
													<div className='flex items-center'>
														<span className='px-2 py-1 bg-green-100 text-green-800 rounded-full'>
															Visited
														</span>
													</div>
												</div>
											</div>
										))}
									</div>
								)}
							</>
						)}
					</>
				)}
			</div>
		</div>
	);
};
