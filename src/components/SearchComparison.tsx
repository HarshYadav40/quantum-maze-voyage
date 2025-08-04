import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { MazeCell, SearchResult } from './QuantumSearchVisualizer';

interface SearchComparisonProps {
  maze: MazeCell[][];
  classicalResult: SearchResult | null;
  quantumResult: SearchResult | null;
  isRunning: boolean;
}

export const SearchComparison: React.FC<SearchComparisonProps> = ({
  maze,
  classicalResult,
  quantumResult,
  isRunning
}) => {
  const [visualizationStep, setVisualizationStep] = useState(0);

  useEffect(() => {
    if (!isRunning) {
      setVisualizationStep(0);
      return;
    }

    const interval = setInterval(() => {
      setVisualizationStep(prev => prev + 1);
    }, 100);

    return () => clearInterval(interval);
  }, [isRunning]);

  const getCellClassName = (cell: MazeCell, isQuantumView: boolean = false) => {
    const baseClasses = "maze-cell w-6 h-6 border border-border/30 flex items-center justify-center text-xs font-bold transition-all duration-300";
    
    if (cell.isStart) {
      return `${baseClasses} bg-quantum-green text-background`;
    }
    if (cell.isEnd) {
      return `${baseClasses} bg-destructive text-destructive-foreground`;
    }
    if (cell.isWall) {
      return `${baseClasses} bg-foreground`;
    }
    
    // Show path results
    const result = isQuantumView ? quantumResult : classicalResult;
    if (result?.path.some(p => p.x === cell.x && p.y === cell.y)) {
      const pathColor = isQuantumView ? 'bg-accent' : 'bg-primary';
      return `${baseClasses} ${pathColor} quantum-pulse`;
    }
    
    if (isRunning && visualizationStep > (cell.x + cell.y) * 2) {
      return `${baseClasses} bg-muted/50`;
    }
    
    return `${baseClasses} bg-card hover:bg-muted/50`;
  };

  if (!maze.length) {
    return (
      <Card className="p-6 h-96 flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <div className="text-2xl mb-2">🧩</div>
          <p>Generate a maze to start visualization</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 quantum-glow">
      <h3 className="text-xl font-semibold mb-4 text-center">Maze Search Visualization</h3>
      
      <div className="space-y-6">
        {/* Classical Search */}
        <div>
          <h4 className="text-sm font-medium text-primary mb-2 flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            Classical BFS Search
          </h4>
          <div className="bg-card/50 rounded-lg p-3 border border-border/50">
            <div className="grid gap-0.5 justify-center" style={{
              gridTemplateColumns: `repeat(${maze[0]?.length || 1}, minmax(0, 1fr))`
            }}>
              {maze.flat().map((cell) => (
                <div
                  key={`classical-${cell.x}-${cell.y}`}
                  className={getCellClassName(cell, false)}
                >
                  {cell.isStart && 'S'}
                  {cell.isEnd && 'E'}
                </div>
              ))}
            </div>
          </div>
          {classicalResult && (
            <div className="text-xs text-muted-foreground mt-2">
              Path: {classicalResult.path.length} steps | Explored: {classicalResult.steps} nodes
            </div>
          )}
        </div>

        {/* Quantum Search */}
        <div>
          <h4 className="text-sm font-medium text-accent mb-2 flex items-center gap-2">
            <div className="w-2 h-2 bg-accent rounded-full quantum-pulse"></div>
            Grover's Quantum Search
          </h4>
          <div className="bg-card/50 rounded-lg p-3 border border-border/50">
            <div className="grid gap-0.5 justify-center" style={{
              gridTemplateColumns: `repeat(${maze[0]?.length || 1}, minmax(0, 1fr))`
            }}>
              {maze.flat().map((cell) => (
                <div
                  key={`quantum-${cell.x}-${cell.y}`}
                  className={getCellClassName(cell, true)}
                >
                  {cell.isStart && 'S'}
                  {cell.isEnd && 'E'}
                </div>
              ))}
            </div>
          </div>
          {quantumResult && (
            <div className="text-xs text-muted-foreground mt-2">
              Path: {quantumResult.path.length} steps | Quantum ops: {quantumResult.steps}
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="bg-muted/30 rounded-lg p-3">
          <h5 className="text-sm font-medium mb-2">Legend</h5>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-quantum-green rounded"></div>
              <span>Start (S)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-destructive rounded"></div>
              <span>End (E)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-foreground rounded"></div>
              <span>Wall</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded"></div>
              <span>Classical Path</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-card border border-border rounded"></div>
              <span>Empty</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-accent rounded"></div>
              <span>Quantum Path</span>
            </div>
          </div>
        </div>

        {isRunning && (
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-primary rounded-full quantum-pulse"></div>
              Searching for optimal path...
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};