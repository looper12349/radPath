# RadPath Explorer - React Implementation

## Project Structure
The application has been converted to a modern React application with Vite and Tailwind CSS:

```
radpath-explorer/
├── package.json           # Project dependencies and scripts
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── public/                # Static assets
└── src/
    ├── App.jsx            # Main application component
    ├── index.jsx          # Entry point
    ├── index.css          # Global styles including Tailwind imports
    ├── components/
    │   ├── Header.jsx     # Header with title and description
    │   ├── Controls.jsx   # Grid size, edit mode, and action buttons
    │   ├── GridView.jsx   # Grid visualization component
    │   ├── Cell.jsx       # Individual grid cell component
    │   ├── ResultsPanel.jsx # Display results and path information
    │   └── InfoPanel.jsx  # Algorithm explanation and legend
    └── utils/
        └── pathfinder.js  # Algorithm implementation
```

## Setup Instructions

1. Create a new project:
```bash
npm create vite@latest radpath-explorer -- --template react
cd radpath-explorer
```

2. Install dependencies:
```bash
npm install
npm install tailwindcss @tailwindcss/vite autoprefixer postcss
```

3. Replace or create all the files according to the provided code files.

4. Start the development server:
```bash
npm run start
```

## Component Breakdown

### App.jsx
The main container that manages the application state and coordinates interactions between components.

### Header.jsx
A simple header component displaying the application title and description.

### Controls.jsx
Contains all user input controls:
- Grid size inputs
- Edit mode toggle
- Action buttons (Generate, Solve, Reset)
- Animation controls (Play, Pause, Step)

### GridView.jsx & Cell.jsx
Responsible for rendering the grid and individual cells:
- GridView handles the overall grid layout and path connections
- Cell handles individual cell rendering and editing

### ResultsPanel.jsx
Displays the algorithm results:
- Minimum maximum radiation value
- Full path with coordinates and radiation levels

### InfoPanel.jsx
Provides information about the algorithm and a color legend for radiation levels.

### pathfinder.js
Contains the algorithm implementation:
- Binary search to find the minimum maximum radiation
- BFS to find paths with radiation levels under a threshold
- Path reconstruction from parent pointers

## Features

1. **Interactive Grid**
   - Dynamic grid generation
   - Cell editing capabilities
   - Visual representation of radiation levels with color-coding

2. **Path Visualization**
   - Optimal path highlighting
   - Connected path with lines between cells
   - Step-by-step animation

3. **Algorithm Controls**
   - Generate new random grids
   - Manual solving
   - Animation speed adjustment

4. **Responsive Design**
   - Works on various screen sizes
   - Adapts layout for mobile and desktop

## Technologies

- React for UI components
- Tailwind CSS for styling
- Vite for fast development experience