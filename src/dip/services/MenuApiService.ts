import type { MenuService, Menu } from '../types';

export class MenuApiService implements MenuService {
  async getMenus(): Promise<Menu[]> {
    // Example: Fetching albums to simulate menus
    const response = await fetch('https://jsonplaceholder.typicode.com/albums');
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data.slice(0, 5).map((item: any) => ({ id: item.id, title: item.title, path: `/menu/${item.id}` }));
  }
}