import React, { useRef, useEffect } from 'react';
import Cell from './Cell';

const GridView = ({ 
  grid, 
  editMode, 
  updateCell, 
  path, 
  currentStep, 
  isAnimating 
}) => {
  const gridRef = useRef(null);
  
  // Function to check if a cell is in the current path up to currentStep
  const isInCurrentPath = (row, col) => {
    if (!path.length) return false;
    
    for (let i = 0; i <= currentStep && i < path.length; i++) {
      if (path[i].x === row && path[i].y === col) {
        return true;
      }
    }
    return false;
  };
  
  // Create path connectors
  useEffect(() => {
    if (!gridRef.current || !path.length || currentStep < 1) return;
    
    // Clean up previous connectors
    const existingConnectors = gridRef.current.querySelectorAll('.path-connector');
    existingConnectors.forEach(connector => connector.remove());
    
    // Create connectors for the visible path
    for (let i = 1; i <= currentStep && i < path.length; i++) {
      const fromPos = path[i - 1];
      const toPos = path[i];
      createPathConnector(fromPos.x, fromPos.y, toPos.x, toPos.y);
    }
  }, [path, currentStep]);
  
  // Function to create a path connector between two cells
  const createPathConnector = (fromX, fromY, toX, toY) => {
    if (!gridRef.current) return;
    
    // Find the cells
    const cellElements = gridRef.current.querySelectorAll('.grid-cell');
    const gridWidth = grid[0]?.length || 0;
    
    const fromIndex = fromX * gridWidth + fromY;
    const toIndex = toX * gridWidth + toY;
    
    const fromCell = cellElements[fromIndex];
    const toCell = cellElements[toIndex];
    
    if (!fromCell || !toCell) return;
    
    // Get cell positions
    const fromRect = fromCell.getBoundingClientRect();
    const toRect = toCell.getBoundingClientRect();
    const gridRect = gridRef.current.getBoundingClientRect();
    
    // Calculate center points relative to grid container
    const fromCenterX = fromRect.left + fromRect.width/2 - gridRect.left;
    const fromCenterY = fromRect.top + fromRect.height/2 - gridRect.top;
    const toCenterX = toRect.left + toRect.width/2 - gridRect.left;
    const toCenterY = toRect.top + toRect.height/2 - gridRect.top;
    
    // Calculate length and angle
    const dx = toCenterX - fromCenterX;
    const dy = toCenterY - fromCenterY;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    
    // Create connector
    const connector = document.createElement('div');
    connector.className = 'path-connector';
    connector.style.width = `${length}px`;
    connector.style.height = '4px';
    connector.style.left = `${fromCenterX}px`;
    connector.style.top = `${fromCenterY - 2}px`;
    connector.style.transform = `rotate(${angle}deg)`;
    connector.style.borderRadius = '2px';
    connector.style.opacity = '0.7';
    
    // Add to grid
    gridRef.current.appendChild(connector);
  };
  
  // If grid is empty, return placeholder
  if (!grid.length) {
    return <div>No grid data available</div>;
  }
  
  const gridTemplateColumns = `repeat(${grid[0].length}, minmax(40px, 60px))`;
  
  return (
    <div 
      ref={gridRef} 
      className="grid gap-1 mx-auto relative" 
      style={{ gridTemplateColumns }}
    >
      {grid.map((row, rowIndex) => 
        row.map((value, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            row={rowIndex}
            col={colIndex}
            value={value}
            isStart={rowIndex === 0 && colIndex === 0}
            isEnd={rowIndex === grid.length - 1 && colIndex === grid[0].length - 1}
            isPath={isInCurrentPath(rowIndex, colIndex)}
            editMode={editMode}
            onUpdateCell={updateCell}
          />
        ))
      )}
    </div>
  );
};

export default GridView;