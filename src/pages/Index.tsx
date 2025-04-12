
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ProjectCard } from "@/components/ProjectCard";

interface SearchFormValues {
  query: string;
}

interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  stargazers_count: number;
  language: string;
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const { toast } = useToast();
  
  const form = useForm<SearchFormValues>({
    defaultValues: {
      query: "",
    },
  });

  const onSubmit = async (values: SearchFormValues) => {
    if (!values.query.trim()) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال كلمات البحث",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(values.query)}`);
      const data = await response.json();
      
      if (response.ok) {
        setRepositories(data.items || []);
        if (data.items.length === 0) {
          toast({
            title: "لا توجد نتائج",
            description: "لم يتم العثور على مشاريع مطابقة لبحثك",
          });
        }
      } else {
        throw new Error(data.message || "حدث خطأ أثناء البحث");
      }
    } catch (error) {
      toast({
        title: "خطأ في البحث",
        description: error instanceof Error ? error.message : "حدث خطأ أثناء البحث، حاول مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <header className="bg-primary py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white text-center">باحث مشاريع GitHub</h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto mb-10 bg-card p-6 rounded-lg shadow-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="query"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium">ابحث عن مشاريع</FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input 
                          placeholder="أدخل اسم المشروع أو الكلمات المفتاحية..." 
                          className="flex-1" 
                          {...field} 
                        />
                        <Button type="submit" disabled={isLoading}>
                          {isLoading ? (
                            <span className="flex items-center gap-2">
                              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                              جاري البحث...
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              <Search className="h-4 w-4" />
                              بحث
                            </span>
                          )}
                        </Button>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        {repositories.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">نتائج البحث ({repositories.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {repositories.map((repo) => (
                <ProjectCard key={repo.id} repository={repo} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
