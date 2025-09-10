import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Copy, Save, Sparkles, Plus, Minus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { saveItem } from "@/utils/saveSystem";

interface RealEstateQuestionsPageProps {
  onBack: () => void;
}

const RealEstateQuestionsPage = ({ onBack }: RealEstateQuestionsPageProps) => {
  const { toast } = useToast();
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);

  const questionSections = [
    {
      title: "🏠 المعلومات الأساسية",
      questions: [
        "فين جا هاد العقار؟",
        "شنو نوع العقار؟",
        "شحال مساحة العقار؟",
        "شحال عدد الغرف؟",
        "في أي طابق؟",
        "واش العقار مزال نقي ولا خاص اصلاحات ضروري؟"
      ]
    },
    {
      title: "⚙️ المرافق والخدمات",
      questions: [
        "واش كاين شوفو و ماء ساخن؟",
        "شنو المرافق لي قريبة من العقار؟",
        "واش أسنسور موجود؟",
        "واش جيران محترمين شوية؟",
        "واش كاين شي موقف سيارات قريب؟"
      ]
    },
    {
      title: "💭 سبب البيع",
      questions: [
        "علاش باغي تبيع؟"
      ]
    },
    {
      title: "📋 معلومات المالك",
      questions: [
        "شكون هو المالك؟",
        "واش الأوراق القانونية سليمة؟",
        "شحال ثمن المطلوب؟",
        "واش الثمن فيه متنقص؟"
      ]
    }
  ];

  const toggleQuestion = (question: string) => {
    setSelectedQuestions(prev => {
      if (prev.includes(question)) {
        return prev.filter(q => q !== question);
      } else {
        return [...prev, question];
      }
    });
  };

  const generateText = () => {
    if (selectedQuestions.length === 0) {
      return "لم يتم اختيار أي أسئلة بعد. اضغط على علامة + بجانب الأسئلة لإضافتها.";
    }
    
    return selectedQuestions.join("\n\n");
  };

  const handleCopy = async () => {
    const text = generateText();
    if (text.includes("لم يتم اختيار")) {
      toast({
        title: "تنبيه",
        description: "يجب اختيار الأسئلة أولاً",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "تم النسخ بنجاح",
        description: "تم نسخ الأسئلة إلى الحافظة",
      });
    } catch (err) {
      toast({
        title: "خطأ في النسخ",
        description: "حدث خطأ أثناء نسخ النص",
        variant: "destructive",
      });
    }
  };

  const handleSave = () => {
    const text = generateText();
    if (text.includes("لم يتم اختيار")) {
      toast({
        title: "تنبيه",
        description: "يجب اختيار الأسئلة أولاً",
        variant: "destructive",
      });
      return;
    }

    const savedItem = {
      id: Date.now().toString(),
      title: "أسئلة العقارات",
      description: text,
      type: "questions" as const,
      date: new Date().toLocaleDateString("ar-SA")
    };

    saveItem(savedItem);
    toast({
      title: "تم الحفظ بنجاح",
      description: "تم حفظ الأسئلة في قائمة المحفوظات",
    });
  };

  const handleNewQuestions = () => {
    setSelectedQuestions([]);
    toast({
      title: "تم إعادة التعيين",
      description: "تم إلغاء اختيار جميع الأسئلة",
    });
  };

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
          <span className="text-2xl">🏠</span>
          <div>
            <h2 className="text-xl font-bold text-foreground">أسئلة العقارات</h2>
            <p className="text-muted-foreground text-sm">اختر الأسئلة التي تريد إضافتها</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {questionSections.map((section, sectionIndex) => (
          <Card key={sectionIndex}>
            <CardHeader>
              <CardTitle className="text-lg">{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {section.questions.map((question, questionIndex) => {
                  const isSelected = selectedQuestions.includes(question);
                  return (
                    <div
                      key={questionIndex}
                      className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-accent/20 transition-colors"
                    >
                      <button
                        onClick={() => toggleQuestion(question)}
                        className={`p-2 rounded-full transition-colors ${
                          isSelected
                            ? "bg-destructive text-destructive-foreground hover:bg-destructive/80"
                            : "bg-primary text-primary-foreground hover:bg-primary/80"
                        }`}
                      >
                        {isSelected ? (
                          <Minus className="w-4 h-4" />
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                      </button>
                      <span className="text-sm text-foreground flex-1">{question}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* النص المولد */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-lg">الأسئلة المختارة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted rounded-lg p-4 min-h-[120px]">
            <div className="whitespace-pre-line text-muted-foreground text-sm">
              {generateText()}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* أزرار التحكم */}
      <div className="flex gap-3 mt-6">
        <Button
          onClick={handleCopy}
          variant="outline"
          className="flex-1 flex items-center gap-2"
        >
          <Copy className="w-4 h-4" />
          نسخ
        </Button>
        <Button
          onClick={handleSave}
          variant="outline"
          className="flex-1 flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          حفظ
        </Button>
        <Button
          onClick={handleNewQuestions}
          className="flex-1 flex items-center gap-2 bg-primary hover:bg-primary-hover text-primary-foreground"
        >
          <Sparkles className="w-4 h-4" />
          أسئلة جديدة
        </Button>
      </div>
    </div>
  );
};

export default RealEstateQuestionsPage;