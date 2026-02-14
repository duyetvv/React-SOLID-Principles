import { type User } from '../types/user';

export const fetchUsers = async ({ signal }: { signal: AbortSignal }): Promise<User[]> => {
  const response = await fetch('http://localhost:3000/api/v1/user', {
    signal,
  });

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
  }

  const result = await response.json();

  // Ensure data is an array
  return Array.isArray(result) ? result : result.data || [];
};
