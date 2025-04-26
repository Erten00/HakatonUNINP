
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Image } from 'lucide-react';
import { toast } from 'sonner';

interface ProfileImageProps {
  firstName: string;
  lastName: string;
  currentImage?: string;
  onImageChange: (image: string) => void;
}

const ProfileImage = ({ firstName, lastName, currentImage, onImageChange }: ProfileImageProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Slika mora biti manja od 5MB');
      return;
    }

    setIsUploading(true);
    try {
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
      
      onImageChange(base64);
      toast.success('Slika je uspešno promenjena');
    } catch (error) {
      toast.error('Greška prilikom promene slike');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Avatar className="w-32 h-32 border-4 border-smarty-DEFAULT">
        <AvatarImage src={currentImage} />
        <AvatarFallback className="text-2xl bg-smarty-DEFAULT text-white">
          {firstName[0]}{lastName[0]}
        </AvatarFallback>
      </Avatar>
      
      <div className="relative">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          id="profile-image-input"
          disabled={isUploading}
        />
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => document.getElementById('profile-image-input')?.click()}
          disabled={isUploading}
        >
          <Image className="h-4 w-4" />
          Promeni sliku
        </Button>
      </div>
    </div>
  );
};

export default ProfileImage;
