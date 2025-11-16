'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';
import { getAIInsights } from '@/app/actions';
import { Skeleton } from '../ui/skeleton';

export default function AiInsights() {
  const [insights, setInsights] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInsights() {
      setLoading(true);
      const result = await getAIInsights();
      setInsights(result);
      setLoading(false);
    }
    fetchInsights();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="text-accent" />
          Smart Insights
        </CardTitle>
        <CardDescription>AI-powered analysis of your spending</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-4/5" />
            <Skeleton className="h-5 w-full" />
          </div>
        ) : (
          <ul className="space-y-3 text-sm">
            {insights.map((insight, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="mt-1 block h-2 w-2 shrink-0 rounded-full bg-primary" />
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
