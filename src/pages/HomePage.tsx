import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Cpu, 
  BookOpen, 
  BarChart3, 
  Zap,
  Brain,
  Atom,
  ChevronRight
} from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Play,
      title: "Interactive Simulation",
      description: "Compare classical and quantum algorithms solving mazes in real-time",
      path: "/simulation",
      color: "text-primary"
    },
    {
      icon: Cpu,
      title: "Quantum Circuits",
      description: "Visualize quantum gates and see how Grover's algorithm works",
      path: "/circuit",
      color: "text-accent"
    },
    {
      icon: BookOpen,
      title: "Learn Quantum",
      description: "Interactive tutorials and concepts with visual explanations",
      path: "/learn",
      color: "text-secondary"
    },
    {
      icon: BarChart3,
      title: "Performance Stats",
      description: "Analyze and compare algorithm performance metrics",
      path: "/stats",
      color: "text-quantum-green"
    }
  ];

  const algorithms = [
    {
      name: "Classical BFS",
      description: "Breadth-first search with O(N) complexity",
      badge: "Traditional",
      variant: "outline" as const
    },
    {
      name: "Grover's Algorithm",
      description: "Quantum search with O(√N) speedup",
      badge: "Quantum",
      variant: "default" as const
    },
    {
      name: "Quantum Walk",
      description: "Advanced quantum path exploration",
      badge: "Advanced",
      variant: "secondary" as const
    }
  ];

  return (
    <div className="min-h-screen bg-background p-6 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6 relative">
        <div className="absolute inset-0 bg-gradient-glow opacity-10 blur-3xl"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <Atom className="h-8 w-8 text-primary quantum-pulse" />
            <h1 className="text-6xl font-bold bg-gradient-quantum bg-clip-text text-transparent">
              QuantumMaze
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Experience the power of quantum computing through interactive maze-solving algorithms. 
            Compare classical and quantum approaches while learning fundamental quantum concepts.
          </p>
          
          <div className="flex items-center justify-center gap-6 mt-6">
            <Button 
              onClick={() => navigate('/simulation')} 
              size="lg" 
              className="gap-2 quantum-glow px-8 py-4 text-lg"
            >
              <Play className="h-5 w-5" />
              Start Simulation
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button 
              onClick={() => navigate('/learn')} 
              variant="outline" 
              size="lg"
              className="gap-2 px-8 py-4 text-lg"
            >
              <BookOpen className="h-5 w-5" />
              Learn Concepts
            </Button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card 
            key={feature.title}
            className="p-6 hover:scale-105 transition-all duration-300 cursor-pointer quantum-glow group"
            onClick={() => navigate(feature.path)}
          >
            <div className="space-y-4">
              <feature.icon className={`h-8 w-8 ${feature.color} group-hover:scale-110 transition-transform`} />
              <div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform ml-auto" />
            </div>
          </Card>
        ))}
      </div>

      {/* Algorithm Comparison */}
      <Card className="p-8 quantum-glow">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Available Algorithms</h2>
          <p className="text-muted-foreground">
            Compare different search strategies and understand their computational complexity
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {algorithms.map((algo, index) => (
            <div key={algo.name} className="space-y-4 p-6 rounded-lg border border-border/50 bg-card/50">
              <div className="flex items-center justify-between">
                <Badge variant={algo.variant}>{algo.badge}</Badge>
                <Brain className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{algo.name}</h3>
                <p className="text-sm text-muted-foreground mt-2">{algo.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="text-center space-y-2">
          <div className="text-3xl font-bold text-primary">∞</div>
          <div className="text-sm text-muted-foreground">Maze Configurations</div>
        </div>
        <div className="text-center space-y-2">
          <div className="text-3xl font-bold text-accent">√N</div>
          <div className="text-sm text-muted-foreground">Quantum Speedup</div>
        </div>
        <div className="text-center space-y-2">
          <div className="text-3xl font-bold text-secondary">3</div>
          <div className="text-sm text-muted-foreground">Algorithm Types</div>
        </div>
        <div className="text-center space-y-2">
          <div className="text-3xl font-bold text-quantum-green">∅</div>
          <div className="text-sm text-muted-foreground">Learning Barriers</div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;