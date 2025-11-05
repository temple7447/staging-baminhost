import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface CardSkeletonProps {
  showHeader?: boolean;
  showDescription?: boolean;
  contentLines?: number;
  className?: string;
}

export const CardSkeleton = ({ 
  showHeader = true,
  showDescription = true,
  contentLines = 3,
  className = ""
}: CardSkeletonProps) => {
  return (
    <Card className={className}>
      {showHeader && (
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-48" />
          </CardTitle>
          {showDescription && (
            <CardDescription>
              <Skeleton className="h-4 w-64" />
            </CardDescription>
          )}
        </CardHeader>
      )}
      <CardContent className="space-y-3">
        {Array.from({ length: contentLines }).map((_, index) => (
          <Skeleton key={index} className="h-4 w-full" />
        ))}
      </CardContent>
    </Card>
  );
};