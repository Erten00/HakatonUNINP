
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-smarty-dark">
      <div className="text-center max-w-md px-4">
        <h1 className="text-4xl font-bold text-smarty-DEFAULT mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-4">Stranica nije pronađena</h2>
        <p className="text-smarty-gray mb-6">
          Stranica koju tražite ne postoji ili je premeštena.
        </p>
        <Button 
          onClick={() => navigate('/')}
          className="bg-smarty-DEFAULT hover:bg-smarty-DEFAULT/90"
        >
          Povratak na početnu
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
