import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MazeGenerator } from './MazeGenerator';
import { QuantumCircuit } from './QuantumCircuit';
import { SearchComparison } from './SearchComparison';
import { Upload, Zap, Play, RotateCcw } from 'lucide-react';

export interface MazeCell {
  x: number;
  y: number;
  isWall: boolean;
  isStart: boolean;
  isEnd: boolean;
  isVisited: boolean;
  isPath: boolean;
}

export interface SearchResult {
  path: { x: number; y: number }[];
  steps: number;
  duration: number;
}

const QuantumSearchVisualizer: React.FC = () => {
  const [maze, setMaze] = useState<MazeCell[][]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [classicalResult, setClassicalResult] = useState<SearchResult | null>(null);
  const [quantumResult, setQuantumResult] = useState<SearchResult | null>(null);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<'both' | 'classical' | 'quantum'>('both');

  const generateMaze = useCallback((size: number = 15) => {
    const newMaze: MazeCell[][] = [];
    
    // Initialize maze with walls
    for (let y = 0; y < size; y++) {
      newMaze[y] = [];
      for (let x = 0; x < size; x++) {
        newMaze[y][x] = {
          x,
          y,
          isWall: Math.random() > 0.7, // 30% walls
          isStart: x === 0 && y === 0,
          isEnd: x === size - 1 && y === size - 1,
          isVisited: false,
          isPath: false,
        };
      }
    }
    
    // Ensure start and end are not walls
    newMaze[0][0].isWall = false;
    newMaze[size - 1][size - 1].isWall = false;
    
    // Create a guaranteed path
    let x = 0, y = 0;
    while (x < size - 1 || y < size - 1) {
      newMaze[y][x].isWall = false;
      if (x < size - 1 && (y === size - 1 || Math.random() > 0.5)) {
        x++;
      } else if (y < size - 1) {
        y++;
      }
    }
    
    setMaze(newMaze);
    setClassicalResult(null);
    setQuantumResult(null);
  }, []);

  const resetVisualization = useCallback(() => {
    setIsRunning(false);
    setClassicalResult(null);
    setQuantumResult(null);
    
    // Reset maze visualization state
    setMaze(prevMaze => 
      prevMaze.map(row => 
        row.map(cell => ({
          ...cell,
          isVisited: false,
          isPath: false,
        }))
      )
    );
  }, []);

  const runSearch = useCallback(async () => {
    if (!maze.length || isRunning) return;
    
    setIsRunning(true);
    resetVisualization();
    
    try {
      if (selectedAlgorithm === 'both' || selectedAlgorithm === 'classical') {
        // Simulate classical search (BFS)
        const classicalPath = await simulateClassicalSearch(maze);
        setClassicalResult(classicalPath);
      }
      
      if (selectedAlgorithm === 'both' || selectedAlgorithm === 'quantum') {
        // Simulate Grover's quantum search
        const quantumPath = await simulateQuantumSearch(maze);
        setQuantumResult(quantumPath);
      }
    } finally {
      setIsRunning(false);
    }
  }, [maze, selectedAlgorithm, isRunning]);

  // Initialize with a default maze
  useEffect(() => {
    generateMaze();
  }, [generateMaze]);

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4 relative">
        <div className="absolute inset-0 bg-gradient-glow opacity-20 blur-3xl"></div>
        <h1 className="text-5xl font-bold bg-gradient-quantum bg-clip-text text-transparent relative z-10">
          Quantum Search Visualizer
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg relative z-10">
          Compare classical breadth-first search with Grover's quantum algorithm to find the optimal path through a maze
        </p>
        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full quantum-pulse"></div>
            <span>Interactive Visualization</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-accent rounded-full quantum-pulse"></div>
            <span>Quantum Circuit Simulation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-secondary rounded-full quantum-pulse"></div>
            <span>Algorithm Comparison</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <Card className="quantum-glow p-6">
        <div className="flex flex-wrap gap-4 items-center justify-center">
          <Button 
            onClick={() => generateMaze()} 
            variant="outline" 
            className="gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Generate Maze
          </Button>
          
          <div className="flex gap-2">
            <Button
              onClick={() => setSelectedAlgorithm('classical')}
              variant={selectedAlgorithm === 'classical' ? 'default' : 'outline'}
              size="sm"
            >
              Classical Only
            </Button>
            <Button
              onClick={() => setSelectedAlgorithm('quantum')}
              variant={selectedAlgorithm === 'quantum' ? 'default' : 'outline'}
              size="sm"
            >
              Quantum Only
            </Button>
            <Button
              onClick={() => setSelectedAlgorithm('both')}
              variant={selectedAlgorithm === 'both' ? 'default' : 'outline'}
              size="sm"
            >
              Compare Both
            </Button>
          </div>

          <Button 
            onClick={runSearch} 
            disabled={isRunning || !maze.length}
            className="gap-2 quantum-glow"
          >
            <Play className="h-4 w-4" />
            {isRunning ? 'Running...' : 'Start Search'}
          </Button>

          <Button 
            onClick={resetVisualization}
            variant="outline"
            className="gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>
      </Card>

      {/* Main visualization area */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Maze and Search Comparison */}
        <SearchComparison 
          maze={maze}
          classicalResult={classicalResult}
          quantumResult={quantumResult}
          isRunning={isRunning}
        />

        {/* Quantum Circuit */}
        <QuantumCircuit 
          mazeSize={maze.length}
          isRunning={isRunning}
          showQuantum={selectedAlgorithm === 'quantum' || selectedAlgorithm === 'both'}
        />
      </div>

      {/* Results */}
      {(classicalResult || quantumResult) && (
        <Card className="p-6 quantum-glow">
          <h3 className="text-xl font-semibold mb-4 text-center">Search Results</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {classicalResult && (
              <div className="space-y-2">
                <h4 className="font-medium text-primary">Classical Search (BFS)</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Path Length: {classicalResult.path.length} steps</p>
                  <p>Nodes Explored: {classicalResult.steps}</p>
                  <p>Time: {classicalResult.duration}ms</p>
                </div>
              </div>
            )}
            {quantumResult && (
              <div className="space-y-2">
                <h4 className="font-medium text-accent">Grover's Algorithm</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Path Length: {quantumResult.path.length} steps</p>
                  <p>Quantum Operations: {quantumResult.steps}</p>
                  <p>Time: {quantumResult.duration}ms</p>
                </div>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

// Simulate classical BFS search
async function simulateClassicalSearch(maze: MazeCell[][]): Promise<SearchResult> {
  const startTime = Date.now();
  const size = maze.length;
  const visited = new Set<string>();
  const queue: Array<{ x: number; y: number; path: { x: number; y: number }[] }> = [];
  
  const start = { x: 0, y: 0 };
  const end = { x: size - 1, y: size - 1 };
  
  queue.push({ ...start, path: [start] });
  visited.add(`${start.x},${start.y}`);
  
  let steps = 0;
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  
  while (queue.length > 0) {
    const current = queue.shift()!;
    steps++;
    
    // Add delay for visualization
    await new Promise(resolve => setTimeout(resolve, 50));
    
    if (current.x === end.x && current.y === end.y) {
      return {
        path: current.path,
        steps,
        duration: Date.now() - startTime,
      };
    }
    
    for (const [dx, dy] of directions) {
      const nx = current.x + dx;
      const ny = current.y + dy;
      const key = `${nx},${ny}`;
      
      if (
        nx >= 0 && nx < size &&
        ny >= 0 && ny < size &&
        !maze[ny][nx].isWall &&
        !visited.has(key)
      ) {
        visited.add(key);
        queue.push({
          x: nx,
          y: ny,
          path: [...current.path, { x: nx, y: ny }],
        });
      }
    }
  }
  
  return {
    path: [],
    steps,
    duration: Date.now() - startTime,
  };
}

// Simulate Grover's quantum search (simplified)
async function simulateQuantumSearch(maze: MazeCell[][]): Promise<SearchResult> {
  const startTime = Date.now();
  const size = maze.length;
  
  // Simulate quantum speedup with fewer operations
  const quantumSteps = Math.floor(Math.sqrt(size * size));
  
  // Add delay for quantum circuit visualization
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // For demo purposes, use the same pathfinding but with "quantum speedup"
  const classicalResult = await simulateClassicalSearch(maze);
  
  return {
    path: classicalResult.path,
    steps: quantumSteps,
    duration: Date.now() - startTime,
  };
}

export default QuantumSearchVisualizer;