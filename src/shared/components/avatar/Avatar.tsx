import { FC, useMemo } from 'react';
import { IUser } from 'entities/user/model/userModel';
import { getRandomColor } from 'shared/utils';
import { useNavigate } from 'react-router-dom';
import styles from './Avatar.module.scss';

interface AvatarProps {
  owner: IUser;
  variant?: 'profileWidget' | 'postAvatar' | 'profilePage';
}

export const Avatar: FC<AvatarProps> = ({
  owner,
  variant = 'profileWidget',
}) => {
  const initial = owner?.name ? owner.name.charAt(0).toUpperCase() : '?';
  const randomBackgroundColor = useMemo(() => getRandomColor(), []);
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    navigate(`/profile/${owner.objectId}`);
  };

  return (
    <>
      {' '}
      {owner?.avatar ? (
        <img
          className={`${variant && styles[variant]}`}
          src={owner.avatar}
          onClick={handleAvatarClick}
          alt="Author"
        />
      ) : (
        <div
          className={`${variant && styles[variant]}`}
          style={{ backgroundColor: randomBackgroundColor }}
          onClick={handleAvatarClick}
        >
          {initial}
        </div>
      )}
    </>
  );
};
