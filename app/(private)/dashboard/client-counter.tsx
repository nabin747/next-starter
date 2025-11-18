'use client';

import { useMemo } from 'react';
import { Flame, Minus, Plus, RotateCcw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCounterStore } from '@/store/useCounterStore';

export default function ClientCounter() {
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const reset = useCounterStore((state) => state.reset);

  const sentiment = useMemo(() => {
    if (count > 6) return 'traffic spike';
    if (count > 3) return 'healthy';
    return 'warming up';
  }, [count]);

  return (
    <Card className="border-dashed">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">Interaction widget</CardTitle>
        <Badge variant="secondary" className="flex items-center gap-1">
          <Flame className="h-4 w-4" aria-hidden />
          Zustand
        </Badge>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-center justify-between rounded-xl border border-border/70 bg-zinc-50 px-4 py-3 dark:bg-zinc-900">
          <div>
            <p className="text-xs uppercase tracking-wide text-zinc-500">Active sessions</p>
            <p className="text-3xl font-semibold">{count}</p>
          </div>
          <div className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-cyan-300">
            {sentiment}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => increment(-1)}>
            <Minus className="h-4 w-4" aria-hidden />
            <span className="sr-only">Decrease</span>
          </Button>
          <Button variant="default" className="flex-1" onClick={() => increment()}>
            <Plus className="mr-2 h-4 w-4" aria-hidden />
            Increment
          </Button>
          <Button variant="ghost" size="icon" onClick={() => reset()}>
            <RotateCcw className="h-4 w-4" aria-hidden />
            <span className="sr-only">Reset</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
