import ServiceCard from "@/components/ServiceCard";
import { useLanguage } from "@/contexts/LanguageContext";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const HomePage = ({ onNavigate }: HomePageProps) => {
  const { t } = useLanguage();
  
  const services = [
    {
      id: 'create-description',
      icon: '📝',
      title: t('home.create_description'),
      description: t('home.create_description_desc')
    },
    {
      id: 'free-writing',
      icon: '✍️',
      title: t('home.free_writing'),
      description: t('home.free_writing_desc')
    },
    {
      id: 'question-bank',
      icon: '❓',
      title: t('home.question_bank'),
      description: t('home.question_bank_desc'),
      categories: [
        { icon: '🚗', title: t('categories.cars'), id: 'cars' },
        { icon: '🏠', title: t('categories.real_estate'), id: 'real-estate' },
        { icon: '📱', title: t('categories.phones'), id: 'phones' }
      ]
    }
  ];

  return (
    <div className="page-content">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">{t('home.welcome')}</h2>
        <p className="text-muted-foreground">{t('home.choose_service')}</p>
      </div>
      
      <div className="space-y-4">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            icon={service.icon}
            title={service.title}
            description={service.description}
            onClick={() => onNavigate(service.id)}
          />
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <div className="bg-accent rounded-radius p-6">
          <h3 className="font-semibold text-accent-foreground mb-2">{t('home.tip')}</h3>
          <p className="text-sm text-muted-foreground">
            {t('home.tip_desc')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;