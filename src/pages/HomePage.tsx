import ServiceCard from "@/components/ServiceCard";


interface HomePageProps {
  onNavigate: (page: string) => void;
}

const HomePage = ({ onNavigate }: HomePageProps) => {
  const services = [
    {
      id: 'create-description',
      icon: '📝',
      title: 'كتابة الأوصاف',
      description: 'اكتب وصف مفصل ومحترف للمنتج'
    },
    {
      id: 'free-writing',
      icon: '✍️',
      title: 'الكتابة الحرة',
      description: 'اكتب وحرر النصوص بسهولة مع إمكانية الحفظ والنسخ'
    },
    {
      id: 'question-bank',
      icon: '❓',
      title: 'بنك الأسئلة',
      description: 'تصفح الأسئلة الشائعة حسب الفئة',
      categories: [
        { icon: '🚗', title: 'سيارات', id: 'cars' },
        { icon: '🏠', title: 'عقارات', id: 'real-estate' },
        { icon: '📱', title: 'هواتف', id: 'phones' }
      ]
    }
  ];

  return (
    <div className="page-content">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">أهلاً وسهلاً</h2>
        <p className="text-muted-foreground">اختر الخدمة التي تريدها من القائمة</p>
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
          <h3 className="font-semibold text-accent-foreground mb-2">نصيحة</h3>
          <p className="text-sm text-muted-foreground">
            استخدم خدمة كتابة الأوصاف للحصول على أوصاف احترافية ومقنعة لمنتجاتك
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;