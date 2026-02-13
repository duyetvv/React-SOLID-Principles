// src/dip/types/index.ts
export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Menu {
  id: number;
  title: string;
  path: string;
}

export interface UserService {
  getUsers(): Promise<User[]>;
}

export interface MenuService {
  getMenus(): Promise<Menu[]>;
}
