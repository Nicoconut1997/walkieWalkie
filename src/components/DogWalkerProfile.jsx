// DogWalkerProfile - Individual walker profile component with ratings, experience, and availability
// Displays walker information, certifications, availability calendar, and booking options

import PropTypes from 'prop-types';
import { useState } from 'react';

export const DogWalkerProfile = ({ walker, onBookWalk, compact = false }) => {
	const [selectedDay, setSelectedDay] = useState(null);
	const [showFullBio, setShowFullBio] = useState(false);

	const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
	const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

	const formatBio = bio => {
		if (compact || bio.length <= 120) return bio;
		if (showFullBio) return bio;
		return bio.substring(0, 120) + '...';
	};

	const getStarRating = rating => {
		const fullStars = Math.floor(rating);
		const hasHalfStar = rating % 1 !== 0;
		const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

		return '⭐'.repeat(fullStars) + (hasHalfStar ? '⭐' : '') + '☆'.repeat(emptyStars);
	};

	const handleTimeSlotClick = (day, time) => {
		if (onBookWalk) {
			onBookWalk(walker, day, time);
		}
	};

	// Compact view for discovery/listing
	if (compact) {
		return (
			<div className='bg-white rounded-xl border border-gray-200 shadow-sm p-4 hover:shadow-md transition-shadow duration-200'>
				<div className='flex items-start space-x-4'>
					{/* Profile Image */}
					<div className='text-4xl flex-shrink-0'>{walker.profileImage}</div>

					{/* Main Info */}
					<div className='flex-1 min-w-0'>
						<div className='flex items-start justify-between'>
							<div>
								<h3 className='text-lg font-bold text-gray-900 truncate'>{walker.name}</h3>
								<div className='flex items-center space-x-2 mt-1'>
									<span className='text-sm text-yellow-600'>{getStarRating(walker.rating)}</span>
									<span className='text-sm text-gray-600'>({walker.reviewCount})</span>
									<span className='text-sm text-gray-400'>•</span>
									<span className='text-sm text-gray-600'>{walker.experience}</span>
								</div>
							</div>
							<div className='text-right flex-shrink-0'>
								<div className='text-lg font-bold text-green-600'>${walker.hourlyRate}/hr</div>
								{walker.responseTime && (
									<div className='text-xs text-gray-500'>{walker.responseTime}</div>
								)}
							</div>
						</div>

						<p className='text-sm text-gray-600 mt-2 line-clamp-2'>{formatBio(walker.bio)}</p>

						{/* Specialties */}
						<div className='flex flex-wrap gap-1 mt-3'>
							{walker.specialties.slice(0, 3).map((specialty, index) => (
								<span
									key={index}
									className='bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full'
								>
									{specialty}
								</span>
							))}
							{walker.specialties.length > 3 && (
								<span className='text-xs text-gray-500'>+{walker.specialties.length - 3} more</span>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}

	// Full profile view
	return (
		<div className='bg-white rounded-xl border border-gray-200 shadow-sm p-6 max-w-4xl'>
			{/* Header Section */}
			<div className='flex items-start space-x-6 mb-6'>
				{/* Profile Image */}
				<div className='text-6xl flex-shrink-0'>{walker.profileImage}</div>

				{/* Basic Info */}
				<div className='flex-1'>
					<div className='flex items-start justify-between mb-4'>
						<div>
							<h1 className='text-2xl font-bold text-gray-900 mb-2'>{walker.name}</h1>
							<div className='flex items-center space-x-4 mb-2'>
								<div className='flex items-center space-x-2'>
									<span className='text-lg text-yellow-600'>{getStarRating(walker.rating)}</span>
									<span className='text-gray-600'>{walker.rating}</span>
									<span className='text-gray-400'>•</span>
									<span className='text-gray-600'>{walker.reviewCount} reviews</span>
								</div>
								<div className='flex items-center space-x-2'>
									<span className='text-gray-400'>•</span>
									<span className='text-gray-600'>{walker.experience} experience</span>
								</div>
							</div>
							{walker.backgroundCheck.verified && (
								<div className='flex items-center space-x-2'>
									<span className='text-green-600'>✓</span>
									<span className='text-sm text-green-600 font-medium'>
										Background Check Verified
									</span>
									<span className='text-xs text-gray-500'>
										({new Date(walker.backgroundCheck.date).toLocaleDateString()})
									</span>
								</div>
							)}
						</div>
						<div className='text-right'>
							<div className='text-3xl font-bold text-green-600'>${walker.hourlyRate}</div>
							<div className='text-sm text-gray-600'>per hour</div>
							<div className='text-xs text-gray-500 mt-1'>Responds {walker.responseTime}</div>
						</div>
					</div>

					{/* Bio */}
					<div className='mb-4'>
						<p className='text-gray-700 leading-relaxed'>{formatBio(walker.bio)}</p>
						{walker.bio.length > 120 && !compact && (
							<button
								onClick={() => setShowFullBio(!showFullBio)}
								className='text-blue-600 text-sm hover:underline mt-1'
							>
								{showFullBio ? 'Show less' : 'Read more'}
							</button>
						)}
					</div>
				</div>
			</div>

			{/* Details Grid */}
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
				{/* Specialties & Certifications */}
				<div>
					<h3 className='text-lg font-semibold text-gray-900 mb-3'>
						🏆 Specialties & Certifications
					</h3>
					<div className='space-y-3'>
						<div>
							<h4 className='text-sm font-medium text-gray-700 mb-2'>Specialties</h4>
							<div className='flex flex-wrap gap-2'>
								{walker.specialties.map((specialty, index) => (
									<span
										key={index}
										className='bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full'
									>
										{specialty}
									</span>
								))}
							</div>
						</div>
						<div>
							<h4 className='text-sm font-medium text-gray-700 mb-2'>Certifications</h4>
							<div className='flex flex-wrap gap-2'>
								{walker.certifications.map((cert, index) => (
									<span
										key={index}
										className='bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full'
									>
										{cert}
									</span>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* Service Details */}
				<div>
					<h3 className='text-lg font-semibold text-gray-900 mb-3'>📋 Service Details</h3>
					<div className='space-y-2 text-sm'>
						<div className='flex justify-between'>
							<span className='text-gray-600'>Service Areas:</span>
							<span className='text-gray-900'>{walker.serviceArea.join(', ')}</span>
						</div>
						<div className='flex justify-between'>
							<span className='text-gray-600'>Walk Durations:</span>
							<span className='text-gray-900'>{walker.walkDuration.join(', ')}</span>
						</div>
						<div className='flex justify-between'>
							<span className='text-gray-600'>Group Size:</span>
							<span className='text-gray-900'>{walker.groupSize}</span>
						</div>
						<div className='flex justify-between'>
							<span className='text-gray-600'>Emergency Contact:</span>
							<span className='text-green-600'>
								{walker.emergencyContact ? '✓ Available' : '✗ Not available'}
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* Availability Calendar */}
			<div>
				<h3 className='text-lg font-semibold text-gray-900 mb-3'>📅 Availability This Week</h3>
				<div className='grid grid-cols-7 gap-2'>
					{days.map((day, index) => {
						const daySlots = walker.availability[day] || [];
						const isSelected = selectedDay === day;

						return (
							<div key={day} className='text-center'>
								<div className='text-sm font-medium text-gray-700 mb-2'>{dayNames[index]}</div>
								<div className='space-y-1'>
									{daySlots.length > 0 ? (
										daySlots.map((time, timeIndex) => (
											<button
												key={timeIndex}
												onClick={() => handleTimeSlotClick(day, time)}
												className='w-full text-xs bg-green-100 text-green-800 px-2 py-1 rounded hover:bg-green-200 transition-colors duration-200'
											>
												{time}
											</button>
										))
									) : (
										<div className='text-xs text-gray-400 py-1'>Unavailable</div>
									)}
								</div>
							</div>
						);
					})}
				</div>
				<div className='text-xs text-gray-500 mt-3 text-center'>
					Click any available time slot to book a walk
				</div>
			</div>
		</div>
	);
};

DogWalkerProfile.propTypes = {
	walker: PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		profileImage: PropTypes.string.isRequired,
		bio: PropTypes.string.isRequired,
		experience: PropTypes.string.isRequired,
		rating: PropTypes.number.isRequired,
		reviewCount: PropTypes.number.isRequired,
		hourlyRate: PropTypes.number.isRequired,
		availability: PropTypes.object.isRequired,
		specialties: PropTypes.arrayOf(PropTypes.string).isRequired,
		certifications: PropTypes.arrayOf(PropTypes.string).isRequired,
		backgroundCheck: PropTypes.shape({
			verified: PropTypes.bool.isRequired,
			date: PropTypes.string.isRequired,
		}).isRequired,
		serviceArea: PropTypes.arrayOf(PropTypes.string).isRequired,
		responseTime: PropTypes.string.isRequired,
		walkDuration: PropTypes.arrayOf(PropTypes.string).isRequired,
		groupSize: PropTypes.string.isRequired,
		emergencyContact: PropTypes.bool.isRequired,
	}).isRequired,
	onBookWalk: PropTypes.func,
	compact: PropTypes.bool,
};
