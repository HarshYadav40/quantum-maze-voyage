import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, Grid, Download } from 'lucide-react';

interface MazeGeneratorProps {
  onMazeGenerated: (maze: any[][]) => void;
}

export const MazeGenerator: React.FC<MazeGeneratorProps> = ({ onMazeGenerated }) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        // Parse maze file (simplified format)
        const lines = content.trim().split('\n');
        const maze = lines.map((line, y) => 
          line.split('').map((char, x) => ({
            x,
            y,
            isWall: char === '#',
            isStart: char === 'S',
            isEnd: char === 'E',
            isVisited: false,
            isPath: false,
          }))
        );
        onMazeGenerated(maze);
      } catch (error) {
        console.error('Error parsing maze file:', error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Maze Input</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Upload Maze File</label>
          <input
            type="file"
            accept=".txt,.maze"
            onChange={handleFileUpload}
            className="hidden"
            id="maze-upload"
          />
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={() => document.getElementById('maze-upload')?.click()}
          >
            <Upload className="h-4 w-4" />
            Choose File
          </Button>
        </div>
        
        <div className="text-xs text-muted-foreground">
          <p>Format: # = wall, S = start, E = end, . = empty</p>
          <p>Example:</p>
          <pre className="bg-muted p-2 rounded mt-1">
{`S.#.E
.....
#.#.#
.....
....E`}
          </pre>
        </div>
      </div>
    </Card>
  );
};