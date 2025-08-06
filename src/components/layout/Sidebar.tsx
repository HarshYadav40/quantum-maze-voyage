import { NavLink, useLocation } from "react-router-dom";
import { 
  Home, 
  Play, 
  Cpu, 
  BookOpen, 
  BarChart3,
  Menu,
  Atom
} from "lucide-react";
import {
  Sidebar as SidebarPrimitive,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Simulation", href: "/simulation", icon: Play },
  { name: "Quantum Circuit", href: "/circuit", icon: Cpu },
  { name: "Learn", href: "/learn", icon: BookOpen },
  { name: "Statistics", href: "/stats", icon: BarChart3 },
];

export function Sidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <SidebarPrimitive className={`${collapsed ? "w-14" : "w-64"} border-r border-border/50 bg-card/50 backdrop-blur-sm`}>
      <SidebarContent>
        {/* Header */}
        <div className="flex items-center gap-2 p-4 border-b border-border/50">
          <div className="w-8 h-8 bg-gradient-quantum rounded-lg flex items-center justify-center">
            <Atom className="h-5 w-5 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-bold text-lg bg-gradient-quantum bg-clip-text text-transparent">
                QuantumMaze
              </h2>
              <p className="text-xs text-muted-foreground">AI Learning Platform</p>
            </div>
          )}
          <SidebarTrigger className="ml-auto" />
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild className="w-full">
                      <NavLink
                        to={item.href}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                          isActive
                            ? "bg-primary/20 text-primary border border-primary/30 quantum-glow"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        }`}
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        {!collapsed && <span className="font-medium">{item.name}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Footer */}
        {!collapsed && (
          <div className="mt-auto p-4 border-t border-border/50">
            <div className="text-xs text-muted-foreground space-y-1">
              <p>🔬 Explore quantum computing</p>
              <p>🎮 Interactive learning</p>
              <p>⚡ Real-time visualization</p>
            </div>
          </div>
        )}
      </SidebarContent>
    </SidebarPrimitive>
  );
}