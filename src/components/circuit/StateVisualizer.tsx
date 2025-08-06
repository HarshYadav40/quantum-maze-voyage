import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface StateVisualizerProps {
  qubits: number;
  currentStep: number;
  isRunning: boolean;
}

export const StateVisualizer: React.FC<StateVisualizerProps> = ({
  qubits,
  currentStep,
  isRunning
}) => {
  const numStates = Math.pow(2, qubits);
  
  // Simulate quantum state amplitudes based on Grover's algorithm
  const getAmplitudes = (step: number) => {
    const amplitudes = new Array(numStates).fill(0);
    
    if (step === 0) {
      // Initial uniform superposition
      const amplitude = 1 / Math.sqrt(numStates);
      amplitudes.fill(amplitude);
    } else {
      // Simulate Grover's algorithm progression
      const targetState = numStates - 1; // Last state as target
      const iterations = Math.floor(step / 2);
      const optimalIterations = Math.floor((Math.PI / 4) * Math.sqrt(numStates));
      
      for (let i = 0; i < numStates; i++) {
        if (i === targetState) {
          // Target state amplitude grows
          amplitudes[i] = Math.sin((2 * iterations + 1) * Math.asin(1 / Math.sqrt(numStates)));
        } else {
          // Non-target states
          amplitudes[i] = Math.cos((2 * iterations + 1) * Math.asin(1 / Math.sqrt(numStates))) / Math.sqrt(numStates - 1);
        }
      }
    }
    
    return amplitudes;
  };

  const amplitudes = getAmplitudes(currentStep);
  const probabilities = amplitudes.map(amp => Math.pow(Math.abs(amp), 2));
  const maxProbability = Math.max(...probabilities);

  return (
    <div className="space-y-6">
      {/* State Vector Visualization */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Quantum State Vector</h3>
          <Badge variant="outline">
            Step {currentStep}/7
          </Badge>
        </div>

        <div className="grid gap-3">
          {probabilities.map((prob, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-mono">
                  |{index.toString(2).padStart(qubits, '0')}⟩
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">
                    {(prob * 100).toFixed(1)}%
                  </span>
                  <Badge 
                    variant={prob === maxProbability ? "default" : "outline"}
                    className="text-xs"
                  >
                    {amplitudes[index] >= 0 ? '+' : '-'}{Math.abs(amplitudes[index]).toFixed(3)}
                  </Badge>
                </div>
              </div>
              <Progress 
                value={prob * 100} 
                className="h-2"
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Probability Distribution */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Measurement Probabilities</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {(maxProbability * 100).toFixed(1)}%
            </div>
            <div className="text-xs text-muted-foreground">Highest Probability</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">
              {probabilities.filter(p => p > 0.01).length}
            </div>
            <div className="text-xs text-muted-foreground">Significant States</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary">
              {(probabilities.reduce((sum, p) => sum + p * p, 0)).toFixed(3)}
            </div>
            <div className="text-xs text-muted-foreground">Purity</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-quantum-green">
              {Math.sqrt(probabilities.length)}x
            </div>
            <div className="text-xs text-muted-foreground">Speedup Factor</div>
          </div>
        </div>

        {/* Visual representation */}
        <div className="space-y-3">
          <h4 className="font-medium">State Distribution</h4>
          <div className="grid grid-cols-8 gap-1">
            {probabilities.map((prob, index) => (
              <div
                key={index}
                className="aspect-square rounded border border-border flex items-center justify-center text-xs font-mono relative overflow-hidden"
                style={{
                  backgroundColor: `hsla(var(--primary), ${prob})`,
                }}
              >
                <span className={prob > 0.1 ? "text-white" : "text-foreground"}>
                  {index.toString(2).padStart(qubits, '0')}
                </span>
                {prob === maxProbability && (
                  <div className="absolute inset-0 border-2 border-primary quantum-pulse"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Algorithm Progress */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Grover's Algorithm Progress</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Initialization</span>
            <Badge variant={currentStep >= 1 ? "default" : "outline"}>
              {currentStep >= 1 ? "Complete" : "Pending"}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span>Oracle Application</span>
            <Badge variant={currentStep >= 2 ? "default" : "outline"}>
              {currentStep >= 2 ? "Complete" : "Pending"}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span>Diffusion Operator</span>
            <Badge variant={currentStep >= 3 ? "default" : "outline"}>
              {currentStep >= 3 ? "Complete" : "Pending"}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span>Amplitude Amplification</span>
            <Badge variant={currentStep >= 5 ? "default" : "outline"}>
              {currentStep >= 5 ? "Complete" : "Pending"}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span>Measurement</span>
            <Badge variant={currentStep >= 7 ? "default" : "outline"}>
              {currentStep >= 7 ? "Complete" : "Pending"}
            </Badge>
          </div>
        </div>

        <div className="mt-4 p-3 bg-muted rounded-lg">
          <div className="text-sm">
            <strong>Current Phase:</strong> {
              currentStep === 0 ? "Preparing superposition state" :
              currentStep <= 2 ? "Applying oracle marking" :
              currentStep <= 4 ? "Diffusion operation" :
              currentStep <= 6 ? "Amplitude amplification" :
              "Ready for measurement"
            }
          </div>
        </div>
      </Card>
    </div>
  );
};