# 🐕 walkieWalkie

> **Dog walking events made simple**

walkieWalkie is a modern web application that connects dog owners in their local area for group walking events. Pet owners can discover, join, and create dog walking adventures to give their furry companions the exercise and socialization they deserve.

App Link: https://walkie-walkie.vercel.app/

Recording Demo: https://idexx-my.sharepoint.com/:v:/p/elijah-vivas/EcpkFF92sMhJs2jVSeIovxgBs05dmzf98l0J0r6cKJEecw?e=jP0JuY

*Created by team Butter*

## 🌟 Features

### Core Features
- **Multi-Page Application**: Full React Router implementation with 11 distinct pages
- **Dog Profile Management**: Comprehensive dog profiles with preferences and characteristics
- **Event System**: Create, browse, and manage dog walking events
- **Walking Tracker**: Track walks with XP/leveling system (Solo Leveling inspired!)
- **Route Suggestions**: Discover new walking routes and places
- **Experience System**: Gamified walking experience with levels, achievements, and progression
- **Smart Filtering**: Advanced search and filtering by size, energy level, preferences, and more
- **Partnership Program**: Clinic partnerships for health-focused walking events
- **Walking History**: Complete history tracking and favorite walks management

### Design & UX
- **Claude-Inspired Design**: Professional, modern aesthetic with comprehensive design system
- **Responsive Design**: Mobile-first approach across all devices
- **Rich Interactions**: Smooth animations, hover effects, and micro-interactions
- **Comprehensive UI Components**: 19+ reusable components for consistent experience

## 🛠️ Technology Stack

- **Frontend Framework**: React 19.1.1 + React DOM 19.1.1
- **Build Tool**: Vite 7.1.2 with React plugin
- **Routing**: React Router (implied from routing implementation)
- **Styling**: Tailwind CSS 4.1.12 with Vite plugin
- **Type Safety**: PropTypes for component prop validation
- **Development Tools**: 
  - ESLint 9.33.0 with React hooks and refresh plugins
  - TypeScript definitions for enhanced development
- **Package Manager**: npm (with package-lock.json)

## 📁 Project Structure

```
walkieWalkie/
├── src/
│   ├── components/                # Reusable UI Components (19+)
│   │   ├── DogPhotoUpload.jsx     # Dog photo management
│   │   ├── DogProfileForm.jsx     # Dog profile creation/editing
│   │   ├── DogTabsNav.jsx         # Dog profile navigation tabs
│   │   ├── EventActions.jsx       # Event interaction buttons
│   │   ├── EventCard.jsx          # Event display cards
│   │   ├── EventDescription.jsx   # Event details display
│   │   ├── EventHeader.jsx        # Event page headers
│   │   ├── EventInfoGrid.jsx      # Event information layout
│   │   ├── EventMeetingDetails.jsx # Event meeting information
│   │   ├── EventRequirements.jsx  # Event requirement display
│   │   ├── EventsGrid.jsx         # Events grid layout
│   │   ├── EventsList.jsx         # Events list view
│   │   ├── EventsSearchAndFilter.jsx # Advanced filtering
│   │   ├── ExperienceBar.jsx      # XP progression display
│   │   ├── Navigation.jsx         # Main app navigation
│   │   ├── OwnerInfoForm.jsx      # Owner profile form
│   │   ├── ProfileActions.jsx     # Profile management actions
│   │   ├── WalkingPreferencesEditor.jsx # Preferences management
│   │   ├── WalkTracker.jsx        # Walk tracking interface
│   │   └── XPSimulator.jsx        # Experience system simulator
│   ├── pages/                     # Application Pages (11)
│   │   ├── ClinicPartnership.jsx  # Clinic partnership management
│   │   ├── CreateEvent.jsx        # Event creation form
│   │   ├── DogProfile.jsx         # Dog profile management
│   │   ├── DogWalks.jsx          # Browse available walks
│   │   ├── EventDetails.jsx       # Individual event details
│   │   ├── FavoriteWalks.jsx     # User's favorite walks
│   │   ├── Home.jsx               # Landing page
│   │   ├── MyWalks.jsx           # User's personal walks
│   │   ├── PlaceDetail.jsx        # Location details
│   │   ├── RoutesSuggestion.jsx  # Route discovery
│   │   └── WalkingHistory.jsx     # Complete walking history
│   ├── data/                      # Application Data
│   │   ├── constants.js           # App constants & XP system
│   │   ├── sampleEvents.js        # Sample event data
│   │   ├── samplePartnerships.js  # Sample partnership data
│   │   └── sampleRoutes.js        # Sample route data
│   ├── assets/
│   │   └── react.svg              # Static assets
│   ├── App.jsx                    # Main routing component
│   ├── App.css                    # Application-specific styles
│   ├── index.css                  # Global styles with Tailwind
│   ├── main.jsx                   # Application entry point
│   └── design.json                # Comprehensive design system
├── dist/                          # Production build output
├── public/                        # Static public assets
├── package.json                   # Dependencies and scripts
├── tailwind.config.js             # Tailwind configuration
├── vite.config.js                 # Vite build configuration
└── eslint.config.js               # ESLint configuration
```

