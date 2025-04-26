
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Fitness from "./pages/Fitness";
import Nutrition from "./pages/Nutrition";
import News from "./pages/News";
import Organization from "./pages/Organization";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import FloatingChatButton from "./components/FloatingChatButton";
import { createDemoAccount, getUserFromStorage } from "./lib/utils";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    if (!getUserFromStorage()) {
      createDemoAccount();
    }
  }, []);


  const allowedRoutes = ['/fitness', '/news', '/nutrition', '/organization', '/profile'];

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/fitness" element={<Fitness />} />
            <Route path="/nutrition" element={<Nutrition />} />
            <Route path="/news" element={<News />} />
            <Route path="/organization" element={<Organization />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Navigation />
          {allowedRoutes.includes(window.location.pathname) && <FloatingChatButton />}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
