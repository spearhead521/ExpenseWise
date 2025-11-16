
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useUser } from '@/context/user-context';
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

const proFeatures = [
  'Unlimited Budgets & Categories',
  'Advanced AI-Powered Insights',
  'Data Export to CSV/PDF',
  'Automatic Bank Sync (Coming Soon)',
  'Receipt Scanning (Coming Soon)',
];

export default function UpgradePage() {
  const { upgradeToPro } = useUser();
  const router = useRouter();

  const handleUpgrade = () => {
    upgradeToPro();
    router.push('/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">Upgrade to Pro</h1>
        <p className="text-muted-foreground">
          Unlock powerful features to take control of your finances.
        </p>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>ExpenseWise Pro</CardTitle>
          <CardDescription>
            All the features you need for smart financial management.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-3xl font-bold">
            ₹999 <span className="text-lg font-normal text-muted-foreground">/ year</span>
          </div>
          <ul className="space-y-2">
            {proFeatures.map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleUpgrade}>Upgrade Now</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
