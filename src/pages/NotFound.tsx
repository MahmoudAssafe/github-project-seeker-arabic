
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background" dir="rtl">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-medium mb-6">الصفحة غير موجودة</h2>
        <p className="text-muted-foreground mb-8">عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.</p>
        <Button asChild>
          <Link to="/" className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            العودة للصفحة الرئيسية
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
