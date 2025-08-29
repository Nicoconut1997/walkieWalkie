// SidebarNavigation - Modern sidebar navigation with organized sections
// Responsive design with mobile drawer and desktop sidebar

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

export const SidebarNavigation = ({ children }) => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const location = useLocation();

	const navigationSections = [
		{
			title: 'Dog Activities',
			items: [
				{ name: 'Dog Walks', path: '/walks', icon: '🐕' },
				{ name: 'Routes', path: '/routes', icon: '🗺️' },
				{ name: 'My Walks', path: '/my-walks', icon: '📅' },
			],
		},
		{
			title: 'Services',
			items: [
				{ name: 'Walker Marketplace', path: '/marketplace', icon: '👥' },
				{ name: 'Create Event', path: '/create-event', icon: '➕' },
			],
		},
		{
			title: 'Profile & Settings',
			items: [
				{ name: 'Dog Profile', path: '/profile', icon: '🐾' },
				{ name: 'Clinic Partnership', path: '/clinic-partnership', icon: '🏥' },
			],
		},
	];

	const isActive = path => location.pathname === path;

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	const closeMobileMenu = () => {
		setIsMobileMenuOpen(false);
	};

	return (
		<div className='min-h-screen flex bg-gray-50'>
			{/* Mobile Overlay */}
			{isMobileMenuOpen && (
				<div
					className='fixed inset-0 z-40 lg:hidden'
					style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
					onClick={closeMobileMenu}
				/>
			)}

			{/* Sidebar */}
			<div
				className={`
				fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 
				transform transition-transform duration-300 ease-in-out lg:translate-x-0
				${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
			`}
			>
				{/* Header */}
				<div className='flex items-center justify-between h-16 px-4 sm:px-6 border-b border-gray-200'>
					<Link
						to='/'
						className='text-xl font-bold text-gray-900 hover:text-primary-500 transition-colors duration-200'
						onClick={closeMobileMenu}
					>
						🐕 walkieWalkie
					</Link>

					{/* Mobile close button */}
					<button
						onClick={closeMobileMenu}
						className='lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 touch-manipulation'
					>
						<svg className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M6 18L18 6M6 6l12 12'
							/>
						</svg>
					</button>
				</div>

				{/* Navigation */}
				<nav className='flex-1 px-3 sm:px-4 py-6 space-y-6 overflow-y-auto'>
					{navigationSections.map((section, sectionIndex) => (
						<div key={sectionIndex}>
							<h3 className='text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 px-3'>
								{section.title}
							</h3>
							<div className='space-y-1'>
								{section.items.map(item => (
									<Link
										key={item.path}
										to={item.path}
										onClick={closeMobileMenu}
										className={`
											group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 touch-manipulation
											${
												isActive(item.path)
													? 'bg-primary-50 text-primary-700 shadow-sm border-l-4 border-primary-500'
													: 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:shadow-sm hover:border-l-4 hover:border-gray-300'
											}
										`}
									>
										<span
											className={`mr-3 text-lg transition-transform duration-200 ${
												isActive(item.path) ? 'scale-110' : 'group-hover:scale-110'
											}`}
										>
											{item.icon}
										</span>
										{item.name}
									</Link>
								))}
							</div>
						</div>
					))}
				</nav>

				{/* Footer */}
				<div className='p-4 border-t border-gray-200'>
					<div className='text-xs text-gray-500 text-center'>© 2024 walkieWalkie</div>
					<div className='text-xs text-gray-400 text-center mt-1'>Happy walking! 🐕</div>
				</div>
			</div>

			{/* Main Content Area */}
			<div className='flex-1 flex flex-col lg:ml-0'>
				{/* Mobile Header */}
				<div className='lg:hidden bg-white border-b border-gray-200 px-4 sm:px-6 py-4'>
					<div className='flex items-center justify-between'>
						<button
							onClick={toggleMobileMenu}
							className='p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 touch-manipulation'
						>
							<svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M4 6h16M4 12h16M4 18h16'
								/>
							</svg>
						</button>
						<Link to='/' className='text-lg font-bold text-gray-900 hover:text-primary-500'>
							🐕 walkieWalkie
						</Link>
						<div className='w-10' /> {/* Spacer for centering */}
					</div>
				</div>

				{/* Page Content */}
				<main className='flex-1 overflow-hidden p-4 sm:p-6 lg:p-8'>{children}</main>
			</div>
		</div>
	);
};

SidebarNavigation.propTypes = {
	children: PropTypes.node.isRequired,
};
