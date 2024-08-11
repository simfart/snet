import React from 'react';

import { IUser } from '../model/userModel';

import './UserProfile.model.scss';

interface UserProfileProps {
  user: IUser;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div className="user-profile">
      <img
        // src={user.avatarUrl || '/default-avatar.png'}
        // alt={getUserDisplayName(user)}
        className="avatar"
      />
      {/* <h2>{getUserDisplayName(user)}</h2> */}
      <p>{user.email}</p>
    </div>
  );
};
