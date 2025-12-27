import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonCardProps {
  className?: string;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({ className }) => {
  return (
    <div className={cn('bg-card rounded-lg overflow-hidden shadow-sm', className)}>
      <div className="aspect-[3/4] bg-muted animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-3 w-16 bg-muted rounded animate-pulse" />
        <div className="h-4 w-full bg-muted rounded animate-pulse" />
        <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
        <div className="flex items-center gap-2">
          <div className="h-4 w-12 bg-muted rounded animate-pulse" />
          <div className="h-3 w-8 bg-muted rounded animate-pulse" />
        </div>
        <div className="h-5 w-20 bg-muted rounded animate-pulse" />
      </div>
    </div>
  );
};

export default SkeletonCard;
