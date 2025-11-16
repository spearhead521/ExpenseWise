'use client';
import Link from 'next/link';
import { Bell } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { MainNav } from '@/components/main-nav';
import { UserNav } from '@/components/user-nav';
import { ThemeToggle } from '@/components/theme-toggle';
import { Icons } from '@/components/icons';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useUser } from '@/context/user-context';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, upgradeToPro } = useUser();
  return (
    <div className="grid h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:flex md:flex-col">
        <div className="flex h-14 shrink-0 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Icons.logo className="h-6 w-6" />
            <span className="">ExpenseWise</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <ScrollArea className="flex-1 py-4">
          <MainNav />
        </ScrollArea>
        {!user.isPro && (
          <div className="mt-auto border-t p-4">
            <Card>
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full" onClick={upgradeToPro}>
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 shrink-0 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Icons.menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-0">
              <div className="flex h-14 items-center border-b px-4">
                <Link
                  href="/"
                  className="flex items-center gap-2 font-semibold"
                >
                  <Icons.logo className="h-6 w-6" />
                  <span className="">ExpenseWise</span>
                </Link>
              </div>
              <ScrollArea className="flex-1 py-4">
                <MainNav isMobile={true} />
              </ScrollArea>
              {!user.isPro && (
                <div className="mt-auto border-t p-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Upgrade to Pro</CardTitle>
                      <CardDescription>
                        Unlock all features and get unlimited access to our
                        support team.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={upgradeToPro}
                      >
                        Upgrade
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            {/* Can add a search bar here */}
          </div>
          <ThemeToggle />
          <UserNav />
        </header>
        <main className="flex-1 overflow-auto p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="h-full py-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
