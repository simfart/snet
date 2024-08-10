import { FC } from 'react';
import { logoIcon } from 'shared/assets/images';

import styles from './LogoItem.module.scss';

export const LogoItem: FC = () => {
  return (
    <>
      <div className={styles.logo}>
        <img src={logoIcon} alt="Logo" />
        <div className={`${styles['logo-title']} ${styles['logo-title_mark']}`}>
          SOCIUM
        </div>
      </div>
    </>
  );
};
