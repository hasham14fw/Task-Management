# Task-Management

Advanced React Component Architecture & State Management Dashboard.

## Overview
A Task Management and Activity Dashboard built using React and Vite, demonstrating modern component-based architecture alongside legacy React patterns.

### Key Features & Architectural Highlights
- **Component-Based Architecture**: Modular components organized into functional and class-based hierarchies.
- **Class Components & Lifecycles**: `ActivityLogger` tracks user actions with `componentDidMount()`, `componentDidUpdate()`, and `componentWillUnmount()`.
- **Reusable Container Pattern**: `CardWrapper` container component utilizing `props.children`.
- **Modern React Hooks**:
  - `useState`: Manages task collections, form inputs, and filtering.
  - `useEffect`: Synchronizes state with `localStorage` and updates dynamic document titles.
  - `useContext`: Provides `ThemeContext` for seamless Light/Dark mode toggling without prop-drilling.
  - `useRef`: Auto-focuses form inputs on initial mount and after submission.
  - `useMemo`: Optimizes filtered task computations and dashboard metrics.
  - `useCallback`: Memoizes event handler references.

## Project Structure
```
src/
├── components/
│   ├── class/
│   │   └── ActivityLogger.jsx
│   └── functional/
│       ├── CardWrapper.jsx
│       ├── Header.jsx
│       ├── Icons.jsx
│       ├── MetricsSummary.jsx
│       ├── TaskCard.jsx
│       ├── TaskForm.jsx
│       ├── TaskList.jsx
│       └── ThemeToggle.jsx
├── context/
│   └── ThemeContext.jsx
├── hooks/
│   └── useLocalStorage.js
├── App.css
├── App.jsx
├── index.css
└── main.jsx
```

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
```bash
npm install
```

### Running Locally
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```
