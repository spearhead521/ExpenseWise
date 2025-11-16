'use server';

import { getSmartExpenseInsights } from '@/ai/flows/smart-expense-insights';
import { MOCK_TRANSACTIONS, MOCK_CATEGORIES } from '@/lib/data';
import type { Transaction } from '@/types';

function formatTransactionHistory(transactions: Transaction[]): string {
  return transactions
    .slice(0, 20) // Limit to recent transactions for prompt brevity
    .map(
      (t) =>
        `${t.date}: ${t.title} - ${t.amount.toFixed(2)} (${t.type}) in ${
          t.category
        }`
    )
    .join('\n');
}

export async function getAIInsights() {
  try {
    const now = new Date();
    const currentMonth = now.getMonth();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const currentYear = now.getFullYear();

    const currentMonthExpenses = MOCK_TRANSACTIONS.filter((t) => {
      const tDate = new Date(t.date);
      return (
        t.type === 'expense' &&
        tDate.getMonth() === currentMonth &&
        tDate.getFullYear() === currentYear
      );
    }).reduce((acc, t) => acc + t.amount, 0);

    const lastMonthExpenses = MOCK_TRANSACTIONS.filter((t) => {
      const tDate = new Date(t.date);
      return (
        t.type === 'expense' &&
        tDate.getMonth() === lastMonth &&
        tDate.getFullYear() === (currentMonth === 0 ? currentYear - 1 : currentYear)
      );
    }).reduce((acc, t) => acc + t.amount, 0);

    const spendingByCategory: Record<string, number> = MOCK_TRANSACTIONS.filter(
      (t) => t.type === 'expense'
    ).reduce((acc, t) => {
      if (!acc[t.category]) {
        acc[t.category] = 0;
      }
      acc[t.category] += t.amount;
      return acc;
    }, {} as Record<string, number>);

    const transactionHistory = formatTransactionHistory(MOCK_TRANSACTIONS);
    const monthlyBudget = 50000;

    const insights = await getSmartExpenseInsights({
      transactionHistory,
      currentMonthExpenses,
      lastMonthExpenses,
      spendingByCategory,
      monthlyBudget,
    });

    return insights.insights;
  } catch (error) {
    console.error('Error getting AI insights:', error);
    return [
      'Could not generate insights at this time. Please try again later.',
    ];
  }
}
