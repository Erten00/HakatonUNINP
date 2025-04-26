
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getUserFromStorage } from '@/lib/utils';
import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LogoImage from '@/assets/LogoS(Plava).png';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialTab = location.state?.activeTab || "login";
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  
  useEffect(() => {
    // Check if user is already logged in
    const user = getUserFromStorage();
  }, [navigate]);

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-smarty-dark">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 to-transparent opacity-20"></div>
      
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[-1]">
        <div className="w-96 h-96 bg-smarty-DEFAULT/30 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 animate-fade-in flex flex-col items-center">
        <img 
          src={LogoImage} 
          alt="SMARTY Logo" 
          className="mb-8 w-48 h-48 object-contain"
        />
        
        <Tabs defaultValue={initialTab} value={activeTab} onValueChange={setActiveTab} className="w-[350px] max-w-[90vw]">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="login">Prijavi se</TabsTrigger>
            <TabsTrigger value="register">Registruj se</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          <TabsContent value="register">
            <RegisterForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;

