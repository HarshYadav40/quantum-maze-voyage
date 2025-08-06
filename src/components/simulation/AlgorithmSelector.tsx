import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Cpu, Zap, GitBranch } from 'lucide-react';

interface AlgorithmSelectorProps {
  selectedAlgorithm: 'both' | 'classical' | 'quantum' | 'walk';
  setSelectedAlgorithm: (algorithm: 'both' | 'classical' | 'quantum' | 'walk') => void;
}

export const AlgorithmSelector: React.FC<AlgorithmSelectorProps> = ({
  selectedAlgorithm,
  setSelectedAlgorithm
}) => {
  const algorithms = [
    {
      id: 'classical',
      name: 'Classical BFS',
      icon: Brain,
      description: 'Breadth-first search',
      complexity: 'O(N)',
      badge: 'Traditional',
      color: 'text-primary'
    },
    {
      id: 'quantum',
      name: "Grover's Search",
      icon: Cpu,
      description: 'Quantum amplitude amplification',
      complexity: 'O(√N)',
      badge: 'Quantum',
      color: 'text-accent'
    },
    {
      id: 'walk',
      name: 'Quantum Walk',
      icon: GitBranch,
      description: 'Advanced quantum pathfinding',
      complexity: 'O(√N)',
      badge: 'Advanced',
      color: 'text-secondary'
    }
  ];

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Algorithm Selection</h3>
        
        <div className="space-y-3">
          {algorithms.map((algo) => (
            <div 
              key={algo.id}
              className={`p-4 rounded-lg border cursor-pointer transition-all hover:scale-[1.02] ${
                selectedAlgorithm === algo.id 
                  ? 'border-primary bg-primary/10 quantum-glow' 
                  : 'border-border hover:border-border/80'
              }`}
              onClick={() => setSelectedAlgorithm(algo.id as any)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <algo.icon className={`h-5 w-5 ${algo.color}`} />
                  <div>
                    <div className="font-medium">{algo.name}</div>
                    <div className="text-sm text-muted-foreground">{algo.description}</div>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {algo.badge}
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground">
                Complexity: <span className="font-mono">{algo.complexity}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Button 
          onClick={() => setSelectedAlgorithm('both')}
          variant={selectedAlgorithm === 'both' ? 'default' : 'outline'}
          className="w-full gap-2"
        >
          <Zap className="h-4 w-4" />
          Compare All Algorithms
        </Button>
      </div>

      {/* Performance Preview */}
      <div className="bg-muted/50 rounded-lg p-4 text-sm">
        <h4 className="font-medium mb-2">Expected Performance</h4>
        <div className="space-y-1 text-muted-foreground">
          <div>Classical: Linear search time</div>
          <div>Quantum: Square root speedup</div>
          <div>Walk: Path memory optimization</div>
        </div>
      </div>
    </Card>
  );
};