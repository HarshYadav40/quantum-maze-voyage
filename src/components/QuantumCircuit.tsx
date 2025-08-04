import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';

interface QuantumCircuitProps {
  mazeSize: number;
  isRunning: boolean;
  showQuantum: boolean;
}

export const QuantumCircuit: React.FC<QuantumCircuitProps> = ({ 
  mazeSize, 
  isRunning, 
  showQuantum 
}) => {
  const [animationStep, setAnimationStep] = useState(0);
  const qubits = Math.ceil(Math.log2(mazeSize * mazeSize)) || 4;

  useEffect(() => {
    if (!isRunning || !showQuantum) {
      setAnimationStep(0);
      return;
    }

    const interval = setInterval(() => {
      setAnimationStep(prev => (prev + 1) % 6);
    }, 800);

    return () => clearInterval(interval);
  }, [isRunning, showQuantum]);

  if (!showQuantum) {
    return (
      <Card className="p-6 h-96 flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <div className="text-2xl mb-2">🔬</div>
          <p>Select quantum algorithm to view circuit</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 quantum-glow">
      <h3 className="text-xl font-semibold mb-4 text-center">
        Grover's Quantum Circuit
      </h3>
      
      <div className="space-y-4">
        {/* Circuit diagram */}
        <div className="bg-card rounded-lg p-4 border border-border">
          <div className="space-y-3">
            {Array.from({ length: qubits }, (_, i) => (
              <QubitLine 
                key={i} 
                qubitIndex={i} 
                animationStep={animationStep}
                isRunning={isRunning}
              />
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-2 bg-primary rounded"></div>
              <span>Hadamard Gate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-2 bg-accent rounded"></div>
              <span>Oracle</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-2 bg-secondary rounded"></div>
              <span>Diffusion</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-quantum-green rounded-full"></div>
              <span>Measurement</span>
            </div>
          </div>
        </div>

        {/* Algorithm steps */}
        <div className="text-sm text-muted-foreground space-y-1">
          <p className={animationStep >= 1 ? 'text-primary' : ''}>
            1. Initialize superposition with Hadamard gates
          </p>
          <p className={animationStep >= 2 ? 'text-accent' : ''}>
            2. Apply oracle (marks target states)
          </p>
          <p className={animationStep >= 3 ? 'text-secondary' : ''}>
            3. Apply diffusion operator
          </p>
          <p className={animationStep >= 4 ? 'text-accent' : ''}>
            4. Repeat oracle application
          </p>
          <p className={animationStep >= 5 ? 'text-secondary' : ''}>
            5. Apply final diffusion
          </p>
          <p className={animationStep >= 6 ? 'text-quantum-green' : ''}>
            6. Measure result
          </p>
        </div>

        {/* Quantum advantage info */}
        <div className="bg-muted rounded-lg p-3 text-sm">
          <h4 className="font-medium text-accent mb-1">Quantum Advantage</h4>
          <p className="text-muted-foreground">
            Classical search: O(N) operations<br/>
            Grover's algorithm: O(√N) operations<br/>
            Speedup: √{mazeSize * mazeSize} ≈ {Math.ceil(Math.sqrt(mazeSize * mazeSize))}x faster
          </p>
        </div>
      </div>
    </Card>
  );
};

interface QubitLineProps {
  qubitIndex: number;
  animationStep: number;
  isRunning: boolean;
}

const QubitLine: React.FC<QubitLineProps> = ({ qubitIndex, animationStep, isRunning }) => {
  return (
    <div className="flex items-center space-x-2">
      {/* Qubit label */}
      <div className="w-8 text-right text-sm font-mono">
        |q{qubitIndex}⟩
      </div>
      
      {/* Wire */}
      <div className="flex-1 relative h-0.5 bg-border">
        {/* Gates */}
        <div className="absolute inset-0 flex items-center justify-between px-4">
          {/* Hadamard */}
          <div className={`w-6 h-4 bg-primary rounded text-xs flex items-center justify-center text-primary-foreground font-bold transition-all duration-300 ${
            isRunning && animationStep >= 1 ? 'quantum-pulse' : ''
          }`}>
            H
          </div>
          
          {/* Oracle */}
          <div className={`w-6 h-4 bg-accent rounded text-xs flex items-center justify-center text-accent-foreground font-bold transition-all duration-300 ${
            isRunning && (animationStep === 2 || animationStep === 4) ? 'quantum-pulse' : ''
          }`}>
            O
          </div>
          
          {/* Diffusion */}
          <div className={`w-6 h-4 bg-secondary rounded text-xs flex items-center justify-center text-secondary-foreground font-bold transition-all duration-300 ${
            isRunning && (animationStep === 3 || animationStep === 5) ? 'quantum-pulse' : ''
          }`}>
            D
          </div>
          
          {/* Measurement */}
          <div className={`w-4 h-4 rounded-full border-2 border-quantum-green flex items-center justify-center transition-all duration-300 ${
            isRunning && animationStep >= 6 ? 'bg-quantum-green quantum-pulse' : ''
          }`}>
            <div className="w-1 h-1 bg-quantum-green rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};