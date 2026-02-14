import { useState, useEffect } from 'react';
import { fetchUsers } from '../services/user';

import { type User, type UseUserResult } from '../types/user';

export const useGetUser = (): UseUserResult => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<User[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const abortController = new AbortController();

    const loadUsers = async () => {
      try {
        const users = await fetchUsers({ signal: abortController.signal });
        setData(users);
        setErrors([]);
      } catch (error) {
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

    loadUsers();

    return () => {
      abortController.abort();
    };
  }, []);

  return { loading, data, errors };
};
