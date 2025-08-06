import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RotateCcw, Shuffle } from 'lucide-react';

interface MazeConfigPanelProps {
  mazeType: 'grid' | 'tree' | 'graph' | 'multi';
  setMazeType: (type: 'grid' | 'tree' | 'graph' | 'multi') => void;
  difficulty: 'easy' | 'medium' | 'hard';
  setDifficulty: (difficulty: 'easy' | 'medium' | 'hard') => void;
  onGenerate: () => void;
}

export const MazeConfigPanel: React.FC<MazeConfigPanelProps> = ({
  mazeType,
  setMazeType,
  difficulty,
  setDifficulty,
  onGenerate
}) => {
  const [mazeSize, setMazeSize] = React.useState([15]);
  const [wallDensity, setWallDensity] = React.useState([30]);

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Maze Configuration</h3>
        
        <div className="space-y-4">
          {/* Maze Type */}
          <div className="space-y-2">
            <Label>Maze Type</Label>
            <Select value={mazeType} onValueChange={(value: any) => setMazeType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grid">Grid Maze</SelectItem>
                <SelectItem value="tree">Tree Structure</SelectItem>
                <SelectItem value="graph">Random Graph</SelectItem>
                <SelectItem value="multi">Multi-Exit</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Difficulty */}
          <div className="space-y-2">
            <Label>Difficulty</Label>
            <Select value={difficulty} onValueChange={(value: any) => setDifficulty(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy (10x10)</SelectItem>
                <SelectItem value="medium">Medium (15x15)</SelectItem>
                <SelectItem value="hard">Hard (20x20)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Maze Size */}
          <div className="space-y-2">
            <Label>Size: {mazeSize[0]}x{mazeSize[0]}</Label>
            <Slider
              value={mazeSize}
              onValueChange={setMazeSize}
              max={25}
              min={10}
              step={1}
              className="w-full"
            />
          </div>

          {/* Wall Density */}
          <div className="space-y-2">
            <Label>Wall Density: {wallDensity[0]}%</Label>
            <Slider
              value={wallDensity}
              onValueChange={setWallDensity}
              max={60}
              min={10}
              step={5}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={onGenerate} className="flex-1 gap-2">
          <RotateCcw className="h-4 w-4" />
          Generate
        </Button>
        <Button variant="outline" className="gap-2">
          <Shuffle className="h-4 w-4" />
          Random
        </Button>
      </div>
    </Card>
  );
};