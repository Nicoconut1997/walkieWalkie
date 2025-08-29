// WalkerReviews - Display and manage walker reviews and ratings
// Shows individual reviews, rating breakdown, and allows adding new reviews

import { useState } from 'react';
import PropTypes from 'prop-types';

export const WalkerReviews = ({ walkerId, reviews, onAddReview, compact = false }) => {
	const [showReviewForm, setShowReviewForm] = useState(false);
	const [newReview, setNewReview] = useState({
		rating: 5,
		comment: '',
		walkType: 'Standard Walk',
	});

	// Filter reviews for this walker
	const walkerReviews = reviews.filter(review => review.walkerId === walkerId);

	// Calculate rating breakdown
	const ratingBreakdown = {
		5: walkerReviews.filter(r => r.rating === 5).length,
		4: walkerReviews.filter(r => r.rating === 4).length,
		3: walkerReviews.filter(r => r.rating === 3).length,
		2: walkerReviews.filter(r => r.rating === 2).length,
		1: walkerReviews.filter(r => r.rating === 1).length,
	};

	const totalReviews = walkerReviews.length;
	const averageRating =
		totalReviews > 0
			? walkerReviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
			: 0;

	const getStarDisplay = rating => {
		return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
	};

	const handleSubmitReview = () => {
		const review = {
			id: Date.now(),
			walkerId,
			reviewerName: 'Anonymous User', // In real app, would come from user context
			rating: newReview.rating,
			date: new Date().toISOString().split('T')[0],
			comment: newReview.comment,
			walkType: newReview.walkType,
		};

		if (onAddReview) {
			onAddReview(review);
		}

		// Reset form
		setNewReview({ rating: 5, comment: '', walkType: 'Standard Walk' });
		setShowReviewForm(false);
	};

	// Compact view for quick display
	if (compact) {
		return (
			<div className='bg-gray-50 rounded-lg p-4'>
				<div className='flex items-center justify-between mb-3'>
					<h4 className='text-lg font-semibold text-gray-900'>Reviews</h4>
					<div className='flex items-center space-x-2'>
						<span className='text-2xl text-yellow-500'>⭐</span>
						<span className='text-lg font-bold'>{averageRating.toFixed(1)}</span>
						<span className='text-sm text-gray-600'>({totalReviews})</span>
					</div>
				</div>

				{walkerReviews.slice(0, 2).map(review => (
					<div key={review.id} className='border-b border-gray-200 pb-3 mb-3 last:border-b-0'>
						<div className='flex items-start justify-between mb-2'>
							<div>
								<span className='text-sm font-medium text-gray-900'>{review.reviewerName}</span>
								<span className='text-xs text-gray-500 ml-2'>{review.walkType}</span>
							</div>
							<span className='text-sm text-yellow-600'>{getStarDisplay(review.rating)}</span>
						</div>
						<p className='text-sm text-gray-600 line-clamp-2'>{review.comment}</p>
					</div>
				))}

				{totalReviews > 2 && (
					<div className='text-sm text-blue-600 font-medium'>View all {totalReviews} reviews</div>
				)}
			</div>
		);
	}

	// Full review display
	return (
		<div className='bg-white rounded-xl border border-gray-200 shadow-sm p-6'>
			{/* Header */}
			<div className='flex items-center justify-between mb-6'>
				<h3 className='text-xl font-bold text-gray-900'>Reviews & Ratings</h3>
				<button
					onClick={() => setShowReviewForm(!showReviewForm)}
					className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200'
				>
					Write Review
				</button>
			</div>

			{/* Rating Summary */}
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
				{/* Overall Rating */}
				<div className='text-center'>
					<div className='text-4xl font-bold text-gray-900 mb-2'>{averageRating.toFixed(1)}</div>
					<div className='text-2xl text-yellow-500 mb-2'>
						{getStarDisplay(Math.round(averageRating))}
					</div>
					<div className='text-sm text-gray-600'>
						{totalReviews} review{totalReviews !== 1 ? 's' : ''}
					</div>
				</div>

				{/* Rating Breakdown */}
				<div className='space-y-2'>
					{[5, 4, 3, 2, 1].map(stars => {
						const count = ratingBreakdown[stars];
						const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;

						return (
							<div key={stars} className='flex items-center space-x-3'>
								<span className='text-sm text-gray-600 w-8'>{stars}★</span>
								<div className='flex-1 bg-gray-200 rounded-full h-2'>
									<div
										className='bg-yellow-500 h-2 rounded-full transition-all duration-300'
										style={{ width: `${percentage}%` }}
									/>
								</div>
								<span className='text-sm text-gray-600 w-8'>{count}</span>
							</div>
						);
					})}
				</div>
			</div>

			{/* Review Form */}
			{showReviewForm && (
				<div className='bg-gray-50 rounded-lg p-6 mb-6'>
					<h4 className='text-lg font-semibold text-gray-900 mb-4'>Write a Review</h4>

					<div className='space-y-4'>
						{/* Rating Selection */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>Rating</label>
							<div className='flex space-x-2'>
								{[1, 2, 3, 4, 5].map(rating => (
									<button
										key={rating}
										onClick={() => setNewReview(prev => ({ ...prev, rating }))}
										className={`text-2xl ${
											rating <= newReview.rating ? 'text-yellow-500' : 'text-gray-300'
										} hover:text-yellow-500 transition-colors duration-200`}
									>
										⭐
									</button>
								))}
							</div>
						</div>

						{/* Walk Type */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>Walk Type</label>
							<select
								value={newReview.walkType}
								onChange={e => setNewReview(prev => ({ ...prev, walkType: e.target.value }))}
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
							>
								<option value='Standard Walk'>Standard Walk</option>
								<option value='Adventure Walk'>Adventure Walk</option>
								<option value='Training Walk'>Training Walk</option>
								<option value='Socialization Walk'>Socialization Walk</option>
								<option value='Gentle Walk'>Gentle Walk</option>
							</select>
						</div>

						{/* Comment */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>Comment</label>
							<textarea
								value={newReview.comment}
								onChange={e => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
								placeholder='Share your experience with this walker...'
								rows={4}
								className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
							/>
						</div>

						{/* Form Actions */}
						<div className='flex justify-end space-x-3'>
							<button
								onClick={() => setShowReviewForm(false)}
								className='px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50'
							>
								Cancel
							</button>
							<button
								onClick={handleSubmitReview}
								disabled={!newReview.comment.trim()}
								className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed'
							>
								Submit Review
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Reviews List */}
			<div className='space-y-6'>
				{walkerReviews.length > 0 ? (
					walkerReviews.map(review => (
						<div key={review.id} className='border-b border-gray-200 pb-6 last:border-b-0'>
							<div className='flex items-start justify-between mb-3'>
								<div className='flex items-center space-x-3'>
									<div className='w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm'>
										{review.reviewerName
											.split(' ')
											.map(n => n[0])
											.join('')}
									</div>
									<div>
										<div className='font-medium text-gray-900'>{review.reviewerName}</div>
										<div className='text-sm text-gray-500'>{review.walkType}</div>
									</div>
								</div>
								<div className='text-right'>
									<div className='text-lg text-yellow-600'>{getStarDisplay(review.rating)}</div>
									<div className='text-sm text-gray-500'>
										{new Date(review.date).toLocaleDateString()}
									</div>
								</div>
							</div>
							<p className='text-gray-700 leading-relaxed'>{review.comment}</p>
						</div>
					))
				) : (
					<div className='text-center py-8'>
						<div className='text-6xl mb-4'>📝</div>
						<h4 className='text-lg font-semibold text-gray-900 mb-2'>No reviews yet</h4>
						<p className='text-gray-600'>Be the first to review this walker!</p>
					</div>
				)}
			</div>
		</div>
	);
};

WalkerReviews.propTypes = {
	walkerId: PropTypes.number.isRequired,
	reviews: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			walkerId: PropTypes.number.isRequired,
			reviewerName: PropTypes.string.isRequired,
			rating: PropTypes.number.isRequired,
			date: PropTypes.string.isRequired,
			comment: PropTypes.string.isRequired,
			walkType: PropTypes.string.isRequired,
		})
	).isRequired,
	onAddReview: PropTypes.func,
	compact: PropTypes.bool,
};
