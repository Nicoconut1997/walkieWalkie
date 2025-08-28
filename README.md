# 🐕 walkieWalkie

> **Dog walking events made simple**

walkieWalkie is a modern web application that connects dog owners in their local area for group walking events. Pet owners can discover, join, and create dog walking adventures to give their furry companions the exercise and socialization they deserve.

*Created by team Butter*

## 🌟 Features

### Current Implementation
- **Landing Page**: Beautiful, responsive home screen with Claude-inspired design
- **Event Preview**: Interactive preview card showcasing sample dog walking events
- **Responsive Design**: Mobile-first approach that works seamlessly across all devices
- **Modern UI**: Clean, professional aesthetic with coral accent colors and smooth animations

### Planned Features
- Browse local dog walking events
- Create and host walking events
- User profiles and event management
- Location-based event discovery
- Community features and ratings

## 🛠️ Technology Stack

- **Frontend**: React 19.1.1
- **Build Tool**: Vite 7.1.2
- **Styling**: Tailwind CSS 4.1.12
- **Development**: ESLint for code quality
- **Package Manager**: npm

## 📁 Project Structure

```
walkieWalkie/
├── src/
│   ├── components/
│   │   └── EventCard.jsx          # Reusable event card component
│   ├── assets/
│   │   └── react.svg              # Static assets
│   ├── App.jsx                    # Main application component
│   ├── App.css                    # Application-specific styles
│   ├── index.css                  # Global styles with Tailwind imports
│   ├── main.jsx                   # Application entry point
│   └── design.json                # Design system configuration
├── public/
├── index.html                     # HTML template
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

## 🧩 Components

### EventCard
**Location**: `src/components/EventCard.jsx`

A reusable component for displaying dog walking event information.

**Props**:
- `title` (string, required) - Event name
- `location` (string, required) - Event location
- `attendeeCount` (number, required) - Number of participants
- `date` (string, required) - Event date
- `startTime` (string, required) - Start time
- `endTime` (string, required) - End time
- `emoji` (string, optional) - Custom emoji, defaults to 🌅

**Features**:
- Coral-themed border that stands out
- Hover animations with enhanced shadows
- Consistent styling following design system
- Responsive layout

**Example Usage**:
```jsx
<EventCard 
  title="Morning Walk!"
  location="Freemans Bay, Auckland (2km)"
  attendeeCount={6}
  date="Sat 30 August"
  startTime="9:00 am"
  endTime="11:00 am"
  emoji="🌅"
/>
```

## 🏠 Current Pages

### Home Page (`App.jsx`)
The landing page features:

1. **Header**: walkieWalkie logo with team attribution
2. **Hero Section**: 
   - "Dog Walks?" main title in coral
   - "Lets make it happen!" subtitle
3. **Featured Section**: 
   - Bordered container with white background
   - Descriptive text about the platform
   - Sample event card preview
4. **Call-to-Action**: "View walks near me" button

**Layout**: Full-screen design with content distributed from top to bottom:
- Logo at top
- Main content centered
- CTA button at bottom

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

## 🔮 Future Roadmap

### Phase 1: Core Functionality
- [ ] Event listing page
- [ ] Event creation form
- [ ] Basic user profiles
- [ ] Location-based filtering

### Phase 2: Enhanced Features  
- [ ] User authentication
- [ ] Event RSVP system
- [ ] Photo sharing
- [ ] Rating and reviews

### Phase 3: Community Features
- [ ] Friend connections
- [ ] Event recommendations
- [ ] Push notifications
- [ ] Advanced search and filters

## 🤝 Contributing

This is a hackathon project created by team Butter. The codebase follows clean architecture principles and includes comprehensive design system documentation.

## 📄 License

Private project for hackathon purposes.

---

**Built with ❤️ by team Butter** 🧈# walkieWalkie
