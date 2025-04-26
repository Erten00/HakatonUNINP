
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  // This component is no longer needed for redirection
  // as we're handling it directly in the App.tsx route configuration
  return null;
};

export default Index;
