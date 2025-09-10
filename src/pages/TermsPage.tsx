import { ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TermsPageProps {
  onBack: () => void;
}

const TermsPage = ({ onBack }: TermsPageProps) => {
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
          <span className="text-2xl">📋</span>
          <div>
            <h2 className="text-xl font-bold text-foreground">الشروط والأحكام</h2>
            <p className="text-muted-foreground text-sm">شروط استخدام تطبيق أوصاف</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">1. القبول بالشروط</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              باستخدامك لتطبيق "أوصاف"، فإنك توافق على الالتزام بهذه الشروط والأحكام. 
              إذا لم توافق على أي من هذه الشروط، يرجى عدم استخدام التطبيق.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">2. وصف الخدمة</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              تطبيق "أوصاف" هو أداة لإنشاء أوصاف شاملة ومفصلة للسيارات والهواتف والعقارات وملفات المستأجرين. 
              يساعدك التطبيق في إنشاء أوصاف احترافية لأغراض البيع أو التأجير.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">3. استخدام التطبيق</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>• يُسمح باستخدام التطبيق للأغراض الشخصية والتجارية</p>
              <p>• يجب تقديم معلومات صحيحة ودقيقة عند إنشاء الأوصاف</p>
              <p>• لا يُسمح بنسخ أو توزيع التطبيق دون إذن</p>
              <p>• يُحظر استخدام التطبيق لأغراض غير قانونية</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">4. المسؤولية</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              لا نتحمل مسؤولية دقة المعلومات المدخلة من قبل المستخدمين أو أي أضرار قد تنتج عن استخدام التطبيق. 
              المستخدم مسؤول عن صحة ودقة المعلومات التي يدخلها.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">5. التعديلات</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              نحتفظ بالحق في تعديل هذه الشروط والأحكام في أي وقت. سيتم إشعار المستخدمين بأي تغييرات مهمة.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">6. اتصل بنا</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              إذا كان لديك أي استفسارات حول هذه الشروط والأحكام، يرجى التواصل معنا من خلال قسم "اتصل بنا" في التطبيق.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsPage;