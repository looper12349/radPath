import React from 'react';

const InfoPanel = () => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4">About the Algorithm</h2>
      <div className="text-gray-300 text-sm space-y-3">
        <p>
          The <span className="font-medium text-blue-400">Safe Path</span> algorithm 
          finds the path from the top-left to the bottom-right of a grid that minimizes 
          the maximum radiation encountered.
        </p>
        <p>
          This is solved using a binary search combined with BFS (Breadth-First Search) 
          to efficiently find the optimal path.
        </p>
        
        <h3 className="text-lg font-medium mt-4 mb-2">Radiation Level Legend</h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-sm bg-green-300 mr-2"></div>
            <span>0-20: Safe</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-sm bg-green-500 mr-2"></div>
            <span>21-40: Low</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-sm bg-yellow-200 mr-2"></div>
            <span>41-60: Medium</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-sm bg-orange-400 mr-2"></div>
            <span>61-80: High</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-sm bg-red-400 mr-2"></div>
            <span>81-100: Very High</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-sm bg-red-600 mr-2"></div>
            <span>100+: Extreme</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;