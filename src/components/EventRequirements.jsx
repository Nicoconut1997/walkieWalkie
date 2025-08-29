// EventRequirements - List of items and preparations needed for the walk
// Displays essential and recommended items in an organized checklist format

export const EventRequirements = () => {
	const requirements = [
		{ icon: '✓', text: 'Leash and collar with ID tags' },
		{ icon: '✓', text: 'Water bowl and fresh water' },
		{ icon: '✓', text: 'Waste bags for cleanup' },
		{ icon: '✓', text: 'Treats for good behavior' },
		{ icon: '✓', text: 'Comfortable walking shoes' },
		{ icon: '✓', text: 'Positive attitude and smile!' },
	];

	return (
		<div className='walkie-section-border bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6'>
			<h2 className='text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4'>
				🎒 What to Bring
			</h2>
			<div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
				<div className='space-y-2 sm:space-y-3'>
					{requirements.slice(0, 3).map((item, index) => (
						<div key={index} className='flex items-center text-sm sm:text-base'>
							<span className='text-green-500 mr-2 sm:mr-3 min-w-[16px]'>{item.icon}</span>
							<span>{item.text}</span>
						</div>
					))}
				</div>
				<div className='space-y-2 sm:space-y-3'>
					{requirements.slice(3).map((item, index) => (
						<div key={index + 3} className='flex items-center text-sm sm:text-base'>
							<span className='text-green-500 mr-2 sm:mr-3 min-w-[16px]'>{item.icon}</span>
							<span>{item.text}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
