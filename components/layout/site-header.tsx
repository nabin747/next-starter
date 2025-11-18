import Link from 'next/link';
import { Rocket, Shield, Workflow } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-border/80 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 sm:px-8 lg:px-10">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <Rocket className="h-5 w-5 text-indigo-600 dark:text-cyan-300" aria-hidden />
          <span>Next Starter</span>
          <Badge variant="secondary" className="hidden sm:inline-flex">
            RSC + ISR
          </Badge>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-300 md:flex">
          <Link href="/dashboard" className="transition hover:text-foreground">
            Dashboard
          </Link>
          <Link href="/api/health" className="transition hover:text-foreground">
            Health API
          </Link>
          <Link
            href="https://nextjs.org/blog/next-16"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-full border border-border/70 px-3 py-1 text-xs font-semibold text-zinc-700 transition hover:border-foreground hover:text-foreground dark:text-zinc-200"
          >
            <Workflow className="h-4 w-4" aria-hidden />
            Next 16
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Badge variant="outline" className="hidden sm:inline-flex items-center gap-1">
            <Shield className="h-3.5 w-3.5" aria-hidden />
            JWT-secured APIs
          </Badge>
          <Button asChild size="sm">
            <Link href="/dashboard">Launch console</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
