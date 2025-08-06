import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Download,
  Cpu,
  Zap,
  Brain
} from 'lucide-react';
import { QuantumCircuit } from '@/components/QuantumCircuit';
import { CircuitBuilder } from '@/components/circuit/CircuitBuilder';
import { StateVisualizer } from '@/components/circuit/StateVisualizer';

const CircuitPage = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [speed, setSpeed] = useState([500]);
  const [qubits, setQubits] = useState([4]);
  const [circuitType, setCircuitType] = useState<'grover' | 'custom'>('grover');

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % 8);
    }, speed[0]);

    return () => clearInterval(interval);
  }, [isRunning, speed]);

  const toggleExecution = () => {
    setIsRunning(!isRunning);
  };

  const resetCircuit = () => {
    setIsRunning(false);
    setCurrentStep(0);
  };

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-quantum bg-clip-text text-transparent">
            Quantum Circuit Lab
          </h1>
          <p className="text-muted-foreground mt-2">
            Build, simulate, and analyze quantum circuits
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="gap-2">
            <Cpu className="h-3 w-3" />
            {qubits[0]} Qubits
          </Badge>
          
          <div className="flex items-center gap-2">
            <Button
              onClick={toggleExecution}
              variant={isRunning ? "destructive" : "default"}
              className="gap-2"
            >
              {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isRunning ? 'Pause' : 'Execute'}
            </Button>
            
            <Button onClick={resetCircuit} variant="outline" className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="circuit" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="circuit" className="gap-2">
            <Cpu className="h-4 w-4" />
            Circuit
          </TabsTrigger>
          <TabsTrigger value="builder" className="gap-2">
            <Brain className="h-4 w-4" />
            Builder
          </TabsTrigger>
          <TabsTrigger value="analysis" className="gap-2">
            <Zap className="h-4 w-4" />
            Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="circuit" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Circuit Visualization */}
            <div className="lg:col-span-2">
              <QuantumCircuit 
                mazeSize={Math.pow(2, qubits[0])}
                isRunning={isRunning}
                showQuantum={true}
              />
            </div>

            {/* Controls */}
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Circuit Controls</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Qubits: {qubits[0]}
                    </label>
                    <Slider
                      value={qubits}
                      onValueChange={setQubits}
                      max={6}
                      min={2}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Speed: {speed[0]}ms
                    </label>
                    <Slider
                      value={speed}
                      onValueChange={setSpeed}
                      max={1000}
                      min={100}
                      step={50}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Circuit Type</label>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => setCircuitType('grover')}
                        variant={circuitType === 'grover' ? 'default' : 'outline'}
                        size="sm"
                        className="flex-1"
                      >
                        Grover's
                      </Button>
                      <Button
                        onClick={() => setCircuitType('custom')}
                        variant={circuitType === 'custom' ? 'default' : 'outline'}
                        size="sm"
                        className="flex-1"
                      >
                        Custom
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Execution Status</h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Step:</span>
                    <span className="font-mono">{currentStep}/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <Badge variant={isRunning ? "default" : "secondary"}>
                      {isRunning ? "Running" : "Idle"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Progress:</span>
                    <span>{Math.round((currentStep / 7) * 100)}%</span>
                  </div>
                </div>

                <div className="w-full bg-muted rounded-full h-2 mt-4">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / 7) * 100}%` }}
                  />
                </div>
              </Card>

              <Button className="w-full gap-2" variant="outline">
                <Download className="h-4 w-4" />
                Export Circuit
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="builder" className="space-y-6">
          <CircuitBuilder qubits={qubits[0]} />
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <StateVisualizer 
            qubits={qubits[0]} 
            currentStep={currentStep}
            isRunning={isRunning}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CircuitPage;