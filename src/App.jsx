// walkieWalkie - Dog walking events application home screen
import './App.css';
import { EventsList } from './components/EventsList';
import { sampleEvents } from './data/sampleEvents';

function App() {
	return (
		<div className='walkie-background min-h-screen flex flex-col items-center justify-between px-4 sm:px-6 lg:px-8 py-6 sm:py-8'>
			{/* Logo/Title at top of screen */}
			<div className='w-full text-center pt-2 sm:pt-4'>
				<h1 className='walkie-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide'>
					🐕 walkieWalkie
				</h1>
				{/* Team  */}
				<p className='walkie-subtitle text-xs sm:text-sm mt-1'>Created by team Butter</p>
			</div>

			{/* Main content in center */}
			<div className='flex-1 flex flex-col items-center justify-center text-center space-y-6 sm:space-y-8 px-2 sm:px-4 w-full'>
				{/* Text content section */}
				<div className='space-y-4 sm:space-y-6'>
					{/* Main title */}
					<h3 className='walkie-main-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight px-4'>
						Dog Walks?
					</h3>

					{/* Subtitle */}
					<p className='walkie-subtitle text-lg sm:text-xl lg:text-2xl px-4'>
						Lets make it happen!
					</p>
				</div>

				{/* Events List Section */}
				<EventsList events={sampleEvents} />
			</div>

			{/* CTA Button at bottom of screen */}
			<div className='w-full text-center pb-2 sm:pb-4 px-4'>
				<button className='walkie-button inline-flex items-center justify-center font-medium text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-lg w-full sm:w-auto min-h-[48px] touch-manipulation'>
					🦮 View walks near me
				</button>
			</div>
		</div>
	);
}

export default App;
