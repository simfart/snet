import { FC, useMemo } from 'react';
import { IUser } from 'entities/user/model/userModel';

import styles from './Avatar.module.scss';
import { getRandomColor } from 'shared/utils';

interface AvatarProps {
  owner: IUser;
  variant?: 'profileAvatar' | 'postAvatar';
}

export const Avatar: FC<AvatarProps> = ({
  owner,
  variant = 'profileAvatar',
}) => {
  const initial = owner?.name ? owner.name.charAt(0).toUpperCase() : '?';
  const randomBackgroundColor = useMemo(() => getRandomColor(), []);

  return (
    <>
      {' '}
      {owner?.avatar ? (
        <img
          className={`${variant && styles[variant]}`}
          src={owner.avatar}
          alt="Author"
        />
      ) : (
        <div
          className={`${variant && styles[variant]}`}
          style={{ backgroundColor: randomBackgroundColor }}
        >
          {initial}
        </div>
      )}
    </>
  );
};
