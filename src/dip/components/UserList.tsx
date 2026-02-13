// src/dip/components/UserList.tsx
import React from 'react';

import type { UserService, User } from '../types';
import { useLoadData } from '../hooks/useLoadData';

interface UserListProps {
  userService: UserService; // Depends on the abstraction!
}

const UserList: React.FC<UserListProps> = ({ userService }) => {
  const { data: users, loading, error } = useLoadData<User[]>(() => userService.getUsers(), [userService]);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="user-list-container">
      <h3>Users</h3>
      <ul className="user-list">
        {users?.map(user => (
          <li key={user.id} className="user-item">
            <strong>{user.name}</strong> ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
