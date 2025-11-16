'use client';
import { CreditCard, Activity } from 'lucide-react';
import SummaryCard from '@/components/dashboard/summary-card';
import BudgetProgress from '@/components/dashboard/budget-progress';
import CategoryChart from '@/components/dashboard/category-chart';
import RecentTransactions from '@/components/dashboard/recent-transactions';
import AiInsights from '@/components/dashboard/ai-insights';
import { useTransactions } from '@/context/transaction-context';
import { useBudget } from '@/context/budget-context';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
import AddBudgetDialog from '@/components/dashboard/add-budget-dialog';
import { Card, CardContent } from '@/components/ui/card';

export default function DashboardPage() {
  const { transactions } = useTransactions();
  const { budget } = useBudget();
  const [isBudgetDialogOpen, setIsBudgetDialogOpen] = useState(false);

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);
  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);
  const balance = totalIncome - totalExpenses;

  const summaryData = [
    {
      title: 'Total Income',
      value: totalIncome,
      icon: 'DollarSign' as const,
      isCurrency: true,
    },
    {
      title: 'Total Expenses',
      value: totalExpenses,
      icon: 'CreditCard' as const,
      isCurrency: true,
    },
    {
      title: 'Balance',
      value: balance,
      icon: 'Activity' as const,
      isCurrency: true,
    },
  ];
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {summaryData.map((data) => (
          <SummaryCard key={data.title} {...data} />
        ))}
      </div>
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
          {budget.monthlyBudget > 0 ? (
            <BudgetProgress
              budget={budget.monthlyBudget}
              spent={totalExpenses}
            />
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <p className="mb-4 text-muted-foreground">
                  Set a monthly budget to track your spending.
                </p>
                <Button onClick={() => setIsBudgetDialogOpen(true)}>
                  <PlusCircle className="mr-2" />
                  Set Monthly Budget
                </Button>
              </CardContent>
            </Card>
          )}
          <CategoryChart />
        </div>
        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
          <AiInsights />
          <RecentTransactions />
        </div>
      </div>
      <AddBudgetDialog
        isOpen={isBudgetDialogOpen}
        onOpenChange={setIsBudgetDialogOpen}
        type="monthly"
      />
    </>
  );
}
