import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Play, 
  CheckCircle,
  Clock,
  Brain,
  Atom,
  Zap,
  Target,
  ChevronRight,
  Award
} from 'lucide-react';

const LearnPage = () => {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [currentQuiz, setCurrentQuiz] = useState<string | null>(null);

  const lessons = [
    {
      id: 'quantum-basics',
      title: 'Quantum Computing Basics',
      description: 'Learn about qubits, superposition, and quantum states',
      duration: '15 min',
      difficulty: 'Beginner',
      topics: ['Qubits', 'Superposition', 'Measurement', 'Quantum States'],
      icon: Atom
    },
    {
      id: 'grover-algorithm',
      title: "Grover's Search Algorithm",
      description: 'Understand quantum search and amplitude amplification',
      duration: '20 min',
      difficulty: 'Intermediate',
      topics: ['Oracle', 'Diffusion', 'Amplitude Amplification', 'Quantum Speedup'],
      icon: Zap
    },
    {
      id: 'quantum-walks',
      title: 'Quantum Random Walks',
      description: 'Explore quantum walk algorithms and their applications',
      duration: '25 min',
      difficulty: 'Advanced',
      topics: ['Quantum Walks', 'Coin Operator', 'Interference', 'Path Memory'],
      icon: Target
    }
  ];

  const concepts = [
    {
      title: 'Superposition',
      description: 'A quantum state that exists in multiple states simultaneously until measured',
      example: '|ψ⟩ = α|0⟩ + β|1⟩',
      visualization: 'quantum-sphere'
    },
    {
      title: 'Entanglement',
      description: 'Quantum correlation between particles that persists regardless of distance',
      example: '|ψ⟩ = (|00⟩ + |11⟩)/√2',
      visualization: 'entangled-pairs'
    },
    {
      title: 'Interference',
      description: 'Quantum amplitudes can add constructively or destructively',
      example: 'Probability ∝ |α + β|²',
      visualization: 'wave-interference'
    },
    {
      title: 'Measurement',
      description: 'Observing a quantum system collapses it to a classical state',
      example: 'P(|0⟩) = |α|², P(|1⟩) = |β|²',
      visualization: 'collapse-animation'
    }
  ];

  const quizzes = [
    {
      id: 'basics-quiz',
      title: 'Quantum Basics Quiz',
      questions: 5,
      timeLimit: '10 min',
      difficulty: 'Beginner'
    },
    {
      id: 'grover-quiz',
      title: "Grover's Algorithm Quiz",
      questions: 7,
      timeLimit: '15 min',
      difficulty: 'Intermediate'
    },
    {
      id: 'advanced-quiz',
      title: 'Advanced Concepts Quiz',
      questions: 10,
      timeLimit: '20 min',
      difficulty: 'Advanced'
    }
  ];

  const toggleLessonComplete = (lessonId: string) => {
    if (completedLessons.includes(lessonId)) {
      setCompletedLessons(completedLessons.filter(id => id !== lessonId));
    } else {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  const progressPercentage = (completedLessons.length / lessons.length) * 100;

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-quantum bg-clip-text text-transparent">
            Quantum Learning Hub
          </h1>
          <p className="text-muted-foreground mt-2">
            Master quantum computing concepts through interactive lessons
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="gap-2">
            <Award className="h-3 w-3" />
            {completedLessons.length}/{lessons.length} Completed
          </Badge>
          
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Progress</div>
            <div className="font-bold text-lg">{Math.round(progressPercentage)}%</div>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Learning Progress</h3>
          <Button variant="outline" size="sm">View Certificates</Button>
        </div>
        
        <Progress value={progressPercentage} className="h-3 mb-4" />
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{completedLessons.length}</div>
            <div className="text-muted-foreground">Lessons Complete</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">3</div>
            <div className="text-muted-foreground">Quizzes Available</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary">60</div>
            <div className="text-muted-foreground">Total Minutes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-quantum-green">12</div>
            <div className="text-muted-foreground">Key Concepts</div>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="lessons" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="lessons" className="gap-2">
            <BookOpen className="h-4 w-4" />
            Lessons
          </TabsTrigger>
          <TabsTrigger value="concepts" className="gap-2">
            <Brain className="h-4 w-4" />
            Concepts
          </TabsTrigger>
          <TabsTrigger value="quizzes" className="gap-2">
            <Target className="h-4 w-4" />
            Quizzes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="lessons" className="space-y-6">
          <div className="grid gap-6">
            {lessons.map((lesson) => {
              const isCompleted = completedLessons.includes(lesson.id);
              
              return (
                <Card key={lesson.id} className={`p-6 hover:scale-[1.02] transition-all cursor-pointer ${
                  isCompleted ? 'border-primary bg-primary/5' : ''
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`p-3 rounded-lg ${isCompleted ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                        <lesson.icon className="h-6 w-6" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold">{lesson.title}</h3>
                          {isCompleted && <CheckCircle className="h-5 w-5 text-primary" />}
                        </div>
                        
                        <p className="text-muted-foreground mb-4">{lesson.description}</p>
                        
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {lesson.duration}
                          </div>
                          <Badge variant="outline">{lesson.difficulty}</Badge>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-3">
                          {lesson.topics.map((topic) => (
                            <Badge key={topic} variant="secondary" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button 
                        onClick={() => toggleLessonComplete(lesson.id)}
                        variant={isCompleted ? "outline" : "default"}
                        className="gap-2"
                      >
                        <Play className="h-4 w-4" />
                        {isCompleted ? 'Review' : 'Start'}
                      </Button>
                      
                      <ChevronRight className="h-5 w-5 text-muted-foreground mx-auto" />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="concepts" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {concepts.map((concept, index) => (
              <Card key={concept.title} className="p-6 hover:scale-[1.02] transition-all">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-quantum rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-semibold">{concept.title}</h3>
                  </div>
                  
                  <p className="text-muted-foreground">{concept.description}</p>
                  
                  <div className="p-3 bg-muted rounded-lg font-mono text-sm">
                    {concept.example}
                  </div>
                  
                  <Button variant="outline" className="w-full gap-2">
                    <Play className="h-4 w-4" />
                    Interactive Demo
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="quizzes" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <Card key={quiz.id} className="p-6 hover:scale-[1.02] transition-all">
                <div className="space-y-4">
                  <div className="text-center">
                    <Target className="h-8 w-8 mx-auto mb-3 text-primary" />
                    <h3 className="text-lg font-semibold">{quiz.title}</h3>
                  </div>
                  
                  <div className="text-center text-sm text-muted-foreground space-y-1">
                    <div>{quiz.questions} Questions</div>
                    <div>Time Limit: {quiz.timeLimit}</div>
                    <Badge variant="outline">{quiz.difficulty}</Badge>
                  </div>
                  
                  <Button 
                    onClick={() => setCurrentQuiz(quiz.id)}
                    className="w-full gap-2"
                  >
                    <Play className="h-4 w-4" />
                    Start Quiz
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Achievement System */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Achievements</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center p-4 rounded-lg border border-border">
            <Award className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="font-medium">First Steps</div>
            <div className="text-xs text-muted-foreground">Complete first lesson</div>
          </div>
          <div className="text-center p-4 rounded-lg border border-border opacity-50">
            <Brain className="h-8 w-8 mx-auto mb-2" />
            <div className="font-medium">Quantum Thinker</div>
            <div className="text-xs text-muted-foreground">Complete all concepts</div>
          </div>
          <div className="text-center p-4 rounded-lg border border-border opacity-50">
            <Target className="h-8 w-8 mx-auto mb-2" />
            <div className="font-medium">Quiz Master</div>
            <div className="text-xs text-muted-foreground">Pass all quizzes</div>
          </div>
          <div className="text-center p-4 rounded-lg border border-border opacity-50">
            <Zap className="h-8 w-8 mx-auto mb-2" />
            <div className="font-medium">Quantum Expert</div>
            <div className="text-xs text-muted-foreground">100% completion</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LearnPage;