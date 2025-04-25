import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Controls from './components/Controls';
import GridView from './components/GridView';
import ResultsPanel from './components/ResultsPanel';
import InfoPanel from './components/InfoPanel';
import { findSafePath } from './utils/pathFinder.js';

function App() {
  // State variables
  const [grid, setGrid] = useState([]);
  const [path, setPath] = useState([]);
  const [minMaxRadiation, setMinMaxRadiation] = useState('-');
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [gridSize, setGridSize] = useState({ n: 3, m: 3 });
  const [animationSpeed, setAnimationSpeed] = useState(5);
  
  // Effect to initialize grid on load
  useEffect(() => {
    generateGrid();
  }, []);

  // Generate a new grid based on the current grid size
  const generateGrid = () => {
    const { n, m } = gridSize;
    
    // Validate input
    if (n < 2 || m < 2 || n > 10 || m > 10) {
      alert('Grid size must be between 2 and 10');
      return;
    }

    // Create grid with random radiation values
    let newGrid = Array(n).fill().map(() => 
      Array(m).fill().map(() => Math.floor(Math.random() * 100) + 1)
    );

    // Update sample grid with first example if 3x3
    if (n === 3 && m === 3) {
      newGrid = [
        [1, 3, 5],
        [2, 8, 2],
        [4, 2, 1]
      ];
    }

    setGrid(newGrid);
    resetPath();
  };
  
  // Update a cell's value
  const updateCell = (row, col, value) => {
    const newGrid = [...grid];
    newGrid[row][col] = value;
    setGrid(newGrid);
  };
  
  // Reset path data without changing the grid
  const resetPath = () => {
    setPath([]);
    setCurrentStep(0);
    setMinMaxRadiation('-');
    setIsAnimating(false);
  };
  
  // Reset everything
  const resetGrid = () => {
    resetPath();
  };
  
  // Handle grid size change
  const handleGridSizeChange = (dimension, value) => {
    setGridSize(prev => ({ ...prev, [dimension]: value }));
  };
  
  // Solve the maze and find the safest path
  const solveMaze = () => {
    const result = findSafePath(grid);
    setMinMaxRadiation(result.minMaxRadiation !== Infinity ? result.minMaxRadiation : '-1');
    setPath(result.path);
    setCurrentStep(0);
  };
  
  // Animation controls
  const startAnimation = () => {
    if (!path.length) return;
    
    if (currentStep >= path.length) {
      setCurrentStep(0);
    }
    
    setIsAnimating(true);
  };
  
  const pauseAnimation = () => {
    setIsAnimating(false);
  };
  
  const stepAnimation = () => {
    if (!path.length) return;
    
    if (currentStep >= path.length) {
      setCurrentStep(0);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  // Effect to handle animation
  useEffect(() => {
    if (!isAnimating || !path.length) return;
    
    const intervalTime = 1100 - (animationSpeed * 100); // Convert 1-10 to milliseconds
    
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < path.length - 1) {
          return prev + 1;
        } else {
          setIsAnimating(false);
          return prev;
        }
      });
    }, intervalTime);
    
    return () => clearInterval(interval);
  }, [isAnimating, path.length, animationSpeed]);
  
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <Controls 
          gridSize={gridSize}
          onGridSizeChange={handleGridSizeChange}
          editMode={editMode}
          setEditMode={setEditMode}
          onGenerate={generateGrid}
          onSolve={solveMaze}
          onReset={resetGrid}
          isAnimating={isAnimating}
          onPlay={startAnimation}
          onPause={pauseAnimation}
          onStep={stepAnimation}
          animationSpeed={animationSpeed}
          setAnimationSpeed={setAnimationSpeed}
        />
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg h-full">
              <h2 className="text-xl font-semibold mb-4">Grid Visualization</h2>
              <div className="grid-container overflow-auto" style={{ maxHeight: '600px' }}>
                <GridView 
                  grid={grid}
                  editMode={editMode}
                  updateCell={updateCell}
                  path={path}
                  currentStep={currentStep}
                  isAnimating={isAnimating}
                />
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/3">
            <ResultsPanel 
              minMaxRadiation={minMaxRadiation}
              path={path}
              grid={grid}
            />
            
            <InfoPanel />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;