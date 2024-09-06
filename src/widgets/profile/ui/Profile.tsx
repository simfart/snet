import { useUser } from 'features/auth/useUser';
import { FC } from 'react';
import {
  instagramIcon,
  facebookIcon,
  twitterIcon,
  youtubeIcon,
} from 'shared/assets/images';

import styles from './Profile.module.scss';
import { Loader } from 'shared/ui';
import { Avatar } from 'shared/components';

export const Profile: FC = () => {
  const { user, isLoading } = useUser();
  isLoading && <Loader />;
  return (
    <div className={styles.profile}>
      <div className={styles.backdrop}></div>
      <Avatar owner={user} />
      <h1>{user?.name}</h1>
      <span>{user?.about}</span>
      <div className={styles.digit}>
        <div className={styles.digitItem}>
          <div> 1,289</div>
          <span>Followers</span>
        </div>
        <div className={styles.digitItem}>
          <div> 500</div>
          <span>Friends</span>
        </div>
      </div>
      <div className={styles.line}></div>
      <div className={styles.social}>
        <h2>Social Media Accounts</h2>
        <ul>
          <li>
            <a
              href="https://www.facebook.com/YourProfile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.srOnly}>Facebook</span>
              <img src={facebookIcon} alt="Facebook Icon" />
            </a>
          </li>
          <li>
            <a
              href="https://www.twitter.com/YourProfile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.srOnly}>Twitter</span>
              <img src={twitterIcon} alt="Twitter Icon" />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/YourProfile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.srOnly}>Instagram</span>
              <img src={instagramIcon} alt="Instagram Icon" />
            </a>
          </li>
          <li>
            <a
              href="https://youtube.com/YourProfile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.srOnly}>YouTube</span>
              <img src={youtubeIcon} alt="Youtube Icon" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
