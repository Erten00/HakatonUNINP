
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserFromStorage } from '@/lib/utils';
import ContentCard from '@/components/ContentCard';

const Fitness = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in and has selected this category
    const user = getUserFromStorage();
    if (!user) {
      navigate('/register');
      return;
    }
    
    if (!user.interests.includes('Fitnes')) {
      navigate('/chat');
    }
  }, [navigate]);
  
  const exercises = [
    { name: 'Sklekovi', sets: 3, reps: '10-15', description: 'Postavite ruke u širini ramena i spuštajte telo dok grudi ne dodirnu pod.', pic: 'https://training.fit/wp-content/uploads/2020/02/liegestuetze-800x448.png' },
    { name: 'Čučnjevi', sets: 4, reps: '12-15', description: 'Stojite uspravno sa nogama u širini ramena, spuštajte se dok kolena ne formiraju ugao od 90 stepeni.', pic: 'https://www.pngarts.com/files/11/Vector-Squat-PNG-High-Quality-Image.png' },
    { name: 'Trbušnjaci', sets: 3, reps: '15-20', description: 'Ležite na leđima sa savijenim kolenima, podignite gornji deo tela.', pic: 'https://training.fit/wp-content/uploads/2020/01/ausrollen-kurzhantel-gewichte-800x448.png'},
    { name: 'Istezanje leđa', sets: 2, reps: '30 sec', description: 'Ležite na stomaku, podignite gornji i donji deo tela istovremeno.', pic: 'https://e7.pngegg.com/pngimages/101/136/png-clipart-bent-over-row-barbell-exercise-weight-training-back-exercises-angle-physical-fitness.png' },
    
  ];
  
  return (
    <div className="min-h-screen bg-smarty-dark pt-6 pb-24">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-center text-smarty-DEFAULT mb-6">Fitnes Plan</h1>
        
        <div className="grid gap-6">
        <ContentCard title="Dnevni Plan Vežbanja" description="Optimizovan za vaše ciljeve">
          <div className="space-y-4">
            <p className="text-smarty-light">
              Redovno vežbanje je ključno za održavanje dobrog zdravlja i kondicije.
              Evo jednostavnog plana vežbanja koji možete raditi kod kuće bez dodatne opreme.
            </p>
            
            <div className="divide-y divide-white/10">
              {exercises.map((exercise, index) => (
                <div key={index} className="py-3">
                  <h3 className="font-semibold text-smarty-DEFAULT">{exercise.name}</h3>
                  <div className="flex justify-between text-sm mt-1">
                    <span>{exercise.sets} serije × {exercise.reps}</span>
                  </div>
                  
                  {/* Image for the exercise */}
                  {exercise.pic && (
                    <img src={exercise.pic} alt={exercise.name} className="mt-3 w-1/2" />
                  )}
                  
                  <p className="text-sm text-smarty-gray mt-1">{exercise.description}</p>
                </div>
              ))}
            </div>
          </div>
        </ContentCard>
          
          <ContentCard title="Motivacione Poruke">
            <div className="space-y-3">
              <p className="text-lg italic">"Ne odustajte od cilja zbog trenutnih poteškoća. Upornost uvek donosi rezultate."</p>
              <p className="text-lg italic">"Svaki trening vas približava boljoj verziji sebe."</p>
              <p className="text-lg italic">"Fokusirajte se na napredak, ne savršenstvo."</p>
            </div>
          </ContentCard>
        </div>
      </div>
    </div>
  );
};

export default Fitness;
