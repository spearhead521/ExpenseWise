'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Lightbulb, Sparkles } from 'lucide-react';
import { getAIInsights } from '@/app/actions';
import { Skeleton } from '../ui/skeleton';
import { useUser } from '@/context/user-context';
import { Button } from '../ui/button';

export default function AiInsights() {
  const { user, upgradeToPro } = useUser();
  const [insights, setInsights] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInsights() {
      if (user.isPro) {
        setLoading(true);
        const result = await getAIInsights();
        setInsights(result);
        setLoading(false);
      }
    }
    fetchInsights();
  }, [user.isPro]);

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
        {!user.isPro ? (
          <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border-2 border-dashed bg-muted/50 p-8 text-center">
            <div className="rounded-full bg-primary/20 p-3">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <p className="font-semibold">Unlock Advanced AI Insights</p>
            <p className="text-sm text-muted-foreground">
              Upgrade to Pro to get personalized financial advice and trend
              analysis.
            </p>
            <Button onClick={upgradeToPro}>Upgrade to Pro</Button>
          </div>
        ) : loading ? (
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
