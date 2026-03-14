# SAT Prep Portal

A modern, interactive SAT practice test platform built with React and Vite. This application provides a realistic test-taking experience with comprehensive performance analytics and detailed score breakdowns.

## Live Demo

**Access the application at:** `change this link` 

## Features

### Core Functionality
- **Section Selection Flow**: Choose between Reading & Writing or Math to start
- **Modular Test Structure**: Each section has 2 modules (5 questions each) with adaptive flow
- **Interactive Test Interface**: Navigate through SAT questions with intuitive UI
- **Real-time Timer**: Centered timer in navbar with section-specific durations (16:00 for Reading, 17:30 for Math)
- **Question Navigation**: Jump between questions, flag for review, track progress
- **Score Analytics**: Comprehensive breakdown by section and skill areas
- **Integrated Calculator**: Desmos Graphing Calculator for math sections with expandable left panel

### Student Experience
- **Landing Page**: Engaging hero section with test overview and feature highlights
- **Section Selection**: Choose starting section with detailed module information
- **Modular Test Flow**: Automatic progression through Module 1 → Module 2 → Other Section → Results
- **Practice Test**: Realistic SAT-style questions with passage-based reading and math problems
- **Results Dashboard**: Detailed performance analysis with skill-based recommendations
- **Interactive Review**: Navigate through all questions with explanations and correct answer highlighting

## Technical Architecture

### Tech Stack
- **Frontend Framework**: React 19.2.4
- **Build Tool**: Vite 4.5.14
- **Styling**: Pure CSS with custom variables (no external UI library)
- **State Management**: React hooks (useState, useEffect, custom hooks)
- **Calculator Integration**: Desmos Graphing Calculator API v1.1
- **Timer System**: Custom hooks with automatic state management
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
│   ├── Navigation.jsx       # Fixed header with timer & user info
│   ├── Landing.jsx          # Hero + test overview
│   ├── SectionSelection.jsx # Choose Reading/Math starting section
│   ├── Test.jsx            # Main test interface with calculator integration
│   ├── Results.jsx         # Score breakdown + analytics
│   └── ReviewDetail.jsx    # Interactive question review with navigation
├── hooks/
│   └── useTimer.js         # Custom timer with module-specific durations
├── data/
│   └── questions.js        # Modular SAT questions (module1/module2 structure)
├── index.css              # Global styles + design system + calculator themes
└── index.html             # Desmos API integration
```

#### 4. **Modular Test Flow System**
- **Why**: Realistic SAT experience with proper section/module progression
- **Implementation**:
  - Section Selection → Module 1 (5Q) → Module 2 (5Q) → Other Section → Results
  - Automatic timer resets between modules (16:00 Reading, 17:30 Math)
  - Smart completion detection to navigate to results
- **State Management**: Tracks current section, module, and question progress

#### 5. **Custom Timer Hook**
- **Why**: Reusable timer logic with clean API
- **Features**: Start/pause/reset, automatic state detection (normal/warning/danger)
- **Implementation**: Uses `useEffect` for interval management with cleanup
- **Module-Aware**: Different durations per section, auto-reset on transitions

#### 6. **Calculator Integration**
- **Why**: Authentic SAT math experience
- **Implementation**: Desmos Graphing Calculator API with custom styling
- **UX Design**: Expandable left panel, toggle button in question header
- **Math-Only**: Conditional rendering for math sections only

#### 7. **Modular Question Structure**
- **Reading Questions**: Include passages, attributions, multiple choice options
- **Math Questions**: Focus on problem-solving with clear explanations
- **Module Organization**: `reading.module1`, `reading.module2`, `math.module1`, `math.module2`
- **Skills Mapping**: Each question tagged with SAT skill categories for analytics


##  Getting Started

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

## User Flow & Experience

### 1. Landing Page
- **Goal**: Encourage test-taking with clear value proposition
- **Features**: Preview cards showing score examples, animated marquee with benefits
- **CTA**: Prominent "Begin Practice Test" button

### 2. Test Experience
- **Section Selection**: Choose between Reading & Writing or Math with module details
- **Dynamic Layout**: 2-column (normal) or 3-column (with calculator) responsive layout
- **Left Panel**: Expandable Desmos calculator for math sections
- **Main Area**: Question content with passages and multiple choice
- **Right Sidebar**: Progress tracking, question navigator, module status (white theme)
- **Timer**: Centered navbar timer with section-specific durations and color-coded urgency
- **Smart Navigation**: Module progression with automatic section transitions

### 3. Results & Analytics
- **Score Display**: Large circular progress indicator with total score
- **Section Breakdown**: Side-by-side Reading & Writing vs Math performance with module-based calculations
- **Skills Analysis**: Horizontal bar charts showing strength/weakness areas
- **Interactive Review**: Filterable list of all questions with status indicators and direct navigation

## What Would I Do Differently?

### At Scale
1. **State Management**: Implement Redux for complex state trees
2. **Testing**: Add React Testing Library for unit/integration tests
3. **API Integration**: Replace mock data with FastAPI endpoints

### Additional Features
1. **Adaptive Testing**: Real SAT-style difficulty adjustment based on performance
2. **Progress Persistence**: LocalStorage or database persistence for resumed tests
3. **Multiple Test Forms**: Various practice test versions
4. **Detailed Analytics**: Time-per-question, confidence indicators, historical progress
5. **Study Plans**: Personalized recommendations based on weak skill areas

### Technical Improvements
1. **Error Boundaries**: Graceful error handling for production
2. **Loading States**: Better UX during data fetching/processing
3. **Performance Monitoring**: Real User Monitoring 

## Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 90+, Safari 14+, Edge 90+
- **CSS Features**: CSS Grid, Custom Properties, CSS Animations
- **JavaScript**: ES2020 features, async/await, destructuring

## AI Tool used

- Used claude code and claude to help me in building the base of this tool.
---

**Built with React + Vite | Designed for optimal student experience | Performance-focused architecture**