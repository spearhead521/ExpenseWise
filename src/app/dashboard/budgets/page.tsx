import BudgetProgress from '@/components/dashboard/budget-progress';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MOCK_CATEGORIES } from '@/lib/data';
import { PlusCircle } from 'lucide-react';

const categoryBudgets = [
  { category: 'Food', budget: 15000, spent: 10250 },
  { category: 'Shopping', budget: 10000, spent: 11500 },
  { category: 'Transport', budget: 5000, spent: 3500 },
  { category: 'Entertainment', budget: 5000, spent: 4000 },
];

export default function BudgetsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Budgets</h1>
          <p className="text-muted-foreground">
            Manage your monthly and category budgets.
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2" />
          Add New Budget
        </Button>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Overall Budget</h2>
        <BudgetProgress />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Category Budgets
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categoryBudgets.map((b) => (
            <Card key={b.category}>
              <CardHeader>
                <CardTitle>{b.category}</CardTitle>
                <CardDescription>
                  ₹{b.spent.toLocaleString()} / ₹{b.budget.toLocaleString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BudgetProgress
                  budget={b.budget}
                  spent={b.spent}
                  showDescription={false}
                />
              </CardContent>
            </Card>
          ))}
          <Card className="border-2 border-dashed">
            <CardContent className="flex h-full flex-col items-center justify-center p-6">
              <Button variant="ghost">
                <PlusCircle className="mr-2" />
                Add Category Budget
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

declare module '@/components/dashboard/budget-progress' {
    interface BudgetProgressProps {
        budget?: number,
        spent?: number,
        showDescription?: boolean
    }
}
