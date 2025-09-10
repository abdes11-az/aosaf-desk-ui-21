import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight, Copy, Save, RotateCcw } from "lucide-react";
import { saveItem } from "@/utils/saveSystem";
import { sanitizeInput } from "@/utils/security";
import { useToast } from "@/hooks/use-toast";

interface FreeWritingPageProps {
  onBack: () => void;
}

const FreeWritingPage = ({ onBack }: FreeWritingPageProps) => {
  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const charCount = content.length;

  const handleSave = () => {
    const cleanContent = sanitizeInput(content);
    if (!cleanContent.trim()) {
      toast({
        title: "تحذير",
        description: "لا يمكن حفظ محتوى فارغ",
        variant: "destructive",
      });
      return;
    }

    const title = cleanContent.trim().substring(0, 50) + (cleanContent.length > 50 ? "..." : "");
    
    saveItem({
      id: Date.now().toString(),
      type: 'free-writing',
      title,
      description: cleanContent,
    });

    toast({
      title: "تم الحفظ",
      description: "تم حفظ المحتوى بنجاح",
    });
  };

  const handleCopy = async () => {
    const cleanContent = sanitizeInput(content);
    if (!cleanContent.trim()) {
      toast({
        title: "تحذير",
        description: "لا يوجد محتوى للنسخ",
        variant: "destructive",
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(cleanContent);
      toast({
        title: "تم النسخ",
        description: "تم نسخ المحتوى إلى الحافظة",
      });
    } catch (err) {
      toast({
        title: "خطأ",
        description: "فشل في نسخ المحتوى",
        variant: "destructive",
      });
    }
  };

  const handleClearAll = () => {
    setContent("");
    textareaRef.current?.focus();
    toast({
      title: "تم المسح",
      description: "تم مسح جميع المحتويات",
    });
  };

  return (
    <div className="page-content h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={onBack}
          className="touch-button bg-accent hover:bg-surface -mr-2"
        >
          <ChevronRight className="w-5 h-5 text-accent-foreground" />
        </button>
        <div className="flex items-center gap-2">
          <span className="text-2xl">✍️</span>
          <div>
            <h2 className="text-xl font-bold text-foreground">الكتابة الحرة</h2>
            <p className="text-muted-foreground text-sm">اكتب ما تريد بحرية</p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex gap-2 mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handleSave}
          className="flex-1"
        >
          <Save className="w-4 h-4 ml-1" />
          حفظ
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="flex-1"
        >
          <Copy className="w-4 h-4 ml-1" />
          نسخ
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleClearAll}
          className="flex-1"
        >
          <RotateCcw className="w-4 h-4 ml-1" />
          مسح الكل
        </Button>
      </div>

      {/* Stats */}
      <div className="flex gap-4 mb-4 text-sm text-muted-foreground">
        <span>الكلمات: {wordCount}</span>
        <span>الأحرف: {charCount}</span>
      </div>

      {/* Writing Area */}
      <div className="flex-1 relative">
        <Textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="ابدأ بالكتابة هنا..."
          className="w-full h-full resize-none border-card-border bg-background text-foreground placeholder:text-muted-foreground min-h-[400px] text-base leading-relaxed"
          style={{
            fontFamily: 'inherit',
            direction: 'rtl'
          }}
        />
      </div>
    </div>
  );
};

export default FreeWritingPage;