import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getUserFromStorage, sendMessageToGemini, updateUserData, UserData } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import InterestSelector from '@/components/InterestSelector';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const ChatInterface: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState<'age' | 'weight' | 'height' | 'interests' | 'complete'>('age');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showInterestSelector, setShowInterestSelector] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const user = getUserFromStorage();
    if (user) {
      setUserData(user);
      
      setTimeout(() => {
        const initialMessage = "Zdravo " + user.firstName + "! Ja sam Smarty, tvoj lični ai asistent. Da bih ti pružio najbolje savete, potrebno je da mi odgovoriš na nekoliko pitanja. Koliko godina imaš?";
        setMessages([{ text: initialMessage, sender: 'bot' }]);
      }, 500);
    }
  }, []);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSend = async () => {
    if (input.trim() === '') return;
    
    const userMessage = { text: input, sender: 'user' as const };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    if (userData) {
      try {
        let updatedUserData = { ...userData };
        
        if (currentQuestion === 'age') {
          updatedUserData.age = input;
          updateUserData({ age: input });
          setCurrentQuestion('weight');
          setMessages(prev => [...prev, { text: "Koja je tvoja telesna masa?", sender: 'bot' }]);
        } else if (currentQuestion === 'weight') {
          updatedUserData.weight = input;
          updateUserData({ weight: input });
          setCurrentQuestion('height');
          setMessages(prev => [...prev, { text: "Koliko si visok?", sender: 'bot' }]);
        } else if (currentQuestion === 'height') {
          updatedUserData.height = input;
          updateUserData({ height: input });
          setCurrentQuestion('interests');
          setShowInterestSelector(true);
        }
        
        setUserData(updatedUserData);
        
      } catch (error) {
        console.error("Error processing message:", error);
        toast({
          title: "Greška",
          description: "Došlo je do greške prilikom obrade poruke. Pokušajte ponovo.",
          variant: "destructive"
        });
      }
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };
  
  const handleInterestsSelected = (selectedInterests: string[]) => {
    if (userData) {
      // Update user data with selected interests
      const updatedUserData = { ...userData, interests: selectedInterests };
      setUserData(updatedUserData);
      updateUserData({ interests: selectedInterests });
      
      // Hide interest selector
      setShowInterestSelector(false);
      setCurrentQuestion('complete');
      
      // Get response from DeepSeek AI (simulated)
      sendMessageToGemini("Odabrane oblasti", updatedUserData)
        .then(response => {
          setMessages(prev => [...prev, { text: response, sender: 'bot' }]);
          setTimeout(() => {
            navigate('/news');
          }, 2000);
        })
        .catch(error => {
          console.error("Error getting response:", error);
          toast({
            title: "Greška",
            description: "Došlo je do greške prilikom obrade podataka.",
            variant: "destructive"
          });
        });
    }
  };

  // This will ensure that input is enabled when interest selector is hidden
  const inputDisabled = showInterestSelector;

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] max-w-2xl mx-auto px-4">
      <div className="flex-1 overflow-y-auto py-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={message.sender === 'user' ? 'user-bubble' : 'bot-bubble'}>
              {message.text}
            </div>
          </div>
        ))}
        
        {/* Interest selector */}
        {showInterestSelector && (
          <div className="flex justify-start w-full">
            <div className="bot-bubble w-full max-w-full">
              <InterestSelector onInterestsSelected={handleInterestsSelected} />
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <div className="border-t border-white/10 p-4">
        <div className="flex space-x-2">
          <Input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Napiši poruku..." disabled={inputDisabled} className="flex-1" />
          <Button onClick={handleSend} disabled={inputDisabled || input.trim() === ''} className="bg-smarty-DEFAULT hover:bg-smarty-DEFAULT/90">
            Pošalji
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
