import { Suspense } from 'react';
import { ArrowUpRight, Database, ServerCog } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { getProjects, getRealtimeMetrics } from '@/services/projects';
import ClientCounter from './client-counter';

export const revalidate = 30; // ISR for dashboard data

export default async function DashboardPage() {
  const [projects, realtimeMetrics] = await Promise.all([getProjects(), getRealtimeMetrics()]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-zinc-500">Operational dashboard</p>
          <h1 className="text-3xl font-semibold tracking-tight">Edge + RSC delivery</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            ISR-backed content, server-rendered dashboards, client-side interactions via Zustand,
            and Lucide icons for clarity.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" asChild>
            <a href="/api/health" target="_blank" rel="noreferrer">
              Health check
              <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden />
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="https://github.com/shadcn/ui" target="_blank" rel="noreferrer">
              UI Kit
            </a>
          </Button>
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {realtimeMetrics.map((metric) => (
          <Card key={metric.key}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-zinc-500">{metric.label}</CardTitle>
              <Badge variant={metric.positive === false ? 'outline' : 'success'}>
                {metric.delta}
              </Badge>
            </CardHeader>
            <CardContent className="flex items-end justify-between pb-5">
              <div className="text-3xl font-semibold leading-none tracking-tight">
                {metric.value}
              </div>
              <Database className="h-5 w-5 text-indigo-600 dark:text-cyan-300" />
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Server-rendered projects</CardTitle>
            <CardDescription>
              Data is fetched in a React Server Component with ISR to keep content fresh without
              re-rendering client bundles.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between rounded-xl border border-border/70 bg-white/60 p-4 dark:bg-zinc-900/60"
              >
                <div>
                  <p className="text-sm font-semibold">{project.name}</p>
                  <p className="text-xs text-zinc-500">
                    Last deploy {project.lastDeployedAt} • {project.region}
                  </p>
                </div>
                <Badge variant={project.status === 'live' ? 'success' : 'outline'}>
                  {project.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle>Client-side interactivity</CardTitle>
            <CardDescription>
              Isolate stateful UX with Zustand. Hydrates only this island while the rest stays
              server-rendered.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<Skeleton className="h-28 w-full rounded-2xl" />}>
              <ClientCounter />
            </Suspense>
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-dashed border-border/70 bg-zinc-50 p-3 text-xs text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300">
              <ServerCog className="h-4 w-4 text-indigo-600 dark:text-cyan-300" aria-hidden />
              <span>
                Dynamic import ensures this widget ships separately for better code-splitting.
              </span>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
