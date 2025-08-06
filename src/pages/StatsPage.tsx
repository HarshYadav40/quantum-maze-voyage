import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart3, 
  TrendingUp, 
  Clock,
  Target,
  Zap,
  Brain,
  Download,
  RefreshCw
} from 'lucide-react';

const StatsPage = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [algorithmFilter, setAlgorithmFilter] = useState('all');

  // Mock data for demonstration
  const stats = {
    totalRuns: 157,
    averageTime: 2.3,
    bestSpeedup: 4.2,
    successRate: 94.7
  };

  const algorithmComparison = [
    {
      algorithm: 'Classical BFS',
      runs: 52,
      avgTime: 145,
      avgSteps: 89,
      successRate: 100,
      color: 'text-primary'
    },
    {
      algorithm: "Grover's Search",
      runs: 67,
      avgTime: 34,
      avgSteps: 21,
      successRate: 96.3,
      color: 'text-accent'
    },
    {
      algorithm: 'Quantum Walk',
      runs: 38,
      avgTime: 42,
      avgSteps: 25,
      successRate: 89.5,
      color: 'text-secondary'
    }
  ];

  const recentRuns = [
    { id: 1, algorithm: 'Grover\'s', maze: 'Grid 15x15', time: '23ms', steps: 18, success: true },
    { id: 2, algorithm: 'Classical', maze: 'Tree Graph', time: '156ms', steps: 97, success: true },
    { id: 3, algorithm: 'Quantum Walk', maze: 'Multi-Exit', time: '45ms', steps: 31, success: true },
    { id: 4, algorithm: 'Grover\'s', maze: 'Random Graph', time: '19ms', steps: 15, success: false },
    { id: 5, algorithm: 'Classical', maze: 'Grid 20x20', time: '234ms', steps: 142, success: true }
  ];

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-quantum bg-clip-text text-transparent">
            Performance Analytics
          </h1>
          <p className="text-muted-foreground mt-2">
            Compare algorithm performance and track your progress
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Card className="p-6 text-center">
          <Target className="h-8 w-8 mx-auto mb-3 text-primary" />
          <div className="text-3xl font-bold">{stats.totalRuns}</div>
          <div className="text-sm text-muted-foreground">Total Simulations</div>
        </Card>
        
        <Card className="p-6 text-center">
          <Clock className="h-8 w-8 mx-auto mb-3 text-accent" />
          <div className="text-3xl font-bold">{stats.averageTime}s</div>
          <div className="text-sm text-muted-foreground">Average Time</div>
        </Card>
        
        <Card className="p-6 text-center">
          <Zap className="h-8 w-8 mx-auto mb-3 text-secondary" />
          <div className="text-3xl font-bold">{stats.bestSpeedup}x</div>
          <div className="text-sm text-muted-foreground">Best Quantum Speedup</div>
        </Card>
        
        <Card className="p-6 text-center">
          <TrendingUp className="h-8 w-8 mx-auto mb-3 text-quantum-green" />
          <div className="text-3xl font-bold">{stats.successRate}%</div>
          <div className="text-sm text-muted-foreground">Success Rate</div>
        </Card>
      </div>

      <Tabs defaultValue="comparison" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="comparison" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Algorithm Comparison
          </TabsTrigger>
          <TabsTrigger value="performance" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            Performance Trends
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-2">
            <Clock className="h-4 w-4" />
            Run History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="comparison" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">Algorithm Performance Comparison</h3>
            
            <div className="space-y-6">
              {algorithmComparison.map((algo) => (
                <div key={algo.algorithm} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Brain className={`h-5 w-5 ${algo.color}`} />
                      <span className="font-medium">{algo.algorithm}</span>
                      <Badge variant="outline">{algo.runs} runs</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {algo.successRate}% success rate
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="bg-muted/50 rounded-lg p-3 text-center">
                      <div className="font-bold text-lg">{algo.avgTime}ms</div>
                      <div className="text-muted-foreground">Avg Time</div>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3 text-center">
                      <div className="font-bold text-lg">{algo.avgSteps}</div>
                      <div className="text-muted-foreground">Avg Steps</div>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3 text-center">
                      <div className="font-bold text-lg">
                        {algo.algorithm === 'Classical BFS' ? '1.0x' : 
                         `${(145 / algo.avgTime).toFixed(1)}x`}
                      </div>
                      <div className="text-muted-foreground">Speedup</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Maze Type Performance */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Performance by Maze Type</h3>
            
            <div className="grid md:grid-cols-4 gap-4">
              {['Grid Maze', 'Tree Structure', 'Random Graph', 'Multi-Exit'].map((type) => (
                <div key={type} className="bg-muted/50 rounded-lg p-4 text-center">
                  <div className="font-medium mb-2">{type}</div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>Classical: 156ms</div>
                    <div>Quantum: 34ms</div>
                    <div className="font-bold text-accent">4.6x speedup</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Performance Trends Over Time</h3>
            
            {/* Simulated chart placeholder */}
            <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center border-2 border-dashed border-muted">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Performance chart visualization would appear here</p>
                <p className="text-sm text-muted-foreground mt-2">
                  For real quantum hardware integration, you'll need to connect to Supabase for data storage
                </p>
              </div>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Improvement Metrics</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Speed Optimization</span>
                  <Badge variant="default">+23%</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Success Rate</span>
                  <Badge variant="default">+12%</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Algorithm Efficiency</span>
                  <Badge variant="default">+34%</Badge>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Learning Progress</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Concepts Mastered</span>
                  <span className="font-bold">8/12</span>
                </div>
                <div className="flex justify-between">
                  <span>Quizzes Completed</span>
                  <span className="font-bold">2/3</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Study Time</span>
                  <span className="font-bold">4.2h</span>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Recent Simulation Runs</h3>
              <Select value={algorithmFilter} onValueChange={setAlgorithmFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Algorithms</SelectItem>
                  <SelectItem value="classical">Classical Only</SelectItem>
                  <SelectItem value="quantum">Quantum Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-3">
              {recentRuns.map((run) => (
                <div key={run.id} className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div className="flex items-center gap-4">
                    <Badge variant={run.success ? "default" : "destructive"}>
                      {run.success ? "Success" : "Failed"}
                    </Badge>
                    <div>
                      <div className="font-medium">{run.algorithm}</div>
                      <div className="text-sm text-muted-foreground">{run.maze}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-center">
                      <div className="font-bold">{run.time}</div>
                      <div className="text-muted-foreground">Time</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold">{run.steps}</div>
                      <div className="text-muted-foreground">Steps</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Need Backend Notice */}
      <Card className="p-6 border-accent/50 bg-accent/5">
        <div className="flex items-start gap-4">
          <Brain className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-accent mb-2">Enhanced Features Available</h3>
            <p className="text-sm text-muted-foreground mb-3">
              For real quantum hardware integration, leaderboards, and persistent data storage, 
              connect your project to Supabase to unlock advanced backend capabilities.
            </p>
            <Button variant="outline" size="sm" className="gap-2">
              <Zap className="h-3 w-3" />
              Learn More About Integration
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StatsPage;