## 🎨 Design System

walkieWalkie follows a Claude-inspired design system with:

### Color Palette
- **Primary Coral**: `#ff6b47` - Used for main CTA buttons and accents
- **Primary Coral Hover**: `#f04822` - Darker shade for interactive states
- **Neutral Scale**: From `#fafafa` (light background) to `#171717` (dark text)
- **Background**: Subtle gradient from `#fafafa` to `#f5f5f5`

### Typography
- **Font Family**: Inter, system fonts fallback
- **Hierarchy**: 
  - Main titles: `text-6xl` on mobile, `text-5xl` on desktop
  - Section titles: `text-3xl` to `text-4xl`
  - Body text: `text-lg` to `text-xl`
  - Metadata: `text-sm`

### Components
- **Rounded corners**: 12px for cards, 16px for containers
- **Shadows**: Subtle layered shadows with coral tinting
- **Hover effects**: Gentle lift animations with enhanced shadows
- **Spacing**: Consistent 8-unit spacing scale

## 🧩 Component Library

walkieWalkie features 19+ reusable components organized by functionality:

### Event Management Components
- **`EventCard.jsx`** - Display event information with coral theming and hover effects
- **`EventActions.jsx`** - RSVP, share, and event interaction buttons
- **`EventDescription.jsx`** - Rich event detail display with formatting
- **`EventHeader.jsx`** - Event page headers with breadcrumbs and actions
- **`EventInfoGrid.jsx`** - Structured event information layout
- **`EventMeetingDetails.jsx`** - Meeting point and logistics information
- **`EventRequirements.jsx`** - Event requirements and participant guidelines
- **`EventsGrid.jsx`** - Grid layout for multiple events
- **`EventsList.jsx`** - List view for events with filtering
- **`EventsSearchAndFilter.jsx`** - Advanced search and multi-filter interface

### Profile & User Management
- **`DogPhotoUpload.jsx`** - Dog photo upload with cropping and preview
- **`DogProfileForm.jsx`** - Comprehensive dog profile creation/editing
- **`DogTabsNav.jsx`** - Tabbed navigation for dog profile sections
- **`OwnerInfoForm.jsx`** - Owner information and contact details
- **`ProfileActions.jsx`** - Profile management actions and settings
- **`WalkingPreferencesEditor.jsx`** - Multi-select preference management

### Experience & Tracking
- **`WalkTracker.jsx`** - Real-time walk tracking interface
- **`ExperienceBar.jsx`** - XP progression visualization with level display
- **`XPSimulator.jsx`** - Experience system simulator for testing

### Navigation & Layout
- **`Navigation.jsx`** - Main application navigation with responsive design

All components follow the established component structure pattern and integrate seamlessly with the design system.

## ⭐ Experience System

walkieWalkie features a comprehensive gamification system inspired by Solo Leveling:

### Core Mechanics
- **Base XP**: 10 XP per minute of walking
- **Distance Bonus**: 5 XP per kilometer walked
- **Difficulty Multipliers**:
  - Casual walks: 1.0x multiplier
  - Training sessions: 1.5x multiplier
  - Playgroups: 1.2x multiplier
  - Active/Hiking: 2.0x multiplier

