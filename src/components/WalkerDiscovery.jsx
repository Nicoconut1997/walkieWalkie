// WalkerDiscovery - Search and filter interface for finding dog walkers
// Provides search functionality, filters, and displays walker results in a grid

import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { DogWalkerProfile } from './DogWalkerProfile';

export const WalkerDiscovery = ({ walkers, onBookWalk, onSelectWalker }) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedSpecialties, setSelectedSpecialties] = useState([]);
	const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
	const [ratingFilter, setRatingFilter] = useState(0);
	const [availabilityFilter, setAvailabilityFilter] = useState('');
	const [sortBy, setSortBy] = useState('rating'); // rating, price, experience, distance

	// Get all unique specialties from walkers
	const allSpecialties = useMemo(() => {
		const specialtiesSet = new Set();
		walkers.forEach(walker => {
			walker.specialties.forEach(specialty => specialtiesSet.add(specialty));
		});
		return Array.from(specialtiesSet).sort();
	}, [walkers]);

	// Filter and sort walkers
	const filteredWalkers = useMemo(() => {
		let filtered = walkers.filter(walker => {
			// Search query filter
			const searchLower = searchQuery.toLowerCase();
			const matchesSearch =
				!searchQuery ||
				walker.name.toLowerCase().includes(searchLower) ||
				walker.bio.toLowerCase().includes(searchLower) ||
				walker.specialties.some(specialty => specialty.toLowerCase().includes(searchLower)) ||
				walker.serviceArea.some(area => area.toLowerCase().includes(searchLower));

			// Specialty filter
			const matchesSpecialties =
				selectedSpecialties.length === 0 ||
				selectedSpecialties.some(specialty => walker.specialties.includes(specialty));

			// Price range filter
			const matchesPrice =
				walker.hourlyRate >= priceRange.min && walker.hourlyRate <= priceRange.max;

			// Rating filter
			const matchesRating = walker.rating >= ratingFilter;

			// Availability filter
			const matchesAvailability =
				!availabilityFilter || walker.availability[availabilityFilter]?.length > 0;

			return (
				matchesSearch && matchesSpecialties && matchesPrice && matchesRating && matchesAvailability
			);
		});

		// Sort filtered results
		filtered.sort((a, b) => {
			switch (sortBy) {
				case 'rating':
					return b.rating - a.rating;
				case 'price-low':
					return a.hourlyRate - b.hourlyRate;
				case 'price-high':
					return b.hourlyRate - a.hourlyRate;
				case 'experience':
					return parseInt(b.experience) - parseInt(a.experience);
				case 'reviews':
					return b.reviewCount - a.reviewCount;
				default:
					return b.rating - a.rating;
			}
		});

		return filtered;
	}, [
		walkers,
		searchQuery,
		selectedSpecialties,
		priceRange,
		ratingFilter,
		availabilityFilter,
		sortBy,
	]);

	const handleSpecialtyToggle = specialty => {
		setSelectedSpecialties(prev =>
			prev.includes(specialty) ? prev.filter(s => s !== specialty) : [...prev, specialty]
		);
	};

	const clearAllFilters = () => {
		setSearchQuery('');
		setSelectedSpecialties([]);
		setPriceRange({ min: 0, max: 100 });
		setRatingFilter(0);
		setAvailabilityFilter('');
	};

	const activeFiltersCount = [
		searchQuery,
		selectedSpecialties.length > 0,
		priceRange.min > 0 || priceRange.max < 100,
		ratingFilter > 0,
		availabilityFilter,
	].filter(Boolean).length;

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
			{/* Header */}
			<div className='mb-8'>
				<h1 className='text-3xl font-bold text-gray-900 mb-2'>Find Your Perfect Dog Walker</h1>
				<p className='text-lg text-gray-600'>Discover trusted, verified dog walkers in your area</p>
			</div>

			{/* Search and Filters */}
			<div className='bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6'>
				{/* Search Bar */}
				<div className='mb-6'>
					<div className='relative'>
						<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
							<span className='text-gray-400'>🔍</span>
						</div>
						<input
							type='text'
							placeholder='Search by name, specialty, or area...'
							value={searchQuery}
							onChange={e => setSearchQuery(e.target.value)}
							className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-colors duration-200'
						/>
					</div>
				</div>

				{/* Filters Row */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4'>
					{/* Price Range */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							Price Range (${priceRange.min} - ${priceRange.max}/hr)
						</label>
						<div className='flex items-center space-x-2'>
							<input
								type='range'
								min='0'
								max='100'
								value={priceRange.min}
								onChange={e => setPriceRange(prev => ({ ...prev, min: parseInt(e.target.value) }))}
								className='flex-1'
							/>
							<input
								type='range'
								min='0'
								max='100'
								value={priceRange.max}
								onChange={e => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) }))}
								className='flex-1'
							/>
						</div>
					</div>

					{/* Rating Filter */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>Minimum Rating</label>
						<select
							value={ratingFilter}
							onChange={e => setRatingFilter(parseFloat(e.target.value))}
							className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100'
						>
							<option value={0}>Any Rating</option>
							<option value={4.5}>4.5+ Stars</option>
							<option value={4.0}>4.0+ Stars</option>
							<option value={3.5}>3.5+ Stars</option>
						</select>
					</div>

					{/* Availability Filter */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>Available Day</label>
						<select
							value={availabilityFilter}
							onChange={e => setAvailabilityFilter(e.target.value)}
							className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100'
						>
							<option value=''>Any Day</option>
							<option value='monday'>Monday</option>
							<option value='tuesday'>Tuesday</option>
							<option value='wednesday'>Wednesday</option>
							<option value='thursday'>Thursday</option>
							<option value='friday'>Friday</option>
							<option value='saturday'>Saturday</option>
							<option value='sunday'>Sunday</option>
						</select>
					</div>

					{/* Sort By */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>Sort By</label>
						<select
							value={sortBy}
							onChange={e => setSortBy(e.target.value)}
							className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100'
						>
							<option value='rating'>Highest Rated</option>
							<option value='price-low'>Price: Low to High</option>
							<option value='price-high'>Price: High to Low</option>
							<option value='experience'>Most Experience</option>
							<option value='reviews'>Most Reviews</option>
						</select>
					</div>
				</div>

				{/* Specialty Filters */}
				<div className='mb-4'>
					<label className='block text-sm font-medium text-gray-700 mb-3'>Specialties</label>
					<div className='flex flex-wrap gap-2'>
						{allSpecialties.map(specialty => (
							<button
								key={specialty}
								onClick={() => handleSpecialtyToggle(specialty)}
								className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
									selectedSpecialties.includes(specialty)
										? 'bg-blue-600 text-white'
										: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
								}`}
							>
								{specialty}
							</button>
						))}
					</div>
				</div>

				{/* Filter Summary and Clear */}
				<div className='flex items-center justify-between pt-4 border-t border-gray-200'>
					<div className='text-sm text-gray-600'>
						{filteredWalkers.length} walker{filteredWalkers.length !== 1 ? 's' : ''} found
						{activeFiltersCount > 0 && (
							<span className='ml-2'>
								• {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} active
							</span>
						)}
					</div>
					{activeFiltersCount > 0 && (
						<button
							onClick={clearAllFilters}
							className='text-sm text-blue-600 hover:text-blue-800 font-medium'
						>
							Clear All Filters
						</button>
					)}
				</div>
			</div>

			{/* Results Grid */}
			{filteredWalkers.length > 0 ? (
				<div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
					{filteredWalkers.map(walker => (
						<div
							key={walker.id}
							className='cursor-pointer'
							onClick={() => onSelectWalker && onSelectWalker(walker)}
						>
							<DogWalkerProfile walker={walker} onBookWalk={onBookWalk} compact={true} />
						</div>
					))}
				</div>
			) : (
				<div className='text-center py-12'>
					<div className='text-6xl mb-4'>🔍</div>
					<h3 className='text-xl font-semibold text-gray-900 mb-2'>No walkers found</h3>
					<p className='text-gray-600 mb-4'>
						Try adjusting your filters or search terms to find more results.
					</p>
					<button
						onClick={clearAllFilters}
						className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200'
					>
						Clear All Filters
					</button>
				</div>
			)}
		</div>
	);
};

WalkerDiscovery.propTypes = {
	walkers: PropTypes.arrayOf(PropTypes.object).isRequired,
	onBookWalk: PropTypes.func,
	onSelectWalker: PropTypes.func,
};
