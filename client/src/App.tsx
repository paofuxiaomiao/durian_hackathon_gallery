// Tropical Editorial · 路由组装
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Router as WouterRouter, Route, Switch, useLocation } from "wouter";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Voices from "./pages/Voices";
import About from "./pages/About";
import FieldNotes from "./pages/FieldNotes";
import SecretGrove from "./pages/SecretGrove";
import MapPage from "./pages/Map";

declare const __APP_BASE__: string;
const BASE = __APP_BASE__;

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location]);
  return null;
}

function AppRoutes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/projects" component={Projects} />
      <Route path="/projects/:id" component={ProjectDetail} />
      <Route path="/voices" component={Voices} />
      <Route path="/field-notes" component={FieldNotes} />
      <Route path="/secret-grove" component={SecretGrove} />
      <Route path="/map" component={MapPage} />
      <Route path="/about" component={About} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <WouterRouter base={BASE}>
        <ThemeProvider defaultTheme="light">
          <TooltipProvider>
            <Toaster />
            <ScrollToTop />
            <AppRoutes />
          </TooltipProvider>
        </ThemeProvider>
      </WouterRouter>
    </ErrorBoundary>
  );
}

export default App;
