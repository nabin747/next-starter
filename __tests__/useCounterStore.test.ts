import { act } from 'react';
import { useCounterStore } from '@/store/useCounterStore';

describe('useCounterStore', () => {
  beforeEach(() => {
    useCounterStore.setState({ count: 0 });
  });

  it('increments and resets', () => {
    act(() => {
      useCounterStore.getState().increment();
      useCounterStore.getState().increment(2);
    });

    expect(useCounterStore.getState().count).toBe(3);

    act(() => {
      useCounterStore.getState().reset();
    });

    expect(useCounterStore.getState().count).toBe(0);
  });
});
