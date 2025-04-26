
import { MessageCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from './ui/button';

const FloatingChatButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (location.pathname === '/chat') {
      navigate(-1);
    } else {
      navigate('/chat');
    }
  };

  return (
    <div className="relative">
      <Button onClick={handleClick} className="fixed bottom-20 right-4 rounded-full p-4 bg-[#33C3F0] hover:bg-[#33C3F0]/90 shadow-lg">
        <MessageCircle className="h-6 w-6"/>
      </Button>
      <div className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
        1
      </div>
    </div>
  );
};

export default FloatingChatButton;
