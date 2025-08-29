// BackgroundCheckBadge - Display background check verification status
// Shows verification status, date, and detailed information about background checks

import PropTypes from 'prop-types';
import { useState } from 'react';

export const BackgroundCheckBadge = ({ backgroundCheck, compact = false, showDetails = false }) => {
	const [showDetailModal, setShowDetailModal] = useState(false);

	const formatDate = dateString => {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		});
	};

	const getDaysAgo = dateString => {
		const checkDate = new Date(dateString);
		const now = new Date();
		const diffTime = Math.abs(now - checkDate);
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return diffDays;
	};

	const getStatusColor = () => {
		if (!backgroundCheck.verified) return 'bg-red-100 text-red-800 border-red-200';

		const daysAgo = getDaysAgo(backgroundCheck.date);
		if (daysAgo <= 365) return 'bg-green-100 text-green-800 border-green-200';
		if (daysAgo <= 730) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
		return 'bg-orange-100 text-orange-800 border-orange-200';
	};

	const getStatusText = () => {
		if (!backgroundCheck.verified) return 'Not Verified';

		const daysAgo = getDaysAgo(backgroundCheck.date);
		if (daysAgo <= 365) return 'Recently Verified';
		if (daysAgo <= 730) return 'Verified';
		return 'Needs Update';
	};

	const getStatusIcon = () => {
		if (!backgroundCheck.verified) return '❌';

		const daysAgo = getDaysAgo(backgroundCheck.date);
		if (daysAgo <= 365) return '✅';
		if (daysAgo <= 730) return '⚠️';
		return '🔄';
	};

	// Compact version for walker cards
	if (compact) {
		return (
			<div
				className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor()}`}
			>
				<span className='mr-1'>{getStatusIcon()}</span>
				{backgroundCheck.verified ? 'Verified' : 'Unverified'}
			</div>
		);
	}

	// Full version with details
	return (
		<div className='bg-white rounded-xl border border-gray-200 shadow-sm p-6'>
			<div className='flex items-start justify-between mb-4'>
				<div>
					<h3 className='text-lg font-semibold text-gray-900 mb-2'>🔒 Background Check</h3>
					<div
						className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium border ${getStatusColor()}`}
					>
						<span className='mr-2 text-lg'>{getStatusIcon()}</span>
						{getStatusText()}
					</div>
				</div>
				{showDetails && (
					<button
						onClick={() => setShowDetailModal(true)}
						className='text-blue-600 text-sm hover:underline'
					>
						View Details
					</button>
				)}
			</div>

			{backgroundCheck.verified && (
				<div className='space-y-3'>
					<div className='flex justify-between text-sm'>
						<span className='text-gray-600'>Verification Date:</span>
						<span className='text-gray-900 font-medium'>{formatDate(backgroundCheck.date)}</span>
					</div>
					<div className='flex justify-between text-sm'>
						<span className='text-gray-600'>Days Since Check:</span>
						<span className='text-gray-900 font-medium'>
							{getDaysAgo(backgroundCheck.date)} days
						</span>
					</div>

					{/* Verification Items */}
					<div className='mt-4'>
						<h4 className='text-sm font-medium text-gray-700 mb-3'>Verification Includes:</h4>
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
							{[
								'Criminal Background Check',
								'Identity Verification',
								'Reference Checks',
								'Motor Vehicle Records',
								'Social Security Trace',
								'Sex Offender Registry',
							].map((item, index) => (
								<div key={index} className='flex items-center text-sm'>
									<span className='text-green-500 mr-2'>✓</span>
									<span className='text-gray-700'>{item}</span>
								</div>
							))}
						</div>
					</div>

					{/* Security Note */}
					<div className='mt-4 p-3 bg-blue-50 rounded-lg'>
						<div className='flex items-start'>
							<span className='text-blue-600 mr-2'>🛡️</span>
							<div className='text-sm text-blue-800'>
								<strong>Security Note:</strong> All background checks are performed by certified
								third-party agencies and updated annually for active walkers.
							</div>
						</div>
					</div>
				</div>
			)}

			{!backgroundCheck.verified && (
				<div className='mt-4 p-4 bg-red-50 border border-red-200 rounded-lg'>
					<div className='flex items-start'>
						<span className='text-red-600 mr-3 text-lg'>⚠️</span>
						<div>
							<h4 className='text-sm font-semibold text-red-800 mb-1'>Background Check Required</h4>
							<p className='text-sm text-red-700'>
								This walker has not completed our background verification process. We recommend
								choosing a verified walker for your peace of mind.
							</p>
						</div>
					</div>
				</div>
			)}

			{/* Detail Modal */}
			{showDetailModal && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
					<div className='bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
						<div className='p-6'>
							<div className='flex items-center justify-between mb-6'>
								<h3 className='text-xl font-bold text-gray-900'>Background Check Details</h3>
								<button
									onClick={() => setShowDetailModal(false)}
									className='text-gray-400 hover:text-gray-600 p-2'
								>
									✕
								</button>
							</div>

							<div className='space-y-6'>
								{/* Status Overview */}
								<div className='border-b border-gray-200 pb-4'>
									<div
										className={`inline-flex items-center px-4 py-2 rounded-lg text-lg font-medium border ${getStatusColor()}`}
									>
										<span className='mr-2 text-xl'>{getStatusIcon()}</span>
										{getStatusText()}
									</div>
									<p className='text-sm text-gray-600 mt-2'>
										Verified on {formatDate(backgroundCheck.date)} •{' '}
										{getDaysAgo(backgroundCheck.date)} days ago
									</p>
								</div>

								{/* Detailed Checks */}
								<div>
									<h4 className='text-lg font-semibold text-gray-900 mb-4'>
										Verification Components
									</h4>
									<div className='space-y-4'>
										{[
											{
												title: 'Criminal Background Check',
												description:
													'Multi-state and federal criminal records search including felonies, misdemeanors, and sex offender registry.',
												status: 'passed',
											},
											{
												title: 'Identity Verification',
												description:
													'Government-issued ID verification and Social Security number validation.',
												status: 'passed',
											},
											{
												title: 'Reference Verification',
												description: 'Professional and personal references contacted and verified.',
												status: 'passed',
											},
											{
												title: 'Motor Vehicle Records',
												description: 'Driving history and license status verification.',
												status: 'passed',
											},
											{
												title: 'Employment History',
												description: 'Previous employment verification and gap analysis.',
												status: 'passed',
											},
											{
												title: 'Education Verification',
												description: 'Relevant certifications and training credentials verified.',
												status: 'passed',
											},
										].map((check, index) => (
											<div key={index} className='flex items-start p-4 bg-gray-50 rounded-lg'>
												<span className='text-green-500 mr-3 mt-1'>✅</span>
												<div>
													<h5 className='font-medium text-gray-900'>{check.title}</h5>
													<p className='text-sm text-gray-600 mt-1'>{check.description}</p>
												</div>
											</div>
										))}
									</div>
								</div>

								{/* Renewal Info */}
								<div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
									<h4 className='font-medium text-blue-900 mb-2'>🔄 Renewal Policy</h4>
									<p className='text-sm text-blue-800'>
										Background checks are automatically renewed every 12 months for active walkers.
										Walkers with checks older than 24 months are suspended until renewal is
										completed.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

BackgroundCheckBadge.propTypes = {
	backgroundCheck: PropTypes.shape({
		verified: PropTypes.bool.isRequired,
		date: PropTypes.string.isRequired,
	}).isRequired,
	compact: PropTypes.bool,
	showDetails: PropTypes.bool,
};
