import { FC } from 'react';
import { Avatar } from 'shared/components';
import { IUser } from 'entities/user/model/userModel';
import styles from './ProfileHeader.module.scss';

interface IProfileHeader {
  user: IUser;
  variant: 'widget' | 'page';
}

export const ProfileHeader: FC<IProfileHeader> = ({ user, variant }) => {
  return (
    <div className={`${styles.profileHeader} ${styles[variant]}`}>
      <div className={styles.backdrop}></div>
      <Avatar
        owner={user}
        variant={variant == 'page' ? 'profilePage' : 'profileWidget'}
      />
      <div className={styles.profileInfo}>
        <h1>{user?.name}</h1>
        <span>{user?.about}</span>
      </div>
      <div className={styles.stat}>
        <div className={styles.statItem}>
          <div> 1,289</div>
          <span>Followers</span>
        </div>
        <div className={styles.statItem}>
          <div> 500</div>
          <span>Friends</span>
        </div>
      </div>
      <div className={styles.line}></div>
    </div>
  );
};
