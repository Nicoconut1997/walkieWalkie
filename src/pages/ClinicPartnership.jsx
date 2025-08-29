// ClinicPartnership - B2B2C partnership page showing vet clinic partnerships
// Features existing partnerships with local veterinary practices and walkieWalkie

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { samplePartnerships, partnershipStats } from '../data/samplePartnerships';

export const ClinicPartnership = () => {
	// Component state
	const [partnerships, setPartnerships] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedPartnershipType, setSelectedPartnershipType] = useState('all');

	// Load partnerships data
	useEffect(() => {
		// Simulate loading delay
		setTimeout(() => {
			setPartnerships(samplePartnerships);
			setLoading(false);
		}, 500);
	}, []);

	// Variables / constants
	const filteredPartnerships = selectedPartnershipType === 'all' 
		? partnerships 
		: partnerships.filter(p => p.partnershipType === selectedPartnershipType);

	const partnershipTypeOptions = [
		{ value: 'all', label: 'All Partners' },
		{ value: 'Premium Partner', label: 'Premium Partners' },
		{ value: 'Specialist Partner', label: 'Specialist Partners' },
		{ value: 'Community Partner', label: 'Community Partners' },
		{ value: 'Safety Partner', label: 'Safety Partners' },
		{ value: 'Wellness Partner', label: 'Wellness Partners' }
	];

	// Functions
	const handlePartnershipTypeChange = (type) => {
		setSelectedPartnershipType(type);
	};

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString('en-US', { 
			year: 'numeric', 
			month: 'long', 
			day: 'numeric' 
		});
	};

	// Return
	return (
		<div className='walkie-background min-h-screen'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8'>
				
				{/* Page Header */}
				<div className='text-center mb-8 sm:mb-12'>
					<h1 className='walkie-main-title text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4'>
						🏥 Clinic Partnership
					</h1>
					<p className='walkie-subtitle text-base sm:text-lg max-w-3xl mx-auto px-4'>
						Connecting veterinary practices with walkieWalkie to provide comprehensive pet care and walking services. Our B2B2C partnerships benefit vets, pet owners, and the walkieWalkie community.
					</p>
				</div>

				{loading ? (
					/* Loading State */
					<div className='text-center py-12'>
						<div className='text-4xl mb-4'>⏳</div>
						<p className='walkie-subtitle'>Loading partnership information...</p>
					</div>
				) : (
					<>
						{/* Partnership Statistics */}
						<div className='mb-8 sm:mb-12'>
							<div className='walkie-section-border bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8'>
								<h2 className='walkie-main-title text-xl sm:text-2xl font-bold mb-6 text-center'>
									Partnership Impact
								</h2>
								<div className='grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6'>
									<div className='text-center'>
										<div className='text-2xl sm:text-3xl font-bold text-primary-500 mb-2'>
											{partnershipStats.totalPartners}
										</div>
										<div className='walkie-subtitle text-sm sm:text-base'>
											Partner Clinics
										</div>
									</div>
									<div className='text-center'>
										<div className='text-2xl sm:text-3xl font-bold text-primary-500 mb-2'>
											{partnershipStats.totalCustomersServed}
										</div>
										<div className='walkie-subtitle text-sm sm:text-base'>
											Customers Served
										</div>
									</div>
									<div className='text-center'>
										<div className='text-2xl sm:text-3xl font-bold text-primary-500 mb-2'>
											{partnershipStats.averageRating}★
										</div>
										<div className='walkie-subtitle text-sm sm:text-base'>
											Average Rating
										</div>
									</div>
									<div className='text-center'>
										<div className='text-2xl sm:text-3xl font-bold text-primary-500 mb-2'>
											{partnershipStats.totalWalkingGroupsSponsored}
										</div>
										<div className='walkie-subtitle text-sm sm:text-base'>
											Walking Groups
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Partnership Type Filter */}
						<div className='mb-6 sm:mb-8'>
							<div className='flex flex-wrap gap-2 sm:gap-3 justify-center'>
								{partnershipTypeOptions.map(option => (
									<button
										key={option.value}
										onClick={() => handlePartnershipTypeChange(option.value)}
										className={`px-4 py-2 text-sm sm:text-base rounded-lg font-medium transition-colors duration-200 ${
											selectedPartnershipType === option.value
												? 'walkie-button text-white'
												: 'bg-white border-2 border-gray-300 text-gray-700 hover:border-primary-500 hover:text-primary-500'
										}`}
									>
										{option.label}
									</button>
								))}
							</div>
						</div>

						{/* Partnership Cards */}
						{filteredPartnerships.length > 0 ? (
							<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12'>
								{filteredPartnerships.map(partnership => (
									<div key={partnership.id} className='walkie-section-border bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8'>
										{/* Clinic Header */}
										<div className='flex items-start justify-between mb-4'>
											<div className='flex items-center space-x-3'>
												<div className='text-3xl sm:text-4xl'>{partnership.image}</div>
												<div>
													<h3 className='walkie-main-title text-lg sm:text-xl font-bold'>
														{partnership.clinicName}
													</h3>
													<p className='walkie-subtitle text-sm sm:text-base'>
														{partnership.vetName}
													</p>
												</div>
											</div>
											<div className='text-right'>
												<div className='flex items-center space-x-1 mb-1'>
													<span className='text-sm sm:text-base font-medium'>{partnership.rating}</span>
													<span className='text-yellow-500'>★</span>
												</div>
												<span className={`px-2 py-1 text-xs rounded-full ${
													partnership.partnershipType === 'Premium Partner' ? 'bg-purple-100 text-purple-800' :
													partnership.partnershipType === 'Specialist Partner' ? 'bg-blue-100 text-blue-800' :
													partnership.partnershipType === 'Community Partner' ? 'bg-green-100 text-green-800' :
													partnership.partnershipType === 'Safety Partner' ? 'bg-red-100 text-red-800' :
													'bg-indigo-100 text-indigo-800'
												}`}>
													{partnership.partnershipType}
												</span>
											</div>
										</div>

										{/* Clinic Info */}
										<div className='mb-4'>
											<p className='walkie-subtitle text-sm mb-2'>
												📍 {partnership.address}
											</p>
											<p className='walkie-subtitle text-sm mb-2'>
												📞 {partnership.phone}
											</p>
											<p className='walkie-subtitle text-sm mb-2'>
												🌐 {partnership.website}
											</p>
											<p className='walkie-subtitle text-sm'>
												🤝 Partner since {formatDate(partnership.partnerSince)}
											</p>
										</div>

										{/* Specialties */}
										<div className='mb-4'>
											<h4 className='walkie-main-title font-semibold mb-2'>Specialties:</h4>
											<div className='flex flex-wrap gap-2'>
												{partnership.specialties.map((specialty, index) => (
													<span key={index} className='px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg'>
														{specialty}
													</span>
												))}
											</div>
										</div>

										{/* Partnership Benefits */}
										<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4'>
											<div>
												<h4 className='walkie-main-title font-semibold mb-2 text-sm'>
													🐕 walkieWalkie Benefits:
												</h4>
												<ul className='space-y-1'>
													{partnership.walkieWalkieBenefits.slice(0, 2).map((benefit, index) => (
														<li key={index} className='walkie-subtitle text-xs'>
															• {benefit}
														</li>
													))}
												</ul>
											</div>
											<div>
												<h4 className='walkie-main-title font-semibold mb-2 text-sm'>
													👥 Customer Benefits:
												</h4>
												<ul className='space-y-1'>
													{partnership.customerBenefits.slice(0, 2).map((benefit, index) => (
														<li key={index} className='walkie-subtitle text-xs'>
															• {benefit}
														</li>
													))}
												</ul>
											</div>
										</div>

										{/* Partnership Stats */}
										<div className='border-t border-gray-200 pt-4'>
											<div className='flex justify-between text-center'>
												<div>
													<div className='text-lg sm:text-xl font-bold text-primary-500'>
														{partnership.totalCustomersServed}
													</div>
													<div className='walkie-subtitle text-xs'>
														Customers Served
													</div>
												</div>
												<div>
													<div className='text-lg sm:text-xl font-bold text-primary-500'>
														{partnership.monthlyWalkingGroupsSponsored}
													</div>
													<div className='walkie-subtitle text-xs'>
														Monthly Groups
													</div>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						) : (
							/* No Results */
							<div className='text-center py-12'>
								<div className='text-4xl mb-4'>🔍</div>
								<h3 className='walkie-main-title text-xl font-bold mb-2'>
									No Partnerships Found
								</h3>
								<p className='walkie-subtitle mb-4'>
									No partnerships match the selected filter.
								</p>
								<button
									onClick={() => setSelectedPartnershipType('all')}
									className='walkie-button inline-flex items-center justify-center font-medium text-white px-6 py-3 text-base rounded-lg'
								>
									View All Partnerships
								</button>
							</div>
						)}

						{/* Call to Action */}
						<div className='walkie-section-border bg-white rounded-xl border border-gray-200 shadow-sm p-8 sm:p-12 text-center'>
							<h2 className='walkie-main-title text-2xl sm:text-3xl font-bold mb-4'>
								Interested in Partnering?
							</h2>
							<p className='walkie-subtitle text-base sm:text-lg mb-6 max-w-2xl mx-auto'>
								Join our network of veterinary partners and help provide comprehensive care for the walkieWalkie community. Together, we can create healthier, happier dogs and stronger communities.
							</p>
							<div className='space-y-3 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center'>
								<button className='walkie-button inline-flex items-center justify-center font-medium text-white px-6 py-3 text-base rounded-lg w-full sm:w-auto min-h-[48px] touch-manipulation'>
									🤝 Apply for Partnership
								</button>
								<button className='inline-flex items-center justify-center font-medium text-gray-700 bg-white border-2 border-gray-300 hover:border-orange-500 hover:text-orange-500 px-6 py-3 text-base rounded-lg w-full sm:w-auto min-h-[48px] touch-manipulation transition-colors'>
									📞 Contact Us
								</button>
							</div>
						</div>

						{/* Benefits Section */}
						<div className='mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8'>
							{/* Benefits for Vets */}
							<div className='walkie-section-border bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8'>
								<h3 className='walkie-main-title text-xl sm:text-2xl font-bold mb-4 flex items-center'>
									🩺 Benefits for Veterinary Practices
								</h3>
								<ul className='space-y-3'>
									<li className='walkie-subtitle flex items-start space-x-2'>
										<span className='text-primary-500 mt-1'>•</span>
										<span>Increased customer referrals through walkieWalkie network</span>
									</li>
									<li className='walkie-subtitle flex items-start space-x-2'>
										<span className='text-primary-500 mt-1'>•</span>
										<span>Enhanced visibility in the local pet community</span>
									</li>
									<li className='walkie-subtitle flex items-start space-x-2'>
										<span className='text-primary-500 mt-1'>•</span>
										<span>Opportunities to educate pet owners about health and wellness</span>
									</li>
									<li className='walkie-subtitle flex items-start space-x-2'>
										<span className='text-primary-500 mt-1'>•</span>
										<span>Marketing support and co-promotional opportunities</span>
									</li>
									<li className='walkie-subtitle flex items-start space-x-2'>
										<span className='text-primary-500 mt-1'>•</span>
										<span>Access to walkieWalkie's customer data insights</span>
									</li>
								</ul>
							</div>

							{/* Benefits for Customers */}
							<div className='walkie-section-border bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8'>
								<h3 className='walkie-main-title text-xl sm:text-2xl font-bold mb-4 flex items-center'>
									👥 Benefits for walkieWalkie Users
								</h3>
								<ul className='space-y-3'>
									<li className='walkie-subtitle flex items-start space-x-2'>
										<span className='text-primary-500 mt-1'>•</span>
										<span>Access to trusted, vet-recommended walking services</span>
									</li>
									<li className='walkie-subtitle flex items-start space-x-2'>
										<span className='text-primary-500 mt-1'>•</span>
										<span>Discounted veterinary services and priority appointments</span>
									</li>
									<li className='walkie-subtitle flex items-start space-x-2'>
										<span className='text-primary-500 mt-1'>•</span>
										<span>Expert health and exercise guidance from veterinary professionals</span>
									</li>
									<li className='walkie-subtitle flex items-start space-x-2'>
										<span className='text-primary-500 mt-1'>•</span>
										<span>Peace of mind with emergency support during walks</span>
									</li>
									<li className='walkie-subtitle flex items-start space-x-2'>
										<span className='text-primary-500 mt-1'>•</span>
										<span>Educational workshops and wellness programs</span>
									</li>
								</ul>
							</div>
						</div>
					</>
				)}

			</div>
		</div>
	);
};
