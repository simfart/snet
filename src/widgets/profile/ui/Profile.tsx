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
import { ProfileHeader } from 'entities/profileHeader';

export const Profile: FC = () => {
  const { user, isLoading } = useUser();
  isLoading && <Loader />;
  const socialLinks = [
    {
      href: 'https://www.facebook.com/YourProfile',
      alt: 'Facebook Icon',
      icon: facebookIcon,
      label: 'Facebook',
    },
    {
      href: 'https://www.twitter.com/YourProfile',
      alt: 'Twitter Icon',
      icon: twitterIcon,
      label: 'Twitter',
    },
    {
      href: 'https://www.instagram.com/YourProfile',
      alt: 'Instagram Icon',
      icon: instagramIcon,
      label: 'Instagram',
    },
    {
      href: 'https://youtube.com/YourProfile',
      alt: 'YouTube Icon',
      icon: youtubeIcon,
      label: 'YouTube',
    },
  ];

  return (
    <div className={styles.profileContainer}>
      <ProfileHeader user={user} variant="widget" />
      <div className={styles.social}>
        <h2>Social Media Accounts</h2>
        <ul>
          {socialLinks.map((link, index) => (
            <li key={index}>
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                <span className={styles.srOnly}>{link.label}</span>
                <img src={link.icon} alt={link.alt} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
