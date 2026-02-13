import { useState, useEffect } from 'react';

export function useLoadData<T>(fetcher: () => Promise<T>, deps: any[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetcher();
        if (isMounted) setData(result);
      } catch (e) {
        if (isMounted) setError(e instanceof Error ? e.message : 'Failed to fetch data');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    load();
    return () => { isMounted = false; };
  }, deps);

  return { data, loading, error };
}