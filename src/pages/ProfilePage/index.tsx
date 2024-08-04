import { FC } from 'react';

import React, { useState, useEffect } from 'react';

// import { getUsers } from '@/shared/api/usersApi';
import { IUser } from 'entities/user/model/userModel';
import UserList from 'entities/user/components/UserList';

export const Profile: FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  // useEffect(() => {
  //     const fetchUsers = async () => {
  //         try {
  //             const response = await getUsers();
  //             setUsers(response.data);
  //         } catch (error) {
  //             console.error('Failed to fetch users:', error);
  //         }
  //     };

  //     fetchUsers();
  // }, []);

  return (
    <div>
      <h1>Users</h1>
      <UserList users={users} />
    </div>
  );
};
