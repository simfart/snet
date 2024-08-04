import React from 'react';
import { IUser } from '../model/userModel';
import { UserProfile } from './UserProfile';

interface UserListProps {
  users: IUser[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div className="user-list">
      {users.map((user) => (
        <UserProfile key={user.ownerId} user={user} />
      ))}
    </div>
  );
};

export default UserList;
