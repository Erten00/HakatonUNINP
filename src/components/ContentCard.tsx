
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ContentCardProps {
  title: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
}

const ContentCard = ({ 
  title, 
  description, 
  className,
  children 
}: ContentCardProps) => {
  return (
    <Card className={cn("glass-morphism", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default ContentCard;
