import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CyberGAI from "./pages/CyberGAI";
import NotFound from "./pages/NotFound";
import ScrollProgressIndicator from "./components/ScrollProgressIndicator";
import VibeChartPage from "@/components/VibeChartPage";
import ChartGeneratorPage from "@/components/ChartGeneratorPage";

import Auth from "@/components/AuthSystem";



const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ScrollProgressIndicator />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CyberGAI />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="/vibe-chart" element={<VibeChartPage /> } />
          <Route path="/chart-generator" element={<ChartGeneratorPage /> } />
          
          

          <Route path="/auth" element={<Auth />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
