
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserFromStorage } from '@/lib/utils';
import ContentCard from '@/components/ContentCard';
import { Utensils } from 'lucide-react';  // Added Utensils icon from lucide-react

const Nutrition = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in and has selected this category
    const user = getUserFromStorage();
    if (!user) {
      navigate('/register');
      return;
    }
    
    if (!user.interests.includes('Ishrana')) {
      navigate('/chat');
    }
  }, [navigate]);
  
  const meals = [
    { 
      name: 'Doručak', 
      calories: 450, 
      protein: 25,
      carbs: 45, 
      fat: 15,
      description: 'Ovsena kaša sa bademovim mlekom, bananama i orašastim plodovima.'
    },
    { 
      name: 'Ručak', 
      calories: 650, 
      protein: 35,
      carbs: 60, 
      fat: 20,
      description: 'Piletina sa integralnim pirinčem i mešanim povrćem.'
    },
    { 
      name: 'Užina', 
      calories: 200, 
      protein: 10,
      carbs: 15, 
      fat: 10,
      description: 'Grčki jogurt sa bobičastim voćem i medom.'
    },
    { 
      name: 'Večera', 
      calories: 500, 
      protein: 30,
      carbs: 35, 
      fat: 20,
      description: 'Pečena riba sa salatom i slatkim krompirom.'
    }
  ];
  
  const recipes = [
    {
      name: 'Proteinski Smoothie',
      ingredients: ['1 banana', '200ml bademovo mleko', '1 merica proteinskog praha', '1 kašika meda', 'Led po želji'],
      instructions: 'Sve sastojke sipati u blender i miksati dok se ne dobije glatka tekstura.'
    },
    {
      name: 'Salata sa Kinoom',
      ingredients: ['1 šolja kuvane kinoe', '1 avokado', '1 paradajz', '1/4 šolje maslina', 'Maslinovo ulje', 'Limunov sok'],
      instructions: 'Pomešati sve sastojke u činiji, začiniti maslinovim uljem i limunovim sokom.'
    }
  ];
  
  return (
    <div className="min-h-screen bg-smarty-dark pt-6 pb-24">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-6">
          <Utensils className="h-8 w-8 mr-3 text-smarty-DEFAULT" />
          <h1 className="text-3xl font-bold text-smarty-DEFAULT">Nutricionistički Plan Ishrane</h1>
        </div>
        
        <div className="grid gap-6">
          <ContentCard title="Dnevni Jelovnik" description="Balansiran plan obroka">
            <div className="space-y-4">
              <p className="text-smarty-light">
                Pravilna ishrana je ključna za održavanje energije i zdravlja.
                Evo predloga dnevnog jelovnika sa balansiranim makronutrijentima.
              </p>
              
              <div className="grid gap-4">
                {meals.map((meal, index) => (
                  <div key={index} className="border border-white/10 rounded-lg p-3">
                    <h3 className="font-semibold text-smarty-DEFAULT">{meal.name}</h3>
                    <p className="text-sm mt-1">{meal.description}</p>
                    <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
                      <div className="bg-secondary/50 p-2 rounded">
                        <div>Kalorije</div>
                        <div className="font-bold">{meal.calories} kcal</div>
                      </div>
                      <div className="bg-secondary/50 p-2 rounded">
                        <div>Proteini</div>
                        <div className="font-bold">{meal.protein}g</div>
                      </div>
                      <div className="bg-secondary/50 p-2 rounded">
                        <div>Ugljeni hid.</div>
                        <div className="font-bold">{meal.carbs}g</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ContentCard>
          
          <ContentCard title="Brzi Recepti">
            <div className="divide-y divide-white/10">
              {recipes.map((recipe, index) => (
                <div key={index} className="py-4">
                  <h3 className="font-semibold text-smarty-DEFAULT">{recipe.name}</h3>
                  
                  <div className="mt-2">
                    <h4 className="text-sm font-medium">Sastojci:</h4>
                    <ul className="list-disc list-inside text-sm text-smarty-gray">
                      {recipe.ingredients.map((ingredient, i) => (
                        <li key={i}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-2">
                    <h4 className="text-sm font-medium">Priprema:</h4>
                    <p className="text-sm text-smarty-gray">{recipe.instructions}</p>
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

export default Nutrition;

