// EventCard - Reusable component for displaying dog walking events
// Displays event title, location, attendee count, date and time

export const EventCard = ({ 
  title, 
  location, 
  attendeeCount, 
  date, 
  startTime, 
  endTime,
  emoji = "🌅" 
}) => {
  // Variables / constants
  const timeRange = `${startTime} - ${endTime}`;
  const attendeeText = `${attendeeCount} people signed up`;

  // Return
  return (
    <div className="walkie-card bg-white rounded-xl border border-gray-200 shadow-sm p-6 max-w-sm w-full">
      <div className="space-y-3">
        {/* Event Title */}
        <h3 className="walkie-main-title text-xl font-bold text-left">
          {emoji} {title}
        </h3>
        
        {/* Location */}
        <div className="flex items-center text-left">
          <span className="text-base walkie-subtitle">📍 {location}</span>
        </div>
        
        {/* People signed up */}
        <div className="flex items-center text-left">
          <span className="text-base walkie-subtitle">👥 {attendeeText}</span>
        </div>
        
        {/* Date and Time */}
        <div className="space-y-1 text-left">
          <div className="flex items-center">
            <span className="text-base walkie-subtitle">📅 {date}</span>
          </div>
          <div className="flex items-center">
            <span className="text-base walkie-subtitle">⏰ {timeRange}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
