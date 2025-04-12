
import { Star } from "lucide-react";

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

interface ProjectCardProps {
  repository: Repository;
}

export function ProjectCard({ repository }: ProjectCardProps) {
  return (
    <div className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <img 
            src={repository.owner.avatar_url} 
            alt={repository.owner.login}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-bold truncate">{repository.name}</h3>
            <p className="text-sm text-muted-foreground">{repository.owner.login}</p>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 h-10">
          {repository.description || "لا يوجد وصف"}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="text-sm">{repository.stargazers_count}</span>
          </div>
          
          {repository.language && (
            <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
              {repository.language}
            </span>
          )}
        </div>
      </div>
      
      <a
        href={repository.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full bg-primary text-primary-foreground text-center py-2 hover:bg-primary/90 transition-colors"
      >
        عرض المشروع
      </a>
    </div>
  );
}
