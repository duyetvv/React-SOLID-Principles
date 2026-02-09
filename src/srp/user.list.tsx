import React from 'react';

import UserItem from './user.item';
import { type User } from './types/user';

import './styles/user-list.scss';

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div className="user-list">
      <h2 className="user-list__title">Users</h2>
      <div className="user-list__container">
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserList;
