
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface InterestSelectorProps {
  onInterestsSelected: (interests: string[]) => void;
}

const InterestSelector: React.FC<InterestSelectorProps> = ({ onInterestsSelected }) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  
  const interests = [
    { name: 'Fitnes', emoji: '🏋️‍♂️' },
    { name: 'Ishrana', emoji: '🥗' },
    { name: 'Vesti', emoji: '📰' },
    { name: 'Sport', emoji: '⚽' },
    { name: 'Organizacija', emoji: '📅' }
  ];
  
  const handleToggle = (interest: string) => {
    setSelectedInterests(prev => {
      if (prev.includes(interest)) {
        return prev.filter(i => i !== interest);
      } else {
        if (prev.length < 3) {
          return [...prev, interest];
        }
        return prev;
      }
    });
  };
  
  const handleSubmit = () => {
    if (selectedInterests.length === 3) {
      onInterestsSelected(selectedInterests);
    }
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Odaberi 3 oblasti koje te najviše zanimaju:</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {interests.map((interest) => (
          <Button key={interest.name} onClick={() => handleToggle(interest.name)} variant={selectedInterests.includes(interest.name) ? "default" : "outline"} className={selectedInterests.includes(interest.name) ? "bg-smarty-DEFAULT hover:bg-smarty-DEFAULT/90" : ""}>
            <span className="mr-2">{interest.emoji}</span>
            {interest.name}
          </Button>
        ))}
      </div>
      
      <div className="pt-2">
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedInterests.map(interest => (
            <Badge key={interest} className="bg-smarty-DEFAULT">
              {interests.find(i => i.name === interest)?.emoji} {interest}
            </Badge>
          ))}
        </div>
        
        <Button onClick={handleSubmit} disabled={selectedInterests.length !== 3} className="w-full bg-smarty-DEFAULT hover:bg-smarty-DEFAULT/90">
          Potvrdi ({selectedInterests.length}/3)
        </Button>
      </div>
    </div>
  );
};

export default InterestSelector;
