// walkieWalkie - Dog walking events application home screen
import './App.css'
import { EventCard } from './components/EventCard'

function App() {
  return (
    <div className="walkie-background min-h-screen flex flex-col items-center justify-between px-4 py-8">
      {/* Logo/Title at top of screen */}
      <div className="w-full text-center pt-4">
        <h1 className="walkie-title text-3xl md:text-4xl font-bold tracking-wide">
          🐕 walkieWalkie
        </h1>
          {/* Team  */}
          <p className="walkie-subtitle text-sm">
            Created by team Butter
          </p>
      </div>
      
      {/* Main content in center */}
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 px-4">
        {/* Text content section */}
        <div className="space-y-6">
          {/* Main title */}
          <h3 className="walkie-main-title text-6xl md:text-5xl font-bold leading-tight">
            Dog Walks?
          </h3>
          
          {/* Subtitle */}
          <p className="walkie-subtitle text-xl">
            Lets make it happen!
          </p>

        
        </div>



        {/* Featured Event Section with subtle border */}
        <div className="walkie-section-border bg-white rounded-2xl border border-gray-200 shadow-sm p-8 max-w-2xl w-full mx-4 space-y-8">
          {/* Section Subtitle */}
          <p className="walkie-subtitle text-lg text-center">
            Join fellow dog lovers in your area for exciting walking adventures. 
            Discover new routes, make friends, and give your furry companion the exercise they deserve.
          </p>

          {/* Preview Card - evenly spaced */}
          <div className="w-full flex justify-center">
            <EventCard 
              title="Morning Walk!"
              location="Freemans Bay, Auckland (2km)"
              attendeeCount={6}
              date="Sat 30 August"
              startTime="9:00 am"
              endTime="11:00 am"
              emoji="🌅"
            />
          </div>
        </div>
      </div>
      
      {/* CTA Button at bottom of screen */}
      <div className="w-full text-center pb-4">
        <button className="walkie-button inline-flex items-center justify-center font-medium text-white px-8 py-4 text-lg rounded-lg">
          🦮 View walks near me
        </button>
      </div>
    </div>
  )
}

export default App
