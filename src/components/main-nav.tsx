'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  FileText,
  Settings,
  Badge,
  Package,
  LineChart,
  Wallet,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Icons } from './icons';

interface MainNavProps {
  isMobile?: boolean;
}

const navItems = [
  { href: '/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/dashboard/transactions', icon: FileText, label: 'Transactions' },
  { href: '/dashboard/budgets', icon: Wallet, label: 'Budgets' },
  { href: '/dashboard/reports', icon: LineChart, label: 'Reports' },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
];

export function MainNav({ isMobile = false }: MainNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        'grid items-start gap-2 px-2 text-sm font-medium lg:px-4',
        isMobile && 'gap-4 text-base p-4'
      )}
    >
      {navItems.map(({ href, icon: Icon, label }) => (
        <Link
          key={label}
          href={href}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
            pathname === href && 'bg-muted text-primary'
          )}
        >
          <Icon className="h-4 w-4" />
          {label}
        </Link>
      ))}
    </nav>
  );
}
