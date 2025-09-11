import { Loader2 } from "lucide-react";

const PageLoader = () => (
  <div className="page-content flex items-center justify-center min-h-[400px]">
    <div className="flex flex-col items-center gap-3">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
      <p className="text-muted-foreground">جاري التحميل...</p>
    </div>
  </div>
);

export default PageLoader;