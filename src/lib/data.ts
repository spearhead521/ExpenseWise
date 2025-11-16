import type { Category, Transaction } from '@/types';

export const MOCK_CATEGORIES: Category[] = [
  { id: 'cat1', name: 'Food', icon: 'pizza', color: 'hsl(var(--chart-1))' },
  { id: 'cat2', name: 'Transport', icon: 'bus', color: 'hsl(var(--chart-2))' },
  {
    id: 'cat3',
    name: 'Shopping',
    icon: 'shopping-bag',
    color: 'hsl(var(--chart-3))',
  },
  {
    id: 'cat4',
    name: 'Entertainment',
    icon: 'popcorn',
    color: 'hsl(var(--chart-4))',
  },
  { id: 'cat5', name: 'Bills', icon: 'file-text', color: 'hsl(var(--chart-5))' },
  {
    id: 'cat6',
    name: 'Health',
    icon: 'heart-pulse',
    color: 'hsl(var(--chart-1))',
  },
  { id: 'cat7', name: 'Salary', icon: 'briefcase', color: 'hsl(var(--chart-2))' },
];

export const MOCK_TRANSACTIONS: Transaction[] = [];
