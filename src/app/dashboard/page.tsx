'use client';

import { DollarSign, CreditCard, Activity } from 'lucide-react';
import SummaryCard from '@/components/dashboard/summary-card';
import BudgetProgress from '@/components/dashboard/budget-progress';
import CategoryChart from '@/components/dashboard/category-chart';
import RecentTransactions from '@/components/dashboard/recent-transactions';
import AiInsights from '@/components/dashboard/ai-insights';
import { MOCK_TRANSACTIONS } from '@/lib/data';

export default function DashboardPage() {
  const totalIncome = MOCK_TRANSACTIONS.filter(
    (t) => t.type === 'income'
  ).reduce((acc, t) => acc + t.amount, 0);
  const totalExpenses = MOCK_TRANSACTIONS.filter(
    (t) => t.type === 'expense'
  ).reduce((acc, t) => acc + t.amount, 0);
  const balance = totalIncome - totalExpenses;

  const summaryData = [
    {
      title: 'Total Income',
      value: totalIncome,
      icon: 'DollarSign',
      isCurrency: true,
    },
    {
      title: 'Total Expenses',
      value: totalExpenses,
      icon: 'CreditCard',
      isCurrency: true,
    },
    {
      title: 'Balance',
      value: balance,
      icon: 'Activity',
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
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
          <BudgetProgress />
          <CategoryChart />
        </div>
        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
          <AiInsights />
          <RecentTransactions />
        </div>
      </div>
    </>
  );
}