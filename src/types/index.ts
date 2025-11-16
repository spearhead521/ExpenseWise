export type Transaction = {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string; // ISO string
  paymentMode: 'Cash' | 'UPI' | 'Card';
  notes?: string;
};

export type Category = {
  id: string;
  name: string;
  icon: string; // lucide-react icon name
  color: string; // tailwind color class
};

export type SummaryCardData = {
  title: string;
  value: number;
  icon: string;
  isCurrency?: boolean;
};
