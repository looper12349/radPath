import React, { useState } from 'react';

const Cell = ({ 
  row, 
  col, 
  value, 
  isStart, 
  isEnd, 
  isPath, 
  editMode, 
  onUpdateCell 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  // Get radiation class based on value
  const getRadiationClass = (val) => {
    if (val <= 20) return 'bg-green-300'; // Safe
    if (val <= 40) return 'bg-green-500'; // Low
    if (val <= 60) return 'bg-yellow-200'; // Medium
    if (val <= 80) return 'bg-orange-400'; // High
    if (val <= 100) return 'bg-red-400'; // Very High
    return 'bg-red-600'; // Extreme
  };

  // Handle cell click for editing
  const handleCellClick = () => {
    if (editMode && !isEditing) {
      setIsEditing(true);
    }
  };

  // Handle input blur
  const handleBlur = () => {
    const newValue = parseInt(inputValue);
    if (!isNaN(newValue) && newValue > 0) {
      onUpdateCell(row, col, newValue);
    } else {
      setInputValue(value); // Reset to original value if invalid
    }
    setIsEditing(false);
  };

  // Handle input change
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handle key down
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
  };

  // Base classes for the cell
  let cellClasses = `grid-cell ${getRadiationClass(value)} flex items-center justify-center font-medium h-12 w-full rounded-md relative`;
  
  // Add edit mode class if applicable
  if (editMode) {
    cellClasses += ' edit-mode-cell';
  }
  
  // Add path cell styling
  if (isPath) {
    cellClasses += ' path-cell ring-4 ring-blue-500 z-10';
  }
  
  // Add start/end styling
  if (isStart) {
    cellClasses += ' ring-2 ring-blue-500';
  } else if (isEnd) {
    cellClasses += ' ring-2 ring-green-500';
  }

  return (
    <div 
      className={cellClasses} 
      onClick={handleCellClick}
      style={isPath ? { backgroundColor: 'rgba(59, 130, 246, 0.7)', color: 'white', fontWeight: 'bold' } : {}}
    >
      {isEditing ? (
        <input
          type="number"
          min="1"
          max="999"
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="cell-input bg-gray-700"
          autoFocus
        />
      ) : (
        <>
          {value}
          {isStart && (
            <div className="absolute -top-2 -left-2 bg-blue-500 text-xs rounded-full p-1">S</div>
          )}
          {isEnd && (
            <div className="absolute -bottom-2 -right-2 bg-green-500 text-xs rounded-full p-1">E</div>
          )}
        </>
      )}
    </div>
  );
};

export default Cell;