### Achievement Bonuses
- **First Walk**: 50 XP bonus
- **Perfect Week**: 100 XP (7 consecutive days)
- **Long Distance**: 25 XP (walks over 5km)
- **Early Bird**: 15 XP (morning walks before 7AM)
- **Social Butterfly**: 20 XP (playgroup activities)

### Level Progression
- **Level Cap**: 50 levels
- **Progressive XP Requirements**: Each level requires more XP (200, 500, 900, 1400...)
- **Milestone Levels**: Special visual effects at levels 5, 10, 15, 20, 25, 30, 35, 40, 45, 50
- **Formula**: `50 * (level - 1) * (level + 2)` total XP needed per level

### Features
- Real-time XP calculation during walks
- Visual progression bars and level-up animations
- XP Simulator for testing different walking scenarios
- Integration with walking history and achievements

## 📄 Application Pages

walkieWalkie includes 11 comprehensive pages connected via React Router:

### Core Pages
- **`Home.jsx`** - Landing page with hero section and featured content
- **`DogWalks.jsx`** - Browse and discover available walking events
- **`MyWalks.jsx`** - User's personal walking events and bookings
- **`CreateEvent.jsx`** - Create new walking events with detailed forms

### Profile & Management
- **`DogProfile.jsx`** - Comprehensive dog profile management with photos, preferences, and characteristics
- **`FavoriteWalks.jsx`** - User's saved favorite walking routes and events
- **`WalkingHistory.jsx`** - Complete history of all walks with XP tracking

### Discovery & Routes
- **`RoutesSuggestion.jsx`** - Discover new walking routes and locations
- **`PlaceDetail.jsx`** - Detailed information about specific walking locations
- **`EventDetails.jsx`** - Individual event pages with full details and RSVP

### Partnerships
- **`ClinicPartnership.jsx`** - Veterinary clinic partnerships and health-focused events

Each page features consistent navigation, responsive design, and integrated filtering/search capabilities.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd walkieWalkie
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## 🎯 Development Guidelines

### Code Structure
Components follow a consistent structure:
```jsx
export const ComponentName = ({ props }) => {
  // Style / Theme hooks (if any)
  
  // Component state
  const [state, setState] = useState(initialState);
  
  // Variables / constants
  const variable = 'value';
  
  // Functions
  const handleFunction = () => {};
  
  // Return
  return (
    <div>
      {/* Component JSX */}
    </div>
  );
};
```

### Styling Conventions
- Use Tailwind CSS utility classes
- Custom CSS classes prefixed with `walkie-`
- Maintain consistency with design system colors
- Follow mobile-first responsive design

### Component Guidelines
- Keep components small and focused
- Use descriptive prop names
- Include helpful comments
- Maintain reusability where possible

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)  
- Safari (latest)
- Edge (latest)

## 🔮 Development Status & Future Roadmap

### ✅ Completed Features
- [x] Full multi-page application with React Router
- [x] Comprehensive event system (listing, creation, details)
- [x] Advanced dog profile management
- [x] Experience/leveling system with achievements
- [x] Route discovery and location details
- [x] Walking history and favorites tracking
- [x] Advanced search and filtering system
- [x] Clinic partnership program
- [x] Comprehensive design system
- [x] Mobile-responsive interface

### 🚧 Next Phase: Backend Integration
- [ ] User authentication system
- [ ] Database integration for persistent data
- [ ] Real-time event updates
- [ ] Push notifications for event reminders
- [ ] Photo upload and sharing
- [ ] Rating and review system

### 🎯 Future Enhancements
- [ ] GPS tracking during walks
- [ ] Social features and friend connections
- [ ] Weather integration
- [ ] Advanced AI-powered route recommendations
- [ ] Integration with fitness trackers
- [ ] Community challenges and leaderboards

## 🤝 Contributing

This is a hackathon project created by team Butter. The codebase follows clean architecture principles and includes comprehensive design system documentation.

## 📄 License

Private project for hackathon purposes.

---

**Built with ❤️ by team Butter** 🧈
