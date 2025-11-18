import { cache } from 'react';
import { wait } from '@/lib/utils';

export type Project = {
  id: string;
  name: string;
  status: 'live' | 'preview' | 'draft';
  lastDeployedAt: string;
  region: string;
};

export type RealtimeMetric = {
  key: string;
  label: string;
  value: string;
  delta: string;
  positive?: boolean;
};

const baseProjects: Project[] = [
  {
    id: 'p1',
    name: 'Marketing site',
    status: 'live',
    lastDeployedAt: '2m ago',
    region: 'iad1',
  },
  {
    id: 'p2',
    name: 'Docs',
    status: 'preview',
    lastDeployedAt: '8m ago',
    region: 'fra1',
  },
  {
    id: 'p3',
    name: 'Design system',
    status: 'draft',
    lastDeployedAt: '1h ago',
    region: 'iad1',
  },
];

export const getProjects = cache(async () => {
  await wait(60);
  return baseProjects;
});

export const getRealtimeMetrics = cache(async (): Promise<RealtimeMetric[]> => {
  await wait(30);
  return [
    { key: 'requests', label: 'Requests/min', value: '12.4k', delta: '+4.3%', positive: true },
    { key: 'latency', label: 'P95 latency', value: '178ms', delta: '-6.1%', positive: true },
    { key: 'errors', label: 'Error rate', value: '0.14%', delta: '-1.2%', positive: true },
    { key: 'cache', label: 'Cache hit', value: '93%', delta: '+0.5%', positive: true },
  ];
});
