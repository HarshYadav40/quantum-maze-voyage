import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { Sidebar } from '@/components/layout/Sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

// Pages
import HomePage from '@/pages/HomePage';
import SimulationPage from '@/pages/SimulationPage';
import CircuitPage from '@/pages/CircuitPage';
import LearnPage from '@/pages/LearnPage';
import StatsPage from '@/pages/StatsPage';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="quantum-maze-theme">
      <Router>
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-background">
            <Sidebar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/simulation" element={<SimulationPage />} />
                <Route path="/circuit" element={<CircuitPage />} />
                <Route path="/learn" element={<LearnPage />} />
                <Route path="/stats" element={<StatsPage />} />
              </Routes>
            </main>
          </div>
          <Toaster />
        </SidebarProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;