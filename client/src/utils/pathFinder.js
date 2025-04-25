/**
 * Find the path with the minimum maximum radiation level
 * @param {Array<Array<number>>} grid - The grid with radiation levels
 * @returns {Object} - Object with minimum maximum radiation and the path
 */
export const findSafePath = (grid) => {
    const n = grid.length;
    const m = grid[0].length;
    
    // Edge case: empty grid
    if (n === 0 || m === 0) return { minMaxRadiation: -1, path: [] };
    
    // Get all unique radiation values in sorted order
    const radiationValues = [...new Set(grid.flat())].sort((a, b) => a - b);
    
    let left = 0;
    let right = radiationValues.length - 1;
    let result = { minMaxRadiation: Infinity, path: [] };
    
    // Binary search on radiation values
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const maxRadiation = radiationValues[mid];
      
      // Check if path exists with radiation levels <= maxRadiation
      const bfsResult = bfs(grid, maxRadiation);
      
      if (bfsResult.found) {
        result = {
          minMaxRadiation: maxRadiation,
          path: bfsResult.path
        };
        right = mid - 1; // Try to find a better (lower) radiation level
      } else {
        left = mid + 1; // Need to allow higher radiation level
      }
    }
    
    return result;
  };
  
  /**
   * Breadth-first search to find a path with radiation <= maxRadiation
   * @param {Array<Array<number>>} grid - The grid with radiation levels
   * @param {number} maxRadiation - Maximum allowed radiation level
   * @returns {Object} - Object with found status and path
   */
  const bfs = (grid, maxRadiation) => {
    const n = grid.length;
    const m = grid[0].length;
    
    // If start or end positions have radiation higher than allowed, no path exists
    if (grid[0][0] > maxRadiation || grid[n-1][m-1] > maxRadiation) {
      return { found: false, path: [] };
    }
    
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // Up, Down, Left, Right
    const visited = Array(n).fill().map(() => Array(m).fill(false));
    const parent = Array(n).fill().map(() => Array(m).fill(null));
    
    const queue = [{x: 0, y: 0}];
    visited[0][0] = true;
    
    while (queue.length > 0) {
      const {x, y} = queue.shift();
      
      // Reached the target
      if (x === n-1 && y === m-1) {
        return {
          found: true,
          path: reconstructPath(parent, n-1, m-1)
        };
      }
      
      // Try all four directions
      for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;
        
        // Check if the new position is valid
        if (nx >= 0 && nx < n && ny >= 0 && ny < m && 
            !visited[nx][ny] && grid[nx][ny] <= maxRadiation) {
          visited[nx][ny] = true;
          parent[nx][ny] = {x, y};
          queue.push({x: nx, y: ny});
        }
      }
    }
    
    return { found: false, path: [] };
  };
  
  /**
   * Reconstruct path from parent pointers
   * @param {Array<Array<Object>>} parent - Parent pointers
   * @param {number} x - End x coordinate
   * @param {number} y - End y coordinate
   * @returns {Array<Object>} - Path as array of coordinates
   */
  const reconstructPath = (parent, x, y) => {
    const path = [];
    
    // Start from the end point and follow parent pointers
    let current = {x, y};
    while (current !== null) {
      path.unshift(current);
      if (current.x === 0 && current.y === 0) break;
      current = parent[current.x][current.y];
    }
    
    return path;
  };