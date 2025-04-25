import React from 'react';

const ResultsPanel = ({ minMaxRadiation, path, grid }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
      <h2 className="text-xl font-semibold mb-4">Results</h2>
      <div className="flex items-center space-x-2 mb-4">
        <span className="text-gray-300">Minimum max radiation:</span>
        <span className="text-2xl font-bold text-blue-400">{minMaxRadiation}</span>
      </div>
      {path.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-2">Optimal Path</h3>
          <div className="text-sm text-gray-300 max-h-60 overflow-y-auto">
            {path.map((pos, idx) => (
              <div key={idx} className="mb-1">
                {idx+1}. ({pos.x}, {pos.y}) - Radiation: {grid[pos.x][pos.y]}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsPanel;