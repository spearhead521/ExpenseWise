'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { SummaryCardData } from '@/types';
import { cn } from '@/lib/utils';

export default function SummaryCard({
  title,
  value,
  icon: Icon,
  isCurrency = false,
}: SummaryCardData) {
  const isNegative = value < 0;
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            'text-2xl font-bold',
            title === 'Balance' && isNegative ? 'text-destructive' : ''
          )}
        >
          {isCurrency && (
            <>
              {isNegative && '-'}
              ₹{Math.abs(value).toLocaleString()}
            </>
          )}
          {!isCurrency && value.toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );
}
