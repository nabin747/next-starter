'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Dashboard render error:', error);
  }, [error]);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 py-10">
      <Card>
        <CardHeader className="flex flex-row items-center gap-3 space-y-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-200">
            <AlertTriangle className="h-5 w-5" aria-hidden />
          </div>
          <CardTitle className="text-lg">Something went wrong</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
          <p>We couldn&apos;t render the dashboard right now. You can try again or go home.</p>
          <div className="flex flex-wrap gap-3">
            <Button onClick={reset} className="inline-flex items-center gap-2">
              <RefreshCw className="h-4 w-4" aria-hidden />
              Retry
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Back to home</Link>
            </Button>
          </div>
          {error.digest ? (
            <p className="text-xs text-zinc-500">Error reference: {error.digest}</p>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
