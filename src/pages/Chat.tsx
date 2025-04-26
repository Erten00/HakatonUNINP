
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatInterface from '@/components/ChatInterface';
import { getUserFromStorage } from '@/lib/utils';

const Chat = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const user = getUserFromStorage();

  }, [navigate]);
  
  return (
    <div className="min-h-screen bg-smarty-dark pt-6 pb-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-center text-smarty-DEFAULT mb-6">SMARTY</h1>
        <ChatInterface />
      </div>
    </div>
  );
};

export default Chat;
