export interface User {
  id: string;
  name: string;
  email: string;
  [key: string]: any;
}

export interface UseUserResult {
  loading: boolean;
  data: User[];
  errors: string[];
}
