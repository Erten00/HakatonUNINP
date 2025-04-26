
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserFromStorage } from '@/lib/utils';
import ContentCard from '@/components/ContentCard';
import { CheckCircle2, Circle } from 'lucide-react';

const Organization = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in and has selected this category
    const user = getUserFromStorage();
    if (!user) {
      navigate('/register');
      return;
    }
    
    if (!user.interests.includes('Organizacija')) {
      navigate('/chat');
    }
  }, [navigate]);
  
  const dailyTasks = [
    { task: '30 minuta vežbanja', completed: true },
    { task: 'Pripremiti zdrav obrok', completed: true },
    { task: 'Meditacija 10 minuta', completed: false },
    { task: 'Pročitati poglavlje knjige', completed: false },
    { task: 'Popiti 2L vode', completed: false }
  ];
  
  const weeklyGoals = [
    { goal: 'Vežbati 4 puta nedeljno', progress: 50 },
    { goal: 'Meditirati svaki dan', progress: 70 },
    { goal: 'Pripremati zdrave obroke kod kuće', progress: 90 },
    { goal: 'Spavati 7-8 sati svaku noć', progress: 60 }
  ];
  
  const upcomingEvents = [
    { 
      title: 'Trening sa personalnim trenerom', 
      date: '26. April 2025.', 
      time: '18:00 - 19:00',
      location: 'Fitness centar Zdravlje'
    },
    { 
      title: 'Kontrola kod nutricioniste', 
      date: '28. April 2025.', 
      time: '14:30 - 15:15',
      location: 'Centar za nutricionizam'
    },
    { 
      title: 'Grupni trening joge', 
      date: '01. Maj 2025.', 
      time: '09:00 - 10:30',
      location: 'Park zdravlja'
    }
  ];
  
  return (
    <div className="min-h-screen bg-smarty-dark pt-6 pb-24">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-center text-smarty-DEFAULT mb-6">Organizacija</h1>
        
        <div className="grid gap-6">
          <ContentCard title="Dnevni Zadaci" description="Planiranje vaših aktivnosti">
            <div className="space-y-2">
              {dailyTasks.map((item, index) => (
                <div key={index} className="flex items-center py-2">
                  {item.completed ? (
                    <CheckCircle2 className="text-green-500 mr-3" size={20} />
                  ) : (
                    <Circle className="text-smarty-gray mr-3" size={20} />
                  )}
                  <span className={item.completed ? "line-through text-smarty-gray" : ""}>
                    {item.task}
                  </span>
                </div>
              ))}
            </div>
          </ContentCard>
          
          <ContentCard title="Nedeljni Ciljevi">
            <div className="space-y-4">
              {weeklyGoals.map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between">
                    <span>{item.goal}</span>
                    <span className="text-smarty-DEFAULT">{item.progress}%</span>
                  </div>
                  <div className="w-full bg-secondary/30 rounded-full h-2">
                    <div 
                      className="bg-smarty-DEFAULT h-2 rounded-full" 
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </ContentCard>
          
          <ContentCard title="Predstojeći Događaji">
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="border-b border-white/10 last:border-0 pb-4 last:pb-0">
                  <h3 className="font-semibold text-smarty-light">{event.title}</h3>
                  <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                    <div>
                      <p className="text-smarty-gray">Datum:</p>
                      <p>{event.date}</p>
                    </div>
                    <div>
                      <p className="text-smarty-gray">Vreme:</p>
                      <p>{event.time}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-smarty-gray">Lokacija:</p>
                      <p>{event.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ContentCard>
        </div>
      </div>
    </div>
  );
};

export default Organization;
