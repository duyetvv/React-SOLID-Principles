import type { MenuService, Menu } from '../types';

export class MenuMockService implements MenuService {
  async getMenus(): Promise<Menu[]> {
    console.log('Fetching menus from MOCK service...');
    return Promise.resolve([
      { id: 1, title: 'Dashboard', path: '/dashboard' },
      { id: 2, title: 'Settings', path: '/settings' },
    ]);
  }
}