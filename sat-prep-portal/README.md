# TopMarks SAT Prep Portal

A modern, interactive SAT practice test platform built with React and Vite. This application provides a realistic test-taking experience with comprehensive performance analytics and detailed score breakdowns.

## 🚀 Live Demo

**Access the application at:** `http://localhost:3002/` (when running locally)

## 📋 Features

### Core Functionality
- **Interactive Test Interface**: Navigate through SAT questions with intuitive UI
- **Real-time Timer**: 32-minute countdown with visual warnings at 10 and 5 minutes remaining
- **Question Navigation**: Jump between questions, flag for review, track progress
- **Responsive Design**: Optimized for desktop and mobile devices
- **Score Analytics**: Comprehensive breakdown by section and skill areas

### Student Experience
- **Landing Page**: Engaging hero section with test overview and feature highlights
- **Practice Test**: Realistic SAT-style questions with passage-based reading and math problems
- **Results Dashboard**: Detailed performance analysis with skill-based recommendations
- **Question Review**: Step-through incorrect answers with detailed explanations

## 🏗️ Technical Architecture

### Tech Stack
- **Frontend Framework**: React 19.2.4
- **Build Tool**: Vite 4.5.14
- **Styling**: Pure CSS with custom variables (no external UI library)
- **State Management**: React hooks (useState, useEffect, custom hooks)
- **Development**: Hot module replacement, fast refresh

### Key Design Decisions

#### 1. **Simple, Focused Architecture**
- **Why**: Prioritized development speed and maintainability over complex state management
- **Implementation**: Used React's built-in state management with prop drilling for the relatively shallow component tree
- **Trade-off**: Would need refactoring for larger scale (Redux/Zustand), but perfect for this scope

#### 2. **Custom CSS Over UI Libraries**
- **Why**: Complete design control and performance optimization
- **Implementation**: CSS custom properties for theming, responsive grid layouts, smooth animations
- **Trade-off**: More development time vs. faster customization and smaller bundle size

#### 3. **Component-Based Architecture**
```
src/
├── components/
│   ├── Navigation.jsx     # Fixed header with timer
│   ├── Landing.jsx        # Hero + test overview
│   ├── Test.jsx          # Main test interface
│   ├── Results.jsx       # Score breakdown + analytics
│   └── ReviewDetail.jsx  # Question explanations
├── hooks/
│   └── useTimer.js       # Custom timer logic
├── data/
│   └── questions.js      # Mock SAT questions + skills data
└── index.css            # Global styles + design system
```

#### 4. **Custom Timer Hook**
- **Why**: Reusable timer logic with clean API
- **Features**: Start/pause/reset, automatic state detection (normal/warning/danger)
- **Implementation**: Uses `useEffect` for interval management with cleanup

#### 5. **Mock Data Structure**
- **Reading Questions**: Include passages, attributions, multiple choice options
- **Math Questions**: Focus on problem-solving with clear explanations
- **Skills Mapping**: Each question tagged with SAT skill categories for analytics

## 🎨 Design System

### Color Palette
- **Primary**: Dark green theme (#2DD4A0 accent, #0A1F1A background)
- **Secondary**: Warm beige accents for reading sections (#C9A96E)
- **Status Colors**: Green (correct), yellow (warning), red (incorrect/danger)

### Typography
- **Body**: DM Sans (clean, readable)
- **Monospace**: JetBrains Mono (timers, scores, technical data)

### Layout Principles
- **Grid-based**: CSS Grid for complex layouts, Flexbox for component alignment
- **Responsive**: Mobile-first approach with breakpoints at 768px
- **Accessibility**: High contrast ratios, keyboard navigation support

## 🔧 Performance Optimizations

### Bundle Size
- **CSS**: 18.69 kB (4.25 kB gzipped)
- **JavaScript**: 219.81 kB (67.25 kB gzipped)
- **Total Load**: Under 100kB gzipped for fast initial load

### Runtime Performance
- **Virtual Scrolling**: Not needed for current question count, but would implement for larger sets
- **Memoization**: Used sparingly to avoid premature optimization
- **State Updates**: Batched where possible, minimal re-renders

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (compatible with Node 18.19.1)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd sat-prep-portal

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Workflow
1. **Development**: `npm run dev` - Hot reload at `http://localhost:3002`
2. **Testing**: Manual testing across different screen sizes and user flows
3. **Building**: `npm run build` - Optimized production bundle in `dist/`

## 📊 User Flow & Experience

### 1. Landing Page
- **Goal**: Encourage test-taking with clear value proposition
- **Features**: Preview cards showing score examples, animated marquee with benefits
- **CTA**: Prominent "Begin Practice Test" button

### 2. Test Experience
- **Left Panel**: Question content with passages and multiple choice
- **Right Sidebar**: Progress tracking, question navigator, section status
- **Timer**: Persistent header with color-coded urgency states
- **Navigation**: Previous/Next buttons, jump-to-question functionality

### 3. Results & Analytics
- **Score Display**: Large circular progress indicator with total score
- **Section Breakdown**: Side-by-side Reading & Writing vs Math performance
- **Skills Analysis**: Horizontal bar charts showing strength/weakness areas
- **Question Review**: Filterable list of all questions with status indicators

## 🔄 What Would I Do Differently?

### At Scale
1. **State Management**: Implement Zustand or Redux for complex state trees
2. **Testing**: Add Jest + React Testing Library for unit/integration tests
3. **API Integration**: Replace mock data with REST/GraphQL endpoints
4. **Performance**: Implement React.memo, useMemo, useCallback strategically
5. **Accessibility**: Full WCAG 2.1 AA compliance testing
6. **Analytics**: Integration with services like Mixpanel for user behavior tracking

### Additional Features
1. **Adaptive Testing**: Real SAT-style difficulty adjustment based on performance
2. **Progress Persistence**: LocalStorage or database persistence for resumed tests
3. **Multiple Test Forms**: Various practice test versions
4. **Detailed Analytics**: Time-per-question, confidence indicators, historical progress
5. **Study Plans**: Personalized recommendations based on weak skill areas

### Technical Improvements
1. **Error Boundaries**: Graceful error handling for production
2. **Loading States**: Better UX during data fetching/processing
3. **Offline Support**: Service worker for basic offline functionality
4. **Performance Monitoring**: Real User Monitoring (Sentry, DataDog)

## 📱 Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 90+, Safari 14+, Edge 90+
- **CSS Features**: CSS Grid, Custom Properties, CSS Animations
- **JavaScript**: ES2020 features, async/await, destructuring

## 🤝 Contributing

This is a demonstration project, but the architecture supports easy extension:

1. **New Question Types**: Add to `src/data/questions.js`
2. **Additional Screens**: Create new components and add to App.jsx routing
3. **Styling Updates**: Modify CSS custom properties in `src/index.css`
4. **Analytics**: Extend the scoring logic in Results.jsx

---

**Built with React + Vite | Designed for optimal student experience | Performance-focused architecture**