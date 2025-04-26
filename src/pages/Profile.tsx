
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserFromStorage } from '@/lib/utils';
import ContentCard from '@/components/ContentCard';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { toast } from "sonner";
import ProfileImage from '@/components/ProfileImage';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  age?: string;
  weight?: string;
  height?: string;
  interests?: string[];
  profileImage?: string;
}

const Profile = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const userData = getUserFromStorage();
    if (userData) {
      setUser(userData);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('smarty_user');
    toast.success('Uspešno ste se odjavili');
    navigate('/login');
  };

  const handleImageChange = (image: string) => {
    if (user) {
      const updatedUser = { ...user, profileImage: image };
      localStorage.setItem('smarty_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-smarty-dark pb-24 pt-6 px-4">
      <div className="relative max-w-2xl mx-auto space-y-6">
        {/* Decorative background elements */}
        <div className="absolute -top-10 -right-20 w-40 h-40 bg-smarty-DEFAULT/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-20 w-40 h-40 bg-smarty-DEFAULT/20 rounded-full blur-3xl" />
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-center text-smarty-DEFAULT">Profil</h1>
          <Button 
            variant="destructive" 
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Odjavi se
          </Button>
        </div>

        <ContentCard title="" className="mb-6 overflow-visible">
          <ProfileImage
            firstName={user.firstName}
            lastName={user.lastName}
            currentImage={user.profileImage}
            onImageChange={handleImageChange}
          />
        </ContentCard>
        
        <ContentCard title="Lični podaci" className="mb-6 relative z-10 bg-opacity-80 backdrop-blur-lg">
          <div className="space-y-4">
            <div>
              <p className="text-muted-foreground">Ime i prezime</p>
              <p className="text-lg">{user.firstName} {user.lastName}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Email</p>
              <p className="text-lg">{user.email}</p>
            </div>
          </div>
        </ContentCard>

        <ContentCard title="Fizički podaci" className="mb-6 relative z-10 bg-opacity-80 backdrop-blur-lg">
          <div className="space-y-4">
            <div>
              <p className="text-muted-foreground">Godine</p>
              <p className="text-lg">{user.age || 'Nije uneto'}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Težina</p>
              <p className="text-lg">{user.weight ? `${user.weight} kg` : 'Nije uneto'}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Visina</p>
              <p className="text-lg">{user.height ? `${user.height} cm` : 'Nije uneto'}</p>
            </div>
          </div>
        </ContentCard>

        <ContentCard title="Interesovanja" className="relative z-10 bg-opacity-80 backdrop-blur-lg">
          <div className="flex flex-wrap gap-2">
            {user.interests?.map((interest) => (
              <span key={interest} className="px-3 py-1 rounded-full bg-secondary text-white">
                {interest}
              </span>
            ))}
          </div>
        </ContentCard>
      </div>
    </div>
  );
};

export default Profile;
