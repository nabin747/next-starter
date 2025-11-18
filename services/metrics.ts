import { cache } from 'react';
import { wait } from '@/lib/utils';

export type Metric = {
  label: string;
  value: string;
  change: string;
  positive?: boolean;
};

export type FeatureHighlight = {
  title: string;
  description: string;
  icon: string;
};

export const getPerformanceMetrics = cache(async (): Promise<Metric[]> => {
  await wait(40);
  return [
    { label: 'TTFB', value: '45ms', change: '-8%', positive: true },
    { label: 'LCP', value: '1.6s', change: '-12%', positive: true },
    { label: 'Error rate', value: '0.02%', change: '-3%', positive: true },
    { label: 'Build time', value: '38s', change: '-14%', positive: true },
  ];
});

export const getFeatureHighlights = cache(async (): Promise<FeatureHighlight[]> => {
  await wait(25);
  return [
    {
      title: 'RSC-first architecture',
      description: 'Streaming server components + selective hydration for fast TTI.',
      icon: 'rsc',
    },
    {
      title: 'Security by default',
      description: 'JWT-backed API routes with validation and sane middleware defaults.',
      icon: 'shield',
    },
    {
      title: 'Composable UI kit',
      description: 'ShadCN UI primitives themed with Tailwind 4 + Lucide icons.',
      icon: 'ui',
    },
    {
      title: 'Production CI/CD',
      description: 'GitHub Actions pipeline for linting, tests, coverage, and deploys.',
      icon: 'cicd',
    },
  ];
});
