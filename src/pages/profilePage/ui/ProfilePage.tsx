import { FC } from 'react';

import React, { useState, useEffect } from 'react';

import { IUser } from 'entities/user/model/userModel';
import UserList from 'entities/user/components/UserList';

export const ProfilePage: FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  return (
    <div>
      <h1>Users</h1>
      <UserList users={users} />
    </div>
  );
};
