import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  Play, 
  RotateCcw, 
  Zap,
  Grid3X3,
  TreePine,
  Network,
  Target
} from 'lucide-react';
import { MazeGenerator } from '@/components/MazeGenerator';
import { SearchComparison } from '@/components/SearchComparison';
import { QuantumCircuit } from '@/components/QuantumCircuit';
import { MazeConfigPanel } from '@/components/simulation/MazeConfigPanel';
import { AlgorithmSelector } from '@/components/simulation/AlgorithmSelector';
import { type MazeCell, type SearchResult } from '@/components/QuantumSearchVisualizer';

const SimulationPage = () => {
  const [maze, setMaze] = useState<MazeCell[][]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [classicalResult, setClassicalResult] = useState<SearchResult | null>(null);
  const [quantumResult, setQuantumResult] = useState<SearchResult | null>(null);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<'both' | 'classical' | 'quantum' | 'walk'>('both');
  const [mazeType, setMazeType] = useState<'grid' | 'tree' | 'graph' | 'multi'>('grid');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');

  const mazeTypes = [
    { id: 'grid', label: 'Grid Maze', icon: Grid3X3, description: 'Traditional grid-based maze' },
    { id: 'tree', label: 'Tree Maze', icon: TreePine, description: 'Welded tree structure' },
    { id: 'graph', label: 'Random Graph', icon: Network, description: 'Random connected graph' },
    { id: 'multi', label: 'Multi-Exit', icon: Target, description: 'Multiple target exits' }
  ];

  const runSimulation = async () => {
    if (!maze.length || isRunning) return;
    
    setIsRunning(true);
    setClassicalResult(null);
    setQuantumResult(null);
    
    // Simulate algorithm execution based on selection
    // Implementation would go here
    
    setTimeout(() => {
      setIsRunning(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-quantum bg-clip-text text-transparent">
            Maze Simulation
          </h1>
          <p className="text-muted-foreground mt-2">
            Configure mazes and compare algorithm performance
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="gap-2">
            <div className="w-2 h-2 bg-primary rounded-full quantum-pulse"></div>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Mode
          </Badge>
          
          <Button 
            onClick={runSimulation} 
            disabled={isRunning || !maze.length}
            className="gap-2 quantum-glow"
          >
            <Play className="h-4 w-4" />
            {isRunning ? 'Running...' : 'Start Simulation'}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="configure" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="configure" className="gap-2">
            <Settings className="h-4 w-4" />
            Configure
          </TabsTrigger>
          <TabsTrigger value="visualize" className="gap-2">
            <Zap className="h-4 w-4" />
            Visualize
          </TabsTrigger>
          <TabsTrigger value="circuit" className="gap-2">
            <Grid3X3 className="h-4 w-4" />
            Circuit
          </TabsTrigger>
        </TabsList>

        <TabsContent value="configure" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Maze Configuration */}
            <MazeConfigPanel 
              mazeType={mazeType}
              setMazeType={setMazeType}
              difficulty={difficulty}
              setDifficulty={setDifficulty}
              onGenerate={() => {
                // Generate maze based on configuration
                console.log('Generating maze:', { mazeType, difficulty });
              }}
            />

            {/* Algorithm Selection */}
            <AlgorithmSelector 
              selectedAlgorithm={selectedAlgorithm}
              setSelectedAlgorithm={setSelectedAlgorithm}
            />

            {/* Maze Types */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Maze Types</h3>
              <div className="space-y-3">
                {mazeTypes.map((type) => (
                  <div 
                    key={type.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      mazeType === type.id 
                        ? 'border-primary bg-primary/10' 
                        : 'border-border hover:border-border/80'
                    }`}
                    onClick={() => setMazeType(type.id as any)}
                  >
                    <div className="flex items-center gap-3">
                      <type.icon className="h-5 w-5" />
                      <div>
                        <div className="font-medium">{type.label}</div>
                        <div className="text-xs text-muted-foreground">{type.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="visualize" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <SearchComparison 
              maze={maze}
              classicalResult={classicalResult}
              quantumResult={quantumResult}
              isRunning={isRunning}
            />
            
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
              <div className="space-y-4">
                {classicalResult && (
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <h4 className="font-medium text-primary mb-2">Classical Results</h4>
                    <div className="text-sm space-y-1">
                      <div>Steps: {classicalResult.steps}</div>
                      <div>Time: {classicalResult.duration}ms</div>
                      <div>Path Length: {classicalResult.path.length}</div>
                    </div>
                  </div>
                )}
                
                {quantumResult && (
                  <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
                    <h4 className="font-medium text-accent mb-2">Quantum Results</h4>
                    <div className="text-sm space-y-1">
                      <div>Operations: {quantumResult.steps}</div>
                      <div>Time: {quantumResult.duration}ms</div>
                      <div>Path Length: {quantumResult.path.length}</div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="circuit" className="space-y-6">
          <QuantumCircuit 
            mazeSize={maze.length || 10}
            isRunning={isRunning}
            showQuantum={selectedAlgorithm === 'quantum' || selectedAlgorithm === 'both'}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SimulationPage;