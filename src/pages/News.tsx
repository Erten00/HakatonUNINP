
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserFromStorage } from '@/lib/utils';
import ContentCard from '@/components/ContentCard';

const News = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in and has selected this category
    const user = getUserFromStorage();
    if (!user) {
      navigate('/register');
      return;
    }
    
    if (!user.interests.includes('Vesti')) {
      navigate('/chat');
    }
  }, [navigate]);
  
  const healthNews = [
    {
      title: 'Nova istraživanja povezuju meditaciju i duži životni vek',
      summary: 'Studija sprovedena na 5000 ispitanika pokazala je da oni koji redovno meditiraju imaju bolje zdravstvene pokazatelje.',
      date: '25. April 2025.',
      category: 'Zdravlje'
    },
    {
      title: 'Otkriven novi pristup lečenju hroničnog umora',
      summary: 'Naučnici su razvili program koji kombinuje fizičku aktivnost, nutritivne smernice i tehnike za upravljanje stresom.',
      date: '23. April 2025.',
      category: 'Zdravlje'
    },
    {
      title: 'Značaj hidratacije za kognitivne funkcije',
      summary: 'Nova studija pokazuje da čak i blaga dehidracija može značajno uticati na sposobnost koncentracije i donošenja odluka.',
      date: '20. April 2025.',
      category: 'Zdravlje'
    }
  ];
  
  const techNews = [
    {
      title: 'Nova generacija AI asistenta uči o vašim zdravstvenim navikama',
      summary: 'Pametni asistenti poput SMARTY-ja koriste napredne algoritme za personalizaciju saveta na osnovu životnog stila korisnika.',
      date: '24. April 2025.',
      category: 'Tehnologija'
    },
    {
      title: 'Revolucionarni nosivi uređaji za praćenje zdravstvenog stanja',
      summary: 'Novi pametni sat može pratiti preko 20 različitih zdravstvenih parametara, uključujući nivo stresa i kvalitet sna.',
      date: '22. April 2025.',
      category: 'Tehnologija'
    },
    {
      title: 'Virtuelna stvarnost u službi zdravlja',
      summary: 'VR aplikacije za vežbanje i meditaciju postaju sve popularnije, omogućavajući korisnicima da vežbaju u virtuelnim okruženjima.',
      date: '19. April 2025.',
      category: 'Tehnologija'
    }
  ];
  
  return (
    <div className="min-h-screen bg-smarty-dark pt-6 pb-24">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-center text-smarty-DEFAULT mb-6">Najnovije Vesti</h1>
        
        <div className="grid gap-6">
          <ContentCard title="Zdravlje" description="Najnovije vesti iz sveta zdravlja">
            <div className="space-y-4">
              {healthNews.map((news, index) => (
                <div key={index} className="border-b border-white/10 last:border-0 pb-4 last:pb-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs bg-smarty-DEFAULT/20 text-smarty-DEFAULT px-2 py-1 rounded-full">
                      {news.category}
                    </span>
                    <span className="text-xs text-smarty-gray">{news.date}</span>
                  </div>
                  <h3 className="font-semibold text-smarty-light">{news.title}</h3>
                  <p className="text-sm text-smarty-gray mt-1">{news.summary}</p>
                </div>
              ))}
            </div>
          </ContentCard>
          
          <ContentCard title="Tehnologija" description="Inovacije u svetu tehnologije">
            <div className="space-y-4">
              {techNews.map((news, index) => (
                <div key={index} className="border-b border-white/10 last:border-0 pb-4 last:pb-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs bg-smarty-DEFAULT/20 text-smarty-DEFAULT px-2 py-1 rounded-full">
                      {news.category}
                    </span>
                    <span className="text-xs text-smarty-gray">{news.date}</span>
                  </div>
                  <h3 className="font-semibold text-smarty-light">{news.title}</h3>
                  <p className="text-sm text-smarty-gray mt-1">{news.summary}</p>
                </div>
              ))}
            </div>
          </ContentCard>
        </div>
      </div>
    </div>
  );
};

export default News;
