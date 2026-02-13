// src/dip/components/MenuList.tsx
import React from 'react';

import type { MenuService, Menu } from '../types';
import { useLoadData } from '../hooks/useLoadData';

interface MenuListProps {
  menuService: MenuService; // Depends on the abstraction!
}

const MenuList: React.FC<MenuListProps> = ({ menuService }) => {
  const { data: menus, loading, error } = useLoadData<Menu[]>(() => menuService.getMenus(), [menuService]);

  if (loading) return <p>Loading menus...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="menu-list-container">
      <h3>Menus</h3>
      <ul className="menu-list">
        {menus?.map(menu => (
          <li key={menu.id} className="menu-item">
            <strong>{menu.title}</strong> <small>({menu.path})</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuList;