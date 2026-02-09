import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface CategoryBadgesProps {
  categories: string[];
  availableCategories: string[];
  onCategoryChange: (categories: string[]) => void;
}

export const CategoryBadges: React.FC<CategoryBadgesProps> = ({ 
  categories, 
  availableCategories, 
  onCategoryChange 
}) => {
  const toggleCategory = (cat: string) => {
    const updated = categories.includes(cat)
      ? categories.filter(c => c !== cat)
      : [...categories, cat];
    onCategoryChange(updated);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {availableCategories.map((cat) => (
        <Badge
          key={cat}
          variant={categories.includes(cat) ? 'default' : 'outline'}
          className={cn(
            'px-4 py-2 rounded-full cursor-pointer transition-all border-slate-200',
            categories.includes(cat)
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-white text-slate-600 hover:bg-slate-50'
          )}
          onClick={() => toggleCategory(cat)}
        >
          {cat}
        </Badge>
      ))}
    </div>
  );
};
