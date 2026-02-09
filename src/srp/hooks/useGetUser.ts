import { useState, useEffect } from 'react';

import { type User, type UseUserResult } from '../types/user';

export const useGetUser = (): UseUserResult => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<User[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    // AbortController: Modern way to cancel fetch requests
    // Preferred over isMounted pattern for better performance
    const abortController = new AbortController();

    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/user', {
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();

        // Ensure data is an array
        const users = Array.isArray(result) ? result : result.data || [];
        
        setData(users);
        setErrors([]);
      } catch (error) {
        // Ignore abort errors (component unmounted)
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }
        
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        setErrors([errorMessage]);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

    return () => {
      // Cleanup: Abort the fetch request when component unmounts
      abortController.abort();
    };
  }, []);

  return { loading, data, errors };
};
