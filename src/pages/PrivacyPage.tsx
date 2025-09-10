import { ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PrivacyPageProps {
  onBack: () => void;
}

const PrivacyPage = ({ onBack }: PrivacyPageProps) => {
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
          <span className="text-2xl">🔒</span>
          <div>
            <h2 className="text-xl font-bold text-foreground">سياسة الخصوصية</h2>
            <p className="text-muted-foreground text-sm">كيف نحمي بياناتك الشخصية</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">1. جمع المعلومات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>نحن نجمع المعلومات التالية:</p>
              <p>• المعلومات التي تدخلها في نماذج إنشاء الأوصاف</p>
              <p>• معلومات الاستخدام والتفضيلات</p>
              <p>• بيانات الجهاز والتطبيق لتحسين الخدمة</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">2. استخدام المعلومات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>نستخدم المعلومات للأغراض التالية:</p>
              <p>• إنشاء الأوصاف المطلوبة</p>
              <p>• حفظ واسترجاع الأوصاف المحفوظة</p>
              <p>• تحسين جودة وأداء التطبيق</p>
              <p>• تقديم الدعم الفني عند الحاجة</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">3. حماية البيانات</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              نحن ملتزمون بحماية بياناتك الشخصية. يتم تخزين جميع البيانات محلياً على جهازك ولا يتم إرسالها إلى خوادم خارجية. 
              هذا يضمن أن معلوماتك تبقى خاصة وآمنة.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">4. التخزين المحلي</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              يستخدم التطبيق التخزين المحلي لحفظ الأوصاف والإعدادات على جهازك فقط. 
              يمكنك مسح هذه البيانات في أي وقت من خلال إعدادات التطبيق أو المتصفح.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">5. مشاركة المعلومات</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              نحن لا نشارك أو نبيع معلوماتك الشخصية مع أطراف ثالثة. 
              جميع البيانات تبقى خاصة بك ومحفوظة على جهازك فقط.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">6. حقوقك</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>لديك الحقوق التالية:</p>
              <p>• حذف جميع بياناتك المحفوظة</p>
              <p>• تصدير أوصافك المحفوظة</p>
              <p>• تعديل إعدادات الخصوصية</p>
              <p>• إيقاف استخدام التطبيق في أي وقت</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">7. تحديث السياسة</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              قد نقوم بتحديث هذه السياسة من وقت لآخر. سيتم إشعارك بأي تغييرات مهمة في سياسة الخصوصية.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPage;