// DogWalks - Page for browsing dog walking events with responsive design
// Shows list of available walks with filters

import { EventsList } from '../components/EventsList';
import { sampleEvents } from '../data/sampleEvents';

export const DogWalks = () => {
  // Variables / constants
  const extendedEvents = [
    ...sampleEvents,
    {
      id: 4,
      title: "Beach Adventure",
      location: "Mission Bay, Auckland (3km)",
      attendeeCount: 12,
      date: "Sun 31 August",
      startTime: "2:00 pm",
      endTime: "4:00 pm",
      emoji: "🏖️"
    },
    {
      id: 5,
      title: "Park Playdate",
      location: "Western Springs, Auckland (1km)",
      attendeeCount: 8,
      date: "Mon 1 September",
      startTime: "5:30 pm",
      endTime: "6:30 pm",
      emoji: "🌳"
    }
  ];

  // Return
  return (
    <div className="walkie-background min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Page Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="walkie-main-title text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            🐕 Dog Walks Near You
          </h1>
          <p className="walkie-subtitle text-base sm:text-lg max-w-2xl mx-auto px-4">
            Discover exciting walking adventures for you and your furry friend. 
            Join local dog owners and explore new routes together!
          </p>
        </div>

        {/* Filter Section */}
        <div className="mb-6 sm:mb-8">
          <div className="walkie-section-border bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6">
            <div className="flex flex-wrap gap-3 sm:gap-4 items-center justify-center">
              <button className="px-3 sm:px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 text-sm sm:text-base min-h-[44px] touch-manipulation">
                📍 Near Me
              </button>
              <button className="px-3 sm:px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm sm:text-base min-h-[44px] touch-manipulation">
                📅 This Week
              </button>
              <button className="px-3 sm:px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm sm:text-base min-h-[44px] touch-manipulation">
                👥 Small Groups
              </button>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <EventsList events={extendedEvents} />

        {/* Load More */}
        <div className="text-center mt-8 sm:mt-12">
          <button className="walkie-button inline-flex items-center justify-center font-medium text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-lg w-full sm:w-auto min-h-[48px] touch-manipulation">
            🔍 Load More Walks
          </button>
        </div>

      </div>
    </div>
  );
};
