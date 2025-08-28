// DogProfile - Page for managing dog profile with responsive design
// Shows dog details, owner info, and walking preferences

export const DogProfile = () => {
  // Variables / constants
  const sampleProfile = {
    dogName: "Buddy",
    breed: "Golden Retriever",
    age: "3 years old",
    size: "Large",
    energy: "High",
    friendliness: "Very Friendly",
    ownerName: "Sarah Johnson",
    walkingPreferences: ["Morning walks", "Beach areas", "Social groups"]
  };

  // Return
  return (
    <div className="walkie-background min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Page Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="walkie-main-title text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            🐕 Dog Profile
          </h1>
          <p className="walkie-subtitle text-base sm:text-lg px-4">
            Manage your furry friend's profile and walking preferences
          </p>
        </div>

        {/* Profile Card */}
        <div className="walkie-section-border bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 mb-4 sm:mb-6">
          
          {/* Dog Photo Placeholder */}
          <div className="text-center mb-6">
            <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto bg-gray-100 rounded-full flex items-center justify-center text-4xl sm:text-6xl mb-4">
              🐕
            </div>
            <button className="text-primary-500 hover:text-primary-600 font-medium transition-colors duration-200 text-sm sm:text-base min-h-[44px] touch-manipulation">
              📸 Add Photo
            </button>
          </div>

          {/* Dog Information */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dog's Name</label>
                <input 
                  type="text" 
                  value={sampleProfile.dogName}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-colors duration-200 text-sm sm:text-base min-h-[44px]"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Breed</label>
                <input 
                  type="text" 
                  value={sampleProfile.breed}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-colors duration-200 text-sm sm:text-base min-h-[44px]"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input 
                  type="text" 
                  value={sampleProfile.age}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-colors duration-200 text-sm sm:text-base min-h-[44px]"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                <input 
                  type="text" 
                  value={sampleProfile.size}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-colors duration-200 text-sm sm:text-base min-h-[44px]"
                  readOnly
                />
              </div>

            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Energy Level</label>
                <div className="px-3 py-2 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm sm:text-base min-h-[44px] flex items-center">
                  ⚡ {sampleProfile.energy}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Friendliness</label>
                <div className="px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 text-sm sm:text-base min-h-[44px] flex items-center">
                  👥 {sampleProfile.friendliness}
                </div>
              </div>
            </div>

            {/* Walking Preferences */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Walking Preferences</label>
              <div className="flex flex-wrap gap-2">
                {sampleProfile.walkingPreferences.map((pref, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-primary-50 border border-primary-200 rounded-full text-primary-800 text-xs sm:text-sm"
                  >
                    {pref}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Owner Information */}
        <div className="walkie-section-border bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">👤 Owner Information</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Owner Name</label>
            <input 
              type="text" 
              value={sampleProfile.ownerName}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-colors duration-200 text-sm sm:text-base min-h-[44px]"
              readOnly
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button className="walkie-button flex-1 inline-flex items-center justify-center font-medium text-white px-6 py-3 text-base rounded-lg min-h-[48px] touch-manipulation">
            ✏️ Edit Profile
          </button>
          <button className="flex-1 inline-flex items-center justify-center font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 text-base rounded-lg transition-colors duration-200 min-h-[48px] touch-manipulation">
            📋 Walking History
          </button>
        </div>

      </div>
    </div>
  );
};
