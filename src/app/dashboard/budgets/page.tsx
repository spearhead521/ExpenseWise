'use client';

import { useState } from 'react';
import BudgetProgress from '@/components/dashboard/budget-progress';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';
import AddBudgetDialog from '@/components/dashboard/add-budget-dialog';
import { useBudget } from '@/context/budget-context';
import { useTransactions } from '@/context/transaction-context';

export default function BudgetsPage() {
  const [isMonthlyDialogOpen, setIsMonthlyDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);

  const { budget } = useBudget();
  const { transactions } = useTransactions();

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const categorySpending = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => {
      if (!acc[t.category]) {
        acc[t.category] = 0;
      }
      acc[t.category] += t.amount;
      return acc;
    }, {} as Record<string, number>);

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Budgets</h1>
            <p className="text-muted-foreground">
              Manage your monthly and category budgets.
            </p>
          </div>
          <Button onClick={() => setIsMonthlyDialogOpen(true)}>
            <PlusCircle className="mr-2" />
            Set Monthly Budget
          </Button>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">
            Overall Budget
          </h2>
          {budget.monthlyBudget > 0 ? (
            <BudgetProgress budget={budget.monthlyBudget} spent={totalExpenses} />
          ) : (
             <Card className="flex h-48 flex-col items-center justify-center">
                <CardContent className='p-6 text-center'>
                  <p className="text-muted-foreground mb-4">
                    You haven&apos;t set a monthly budget yet.
                  </p>
                  <Button onClick={() => setIsMonthlyDialogOpen(true)}>
                    <PlusCircle className="mr-2" />
                    Set Monthly Budget
                  </Button>
                </CardContent>
              </Card>
          )}
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">
            Category Budgets
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {budget.categoryBudgets.map((b) => (
              <Card key={b.category}>
                <CardHeader>
                  <CardTitle>{b.category}</CardTitle>
                  <CardDescription>
                    ₹{(categorySpending[b.category] || 0).toLocaleString()} / ₹
                    {b.amount.toLocaleString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <BudgetProgress
                    budget={b.amount}
                    spent={categorySpending[b.category] || 0}
                    showDescription={false}
                  />
                </CardContent>
              </Card>
            ))}
            <Card className="border-2 border-dashed">
              <CardContent className="flex h-full flex-col items-center justify-center p-6">
                <Button
                  variant="ghost"
                  onClick={() => setIsCategoryDialogOpen(true)}
                >
                  <PlusCircle className="mr-2" />
                  Add Category Budget
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <AddBudgetDialog
        isOpen={isMonthlyDialogOpen}
        onOpenChange={setIsMonthlyDialogOpen}
        type="monthly"
      />
      <AddBudgetDialog
        isOpen={isCategoryDialogOpen}
        onOpenChange={setIsCategoryDialogOpen}
        type="category"
      />
    </>
  );
}
