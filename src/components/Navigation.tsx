
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getUserFromStorage, isLoggedIn } from '@/lib/utils';
import { User, BarChart2, Newspaper, Utensils, Calendar } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const [userInterests, setUserInterests] = useState<string[]>([]);
  const [loggedIn, setLoggedIn] = useState(false);
  
  useEffect(() => {
    setLoggedIn(isLoggedIn());
    const user = getUserFromStorage();
    if (user && user.interests) {
      setUserInterests(user.interests);
    }
  }, [location]); // Re-check when location changes
  
  // Don't show navigation if user is not logged in or on registration/login page
  if (!loggedIn || location.pathname === '/register' || location.pathname === '/login') {
    return null;
  }
  
  const navItems = [
    { name: 'Profile', path: '/profile', icon: <User size={24} />, showOnLogin: false },
    { name: 'Fitnes', path: '/fitness', icon: <BarChart2 size={24} /> },
    { name: 'Vesti', path: '/news', icon: <Newspaper size={24} /> },
    { name: 'Ishrana', path: '/nutrition', icon: <Utensils size={24} /> },
    { name: 'Organizacija', path: '/organization', icon: <Calendar size={24} /> },
  ];
  
  const filteredNavItems = [
    navItems[0], // Always include Profile first (but it won't show on login due to the condition above)
    ...navItems.filter(item => 
      userInterests.includes(item.name) && item.name !== 'Home'
    ).slice(0, 3) // Only take first 3 interest items
  ];
  
  return (
    <div className="fixed bottom-0 left-0 w-full bg-smarty-dark border-t border-white/10 glass-morphism z-50">
      <div className="flex justify-around items-center py-4">
        {filteredNavItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center ${
              location.pathname === item.path
                ? 'text-smarty-DEFAULT'
                : 'text-smarty-gray hover:text-smarty-light'
            }`}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
