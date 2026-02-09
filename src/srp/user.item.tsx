import React from 'react';

import { type User } from './types/user';

import './styles/user-item.scss';

interface UserItemProps {
  user: User;
}

const UserItem: React.FC<UserItemProps> = ({ user }) => {
  return (
    <div className="user-item">
      <h3 className="user-item__name">{user.fullName}</h3>
      <p className="user-item__email">{user.email}</p>
    </div>
  );
};

export default UserItem;
