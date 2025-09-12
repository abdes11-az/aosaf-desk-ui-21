import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Copy, Eye } from "lucide-react";
import { getSavedDescriptions, deleteSavedDescription } from "@/utils/saveSystem";

interface SavedItem {
  id: string;
  type: 'car' | 'phone' | 'real-estate' | 'questions' | 'tenant' | 'free-writing' | 'tablet' | 'motorcycle' | 'clothing';
  title: string;
  description: string;
  data?: any;
  date?: string;
  savedAt: Date;
}

interface SavedPageProps {
  onViewItem: (item: SavedItem) => void;
}

const SavedPage = ({ onViewItem }: SavedPageProps) => {
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);

  const loadSavedItems = () => {
    const items = getSavedDescriptions();
    // تصفية الدراجات المحفوظة مسبقاً
    const filteredItems = items.filter(item => item.type !== 'bicycle') as SavedItem[];
    setSavedItems(filteredItems);
  };

  useEffect(() => {
    loadSavedItems();
  }, []);

  const handleDelete = (id: string) => {
    deleteSavedDescription(id);
    loadSavedItems();
  };

  const handleCopy = async (description: string) => {
    try {
      await navigator.clipboard.writeText(description);
      // يمكن إضافة toast notification هنا
      console.log('تم نسخ الوصف');
    } catch (err) {
      console.error('فشل في نسخ النص:', err);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'car': return '🚗';
      case 'phone': return '📱';
      case 'real-estate': return '🏠';
      case 'questions': return '❓';
      case 'tenant': return '📋';
      case 'free-writing': return '✍️';
      case 'tablet': return '📱';
      
      case 'motorcycle': return '🏍️';
      case 'clothing': return '👕';
      default: return '📄';
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'car': return 'سيارة';
      case 'phone': return 'هاتف';
      case 'real-estate': return 'عقار';
      case 'questions': return 'أسئلة';
      case 'tenant': return 'مستأجر';
      case 'free-writing': return 'كتابة حرة';
      case 'tablet': return 'تابلت';
      
      case 'motorcycle': return 'دراجة نارية';
      case 'clothing': return 'ملابس';
      default: return 'عام';
    }
  };

  const formatDate = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (savedItems.length === 0) {
    return (
      <div className="page-content text-center">
        <div className="mt-20">
          <div className="text-6xl mb-4">⭐</div>
          <h2 className="text-xl font-bold text-foreground mb-2">الأوصاف المحفوظة</h2>
          <p className="text-muted-foreground">لم تقم بحفظ أي أوصاف بعد</p>
          <p className="text-sm text-muted-foreground mt-2">قم بإنشاء وصف جديد واضغط على زر الحفظ لتجدها هنا</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">الأوصاف المحفوظة</h2>
        <p className="text-muted-foreground">جميع الأوصاف التي قمت بحفظها ({savedItems.length})</p>
      </div>
      
      <div className="space-y-4">
        {savedItems.map((item) => (
          <Card key={item.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{getTypeIcon(item.type)}</span>
                  <div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {getTypeName(item.type)}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(item.savedAt)}
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(item.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-lg p-3 mb-4 max-h-32 overflow-hidden relative">
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {item.description.substring(0, 200)}
                  {item.description.length > 200 && '...'}
                </p>
                {item.description.length > 200 && (
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-muted to-transparent" />
                )}
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onViewItem(item)}
                  className="flex-1"
                >
                  <Eye className="w-4 h-4 ml-1" />
                  عرض كامل
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy(item.description)}
                  className="flex-1"
                >
                  <Copy className="w-4 h-4 ml-1" />
                  نسخ
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SavedPage;