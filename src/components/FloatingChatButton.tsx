
import { Circle } from 'lucide-react';
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
    <Button onClick={handleClick} className="fixed bottom-20 right-4 rounded-full p-4 bg-[#33C3F0] hover:bg-[#33C3F0]/90 shadow-lg">
      <Circle className="h-6 w-6"/>
    </Button>
  );
};

export default FloatingChatButton;
