// Navigation - Responsive navigation component following existing patterns
// Mobile: Hamburger menu with dropdown, Desktop: Inline links

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navigation = () => {
	// Component state
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	// Variables / constants
	const location = useLocation();

	const navItems = [
		{ name: 'Dog Walks', path: '/walks' },
		{ name: 'Create Event', path: '/create-event' },
		{ name: 'Dog Profile', path: '/profile' },
	];

	// Functions
	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	const closeMobileMenu = () => {
		setIsMobileMenuOpen(false);
	};

	const isActive = path => location.pathname === path;

	// Return
	return (
		<nav className='walkie-nav bg-white border-b border-gray-200'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between items-center h-14 sm:h-16'>
					{/* Logo - responsive sizing following existing patterns */}
					<Link
						to='/'
						className='walkie-title text-lg sm:text-xl md:text-2xl font-bold text-gray-900 hover:text-primary-500 transition-colors duration-200'
						onClick={closeMobileMenu}
					>
						🐕 walkieWalkie
					</Link>

					{/* Desktop Navigation - hidden on mobile, shown on md+ */}
					<div className='hidden md:flex space-x-6 lg:space-x-8'>
						{navItems.map(item => (
							<Link
								key={item.path}
								to={item.path}
								className={`walkie-nav-link px-3 py-2 text-sm sm:text-base font-medium transition-colors duration-200 min-h-[44px] flex items-center ${
									isActive(item.path)
										? 'text-primary-500 border-b-2 border-primary-500'
										: 'text-gray-700 hover:text-primary-500'
								}`}
							>
								{item.name}
							</Link>
						))}
					</div>

					{/* Mobile menu button - responsive sizing */}
					<div className='md:hidden'>
						<button
							onClick={toggleMobileMenu}
							className='walkie-mobile-menu-btn p-2 rounded-md text-gray-700 hover:text-primary-500 hover:bg-gray-100 transition-colors duration-200 min-h-[44px] min-w-[44px] touch-manipulation'
							aria-label='Toggle mobile menu'
						>
							{isMobileMenuOpen ? (
								<svg
									className='h-5 w-5 sm:h-6 sm:w-6'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M6 18L18 6M6 6l12 12'
									/>
								</svg>
							) : (
								<svg
									className='h-5 w-5 sm:h-6 sm:w-6'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M4 6h16M4 12h16M4 18h16'
									/>
								</svg>
							)}
						</button>
					</div>
				</div>

				{/* Mobile Navigation Menu - responsive padding */}
				{isMobileMenuOpen && (
					<div className='md:hidden'>
						<div className='px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200'>
							{navItems.map(item => (
								<Link
									key={item.path}
									to={item.path}
									onClick={closeMobileMenu}
									className={`walkie-mobile-nav-link block px-3 py-3 text-base font-medium rounded-md transition-colors duration-200 min-h-[48px] touch-manipulation ${
										isActive(item.path)
											? 'text-primary-500 bg-primary-50'
											: 'text-gray-700 hover:text-primary-500 hover:bg-gray-50'
									}`}
								>
									{item.name}
								</Link>
							))}
						</div>
					</div>
				)}
			</div>
		</nav>
	);
};
