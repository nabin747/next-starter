import Link from 'next/link';
import { ArrowRight, Boxes, PanelsTopLeft, ShieldCheck, Sparkles, Timer } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { buildOrgJsonLd, buildPageJsonLd, buildSiteJsonLd } from '@/lib/seo';
import { getFeatureHighlights, getPerformanceMetrics } from '@/services/metrics';

export const revalidate = 60; // ISR for marketing content

export default async function Home() {
  const [metrics, features] = await Promise.all([getPerformanceMetrics(), getFeatureHighlights()]);

  const jsonLd = [
    buildOrgJsonLd(),
    buildSiteJsonLd(),
    buildPageJsonLd({
      title: 'Next Starter | Scalable Next.js 16 Architecture',
      description:
        'Production-ready Next.js 16 starter with ShadCN UI, Lucide icons, RSC, ISR, testing, SEO, and CI baked in.',
      path: '/',
    }),
  ];

  return (
    <div className="space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-white via-zinc-50 to-zinc-200 p-8 shadow-sm dark:from-zinc-900 dark:via-zinc-950 dark:to-black lg:p-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <Badge variant="secondary" className="w-fit">
              Next.js 16 • App Router • RSC + ISR
            </Badge>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Scalable, maintainable Next.js architecture for product teams.
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-300">
              Ship faster with opinionated defaults: ShadCN UI, Lucide icons, JWT-protected APIs,
              Zustand for client state, and CI/CD that enforces quality from day one.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/dashboard">
                  Open dashboard
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="https://nextjs.org/docs" target="_blank">
                  Next.js docs
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {metrics.map((metric) => (
                <Card
                  key={metric.label}
                  className="border-none bg-white/70 p-4 shadow-sm ring-1 ring-border/80 dark:bg-zinc-900/70"
                >
                  <div className="text-xs uppercase tracking-wide text-zinc-500">
                    {metric.label}
                  </div>
                  <div className="mt-1 text-2xl font-semibold">{metric.value}</div>
                  <div
                    className={`text-xs font-semibold ${
                      metric.positive ? 'text-emerald-600' : 'text-red-500'
                    }`}
                  >
                    {metric.change} vs last deploy
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br from-indigo-400/60 to-cyan-300/40 blur-3xl" />
            <div className="glass-panel relative overflow-hidden rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-3 border-b border-border/60 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-cyan-300">
                  <Sparkles className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <p className="text-sm font-semibold">React Server Components</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Stream HTML + hydrate only what you need.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4 text-sm text-zinc-700 dark:text-zinc-200">
                <div className="flex items-center gap-3 rounded-xl border border-border/80 bg-white/70 p-4 dark:bg-zinc-900/50">
                  <PanelsTopLeft className="h-5 w-5 text-indigo-600 dark:text-cyan-300" />
                  <div>
                    <p className="font-semibold">Layouts & templates</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Collocate routes in the <code>/app</code> directory with shared layouts.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-border/80 bg-white/70 p-4 dark:bg-zinc-900/50">
                  <Boxes className="h-5 w-5 text-indigo-600 dark:text-cyan-300" />
                  <div>
                    <p className="font-semibold">Edge-ready APIs</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      JWT validation + Zod input parsing under <code>/app/api</code>.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-border/80 bg-white/70 p-4 dark:bg-zinc-900/50">
                  <Timer className="h-5 w-5 text-indigo-600 dark:text-cyan-300" />
                  <div>
                    <p className="font-semibold">ISR + caching</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      SSG by default with <code>revalidate</code> hooks for data freshness.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3 rounded-xl border border-border/60 bg-gradient-to-r from-indigo-500/15 via-cyan-500/15 to-emerald-500/15 p-4 text-sm font-semibold text-indigo-800 dark:text-cyan-100">
                <ShieldCheck className="h-5 w-5" aria-hidden />
                Secure by default: strict CSP, JWT issuance, and input validation.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <Card key={feature.title}>
            <CardHeader>
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-cyan-300">
                <FeatureIcon name={feature.icon as FeatureIconName} />
              </div>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>
    </div>
  );
}

type FeatureIconName = 'rsc' | 'shield' | 'ui' | 'cicd';

function FeatureIcon({ name }: { name: FeatureIconName }) {
  switch (name) {
    case 'rsc':
      return <Sparkles className="h-5 w-5" aria-hidden />;
    case 'shield':
      return <ShieldCheck className="h-5 w-5" aria-hidden />;
    case 'ui':
      return <PanelsTopLeft className="h-5 w-5" aria-hidden />;
    case 'cicd':
    default:
      return <ArrowRight className="h-5 w-5" aria-hidden />;
  }
}
