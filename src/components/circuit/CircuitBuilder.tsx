import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Plus, 
  Minus, 
  RotateCcw,
  Zap,
  Circle,
  Square
} from 'lucide-react';

interface Gate {
  id: string;
  type: 'H' | 'X' | 'Y' | 'Z' | 'CNOT' | 'Oracle' | 'Diffusion';
  qubit: number;
  target?: number;
}

interface CircuitBuilderProps {
  qubits: number;
}

export const CircuitBuilder: React.FC<CircuitBuilderProps> = ({ qubits }) => {
  const [gates, setGates] = useState<Gate[]>([]);
  const [selectedGate, setSelectedGate] = useState<'H' | 'X' | 'Y' | 'Z' | 'CNOT' | 'Oracle' | 'Diffusion'>('H');

  const gateTypes = [
    { type: 'H', name: 'Hadamard', color: 'bg-primary', description: 'Creates superposition' },
    { type: 'X', name: 'Pauli-X', color: 'bg-accent', description: 'Bit flip gate' },
    { type: 'Y', name: 'Pauli-Y', color: 'bg-secondary', description: 'Y rotation gate' },
    { type: 'Z', name: 'Pauli-Z', color: 'bg-quantum-green', description: 'Phase flip gate' },
    { type: 'CNOT', name: 'CNOT', color: 'bg-orange-500', description: 'Controlled NOT' },
    { type: 'Oracle', name: 'Oracle', color: 'bg-purple-500', description: 'Search oracle' },
    { type: 'Diffusion', name: 'Diffusion', color: 'bg-pink-500', description: 'Amplitude amplification' }
  ] as const;

  const addGate = (qubitIndex: number) => {
    const newGate: Gate = {
      id: `${selectedGate}-${Date.now()}`,
      type: selectedGate,
      qubit: qubitIndex
    };
    setGates([...gates, newGate]);
  };

  const removeGate = (gateId: string) => {
    setGates(gates.filter(gate => gate.id !== gateId));
  };

  const clearCircuit = () => {
    setGates([]);
  };

  return (
    <div className="space-y-6">
      {/* Gate Palette */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Gate Palette</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {gateTypes.map((gate) => (
            <div
              key={gate.type}
              className={`p-3 rounded-lg border cursor-pointer transition-all hover:scale-105 ${
                selectedGate === gate.type 
                  ? 'border-primary bg-primary/10 quantum-glow' 
                  : 'border-border hover:border-border/80'
              }`}
              onClick={() => setSelectedGate(gate.type)}
            >
              <div className={`w-8 h-6 ${gate.color} rounded text-white text-xs font-bold flex items-center justify-center mb-2`}>
                {gate.type}
              </div>
              <div className="text-xs font-medium">{gate.name}</div>
              <div className="text-xs text-muted-foreground mt-1">{gate.description}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Circuit Builder */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Circuit Builder</h3>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{gates.length} Gates</Badge>
            <Button onClick={clearCircuit} variant="outline" size="sm" className="gap-1">
              <RotateCcw className="h-3 w-3" />
              Clear
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {Array.from({ length: qubits }, (_, i) => (
            <div key={i} className="flex items-center space-x-4">
              {/* Qubit label */}
              <div className="w-12 text-right text-sm font-mono">
                |q{i}⟩
              </div>
              
              {/* Wire */}
              <div className="flex-1 relative h-0.5 bg-border">
                {/* Add gate button */}
                <Button
                  onClick={() => addGate(i)}
                  size="sm"
                  variant="outline"
                  className="absolute -top-4 left-4 h-8 w-8 p-0"
                >
                  <Plus className="h-3 w-3" />
                </Button>

                {/* Existing gates */}
                <div className="absolute inset-0 flex items-center space-x-8 pl-16">
                  {gates
                    .filter(gate => gate.qubit === i)
                    .map((gate, gateIndex) => (
                      <div key={gate.id} className="relative group">
                        <div className={`w-8 h-6 ${
                          gateTypes.find(g => g.type === gate.type)?.color || 'bg-gray-500'
                        } rounded text-white text-xs font-bold flex items-center justify-center`}>
                          {gate.type}
                        </div>
                        <Button
                          onClick={() => removeGate(gate.id)}
                          size="sm"
                          variant="destructive"
                          className="absolute -top-2 -right-2 h-4 w-4 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Minus className="h-2 w-2" />
                        </Button>
                      </div>
                    ))}
                </div>

                {/* Measurement */}
                <div className="absolute right-4 -top-3 w-6 h-6 rounded-full border-2 border-quantum-green flex items-center justify-center">
                  <Circle className="w-2 h-2 fill-quantum-green text-quantum-green" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <Separator className="my-6" />

        {/* Circuit Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="text-lg font-bold text-primary">{gates.length}</div>
            <div className="text-muted-foreground">Total Gates</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-accent">{qubits}</div>
            <div className="text-muted-foreground">Qubits</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-secondary">
              {Math.ceil(gates.length / qubits)}
            </div>
            <div className="text-muted-foreground">Depth</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-quantum-green">
              {gates.filter(g => g.type === 'H').length}
            </div>
            <div className="text-muted-foreground">H Gates</div>
          </div>
        </div>
      </Card>

      {/* Selected Gate Info */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Selected Gate: {selectedGate}</h3>
        <div className="text-sm text-muted-foreground">
          {gateTypes.find(g => g.type === selectedGate)?.description}
        </div>
        
        <div className="mt-4 p-3 bg-muted rounded-lg">
          <div className="text-xs font-mono">
            {selectedGate === 'H' && 'H|0⟩ = (|0⟩ + |1⟩)/√2'}
            {selectedGate === 'X' && 'X|0⟩ = |1⟩, X|1⟩ = |0⟩'}
            {selectedGate === 'Oracle' && 'O|x⟩ = (-1)^f(x)|x⟩'}
            {selectedGate === 'Diffusion' && 'D = 2|s⟩⟨s| - I'}
          </div>
        </div>
      </Card>
    </div>
  );
};
