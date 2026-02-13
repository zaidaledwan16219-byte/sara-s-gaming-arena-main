import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Capitals from "./pages/games/Capitals";
import FlagsGame from "./pages/games/FlagsGame";
import ArabicSongsGame from "./pages/games/ArabicSongsGame";
import FamousMoviesGame from "./pages/games/FamousMoviesGame";
import ChemistryGame from "./pages/games/ChemistryGame";
import JordanianFood from "./pages/games/Jordanian-Food";
import FastestAnswer from "./pages/games/FastestAnswer";
import FastMathGame from "./pages/games/FastMath";
import SeriesGame from './pages/games/Series';
import DeathRouletteGame from "./pages/games/DeathRouletteGame";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/game/capitals" element={<Capitals />} />
          <Route path="/game/flags" element={<FlagsGame />} />
          <Route path="/game/jordanianfood" element={<JordanianFood />} />
          <Route path="/game/Chemistry" element={<ChemistryGame />} />
          <Route path="/game/fastestanswer" element={<FastestAnswer />} />
          <Route path="/game/fastmath" element={<FastMathGame />} />
          <Route path="/game/arabic-songs" element={<ArabicSongsGame />} />
          <Route path="/game/famous-movies" element={<FamousMoviesGame />} />
          <Route path="/game/series" element={<SeriesGame />} />
          <Route path="/game/death-roulette" element={<DeathRouletteGame />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
