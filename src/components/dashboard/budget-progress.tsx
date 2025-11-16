import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function BudgetProgress({
  budget = 50000,
  spent = 28750,
  showDescription = true,
}: {
  budget?: number;
  spent?: number;
  showDescription?: boolean;
}) {
  const progress = (spent / budget) * 100;
  const remaining = budget - spent;

  const cardContent = (
    <>
      {showDescription && (
        <CardHeader>
          <CardTitle>Monthly Budget</CardTitle>
          <CardDescription>
            You&apos;ve spent{' '}
            <span className="font-semibold text-primary">
              {progress.toFixed(0)}%
            </span>{' '}
            of your budget this month.
          </CardDescription>
        </CardHeader>
      )}
      <CardContent>
        <Progress value={progress} aria-label={`${progress.toFixed(0)}% spent`} />
      </CardContent>
      <CardFooter className="flex justify-between text-sm">
        <span>Spent: ₹{spent.toLocaleString()}</span>
        <span className="text-muted-foreground">
          Remaining: ₹{remaining.toLocaleString()}
        </span>
      </CardFooter>
    </>
  );

  return showDescription ? <Card>{cardContent}</Card> : cardContent;
}
