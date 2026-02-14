import { useState, useEffect } from 'react';

// A generic result type
export interface QueryResult<T> {
  loading: boolean;
  data: T | null;
  errors: string[];
}

// The fetcher function is an abstraction. The hook depends on this, not on a concrete implementation.
type Fetcher<T> = ({ signal }: { signal: AbortSignal }) => Promise<T>;

export const useQuery = <T>(fetcher: Fetcher<T>): QueryResult<T> => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<T | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const abortController = new AbortController();

    const loadData = async () => {
      try {
        setLoading(true);
        const result = await fetcher({ signal: abortController.signal });
        setData(result);
        setErrors([]);
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }

        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        setErrors([errorMessage]);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    loadData();

    return () => {
      abortController.abort();
    };
  }, [fetcher]); // Re-run effect if the fetcher function changes

  return { loading, data, errors };
};
