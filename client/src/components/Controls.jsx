import React from 'react';

const Controls = ({
  gridSize,
  onGridSizeChange,
  editMode,
  setEditMode,
  onGenerate,
  onSolve,
  onReset,
  isAnimating,
  onPlay,
  onPause,
  onStep,
  animationSpeed,
  setAnimationSpeed
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-4 md:mb-0">
          <div>
            <label htmlFor="gridSizeN" className="block text-sm font-medium text-gray-300 mb-1">
              Grid Height (N):
            </label>
            <input
              type="number"
              id="gridSizeN"
              min="2"
              max="10"
              value={gridSize.n}
              onChange={(e) => onGridSizeChange('n', parseInt(e.target.value))}
              className="bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-24"
            />
          </div>
          <div>
            <label htmlFor="gridSizeM" className="block text-sm font-medium text-gray-300 mb-1">
              Grid Width (M):
            </label>
            <input
              type="number"
              id="gridSizeM"
              min="2"
              max="10"
              value={gridSize.m}
              onChange={(e) => onGridSizeChange('m', parseInt(e.target.value))}
              className="bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-24"
            />
          </div>
          <div>
            <label htmlFor="editModeToggle" className="block text-sm font-medium text-gray-300 mb-1">
              Edit Mode:
            </label>
            <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
              <input
                type="checkbox"
                id="editModeToggle"
                checked={editMode}
                onChange={() => setEditMode(!editMode)}
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              />
              <label
                htmlFor="editModeToggle"
                className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-700 cursor-pointer"
              ></label>
            </div>
            <span
              className={`text-xs ${editMode ? 'text-green-400' : 'text-gray-400'}`}
            >
              {editMode ? 'On' : 'Off'}
            </span>
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={onGenerate}
            className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-6 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            Generate Grid
          </button>
          <button
            onClick={onSolve}
            className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-6 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
          >
            Solve Path
          </button>
          <button
            onClick={onReset}
            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div>
            <label htmlFor="animationSpeed" className="block text-sm font-medium text-gray-300 mb-1">
              Animation Speed:
            </label>
            <input
              type="range"
              id="animationSpeed"
              min="1"
              max="10"
              value={animationSpeed}
              onChange={(e) => setAnimationSpeed(parseInt(e.target.value))}
              className="bg-gray-700 rounded w-full"
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={onPlay}
              disabled={isAnimating}
              className={`${
                isAnimating ? 'bg-green-800' : 'bg-green-600 hover:bg-green-700'
              } text-white px-4 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-green-500 transition-all`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button
              onClick={onPause}
              disabled={!isAnimating}
              className={`${
                !isAnimating ? 'bg-yellow-800' : 'bg-yellow-600 hover:bg-yellow-700'
              } text-white px-4 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button
              onClick={onStep}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controls;