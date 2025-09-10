import { ChevronRight, Mail, MessageCircle, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ContactPageProps {
  onBack: () => void;
}

const ContactPage = ({ onBack }: ContactPageProps) => {
  const contactMethods = [
    {
      icon: Mail,
      title: "البريد الإلكتروني",
      description: "support@ausaf.app",
      action: "mailto:support@ausaf.app",
      actionText: "إرسال إيميل"
    },
    {
      icon: MessageCircle,
      title: "واتساب",
      description: "للدعم السريع والاستفسارات",
      action: "https://wa.me/1234567890",
      actionText: "فتح واتساب"
    },
    {
      icon: Phone,
      title: "الهاتف",
      description: "+966 50 123 4567",
      action: "tel:+966501234567",
      actionText: "اتصال"
    }
  ];

  return (
    <div className="page-content max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="touch-button bg-accent hover:bg-surface -mr-2"
        >
          <ChevronRight className="w-5 h-5 text-accent-foreground" />
        </button>
        <div className="flex items-center gap-2">
          <span className="text-2xl">📞</span>
          <div>
            <h2 className="text-xl font-bold text-foreground">اتصل بنا</h2>
            <p className="text-muted-foreground text-sm">نحن هنا لمساعدتك والإجابة على استفساراتك</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">كيف يمكننا مساعدتك؟</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed mb-4">
              فريق دعم تطبيق "أوصاف" مستعد لمساعدتك في أي استفسارات أو مشاكل قد تواجهها. 
              يمكنك التواصل معنا من خلال الطرق التالية:
            </p>
            
            <div className="space-y-4">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <div key={index} className="flex items-center gap-4 p-4 border border-border rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{method.title}</h3>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(method.action, '_blank')}
                    >
                      {method.actionText}
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">أوقات العمل</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-muted-foreground">
              <p>• الأحد - الخميس: 9:00 ص - 6:00 م</p>
              <p>• الجمعة - السبت: 10:00 ص - 4:00 م</p>
              <p>• نستجيب للرسائل خلال 24 ساعة</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">الأسئلة الشائعة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-foreground mb-1">كيف أحفظ أوصافي؟</h4>
                <p className="text-sm text-muted-foreground">بعد إنشاء الوصف، اضغط على زر "حفظ" وسيتم حفظ الوصف في قسم "الحفظ".</p>
              </div>
              
              <div>
                <h4 className="font-medium text-foreground mb-1">هل بياناتي آمنة؟</h4>
                <p className="text-sm text-muted-foreground">نعم، جميع بياناتك محفوظة محلياً على جهازك ولا يتم إرسالها لأي خادم خارجي.</p>
              </div>
              
              <div>
                <h4 className="font-medium text-foreground mb-1">كيف أغير مظهر التطبيق؟</h4>
                <p className="text-sm text-muted-foreground">يمكنك تغيير المظهر من الإعدادات واختيار المظهر الفاتح أو الداكن أو التلقائي.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactPage;