import { FC } from 'react';
import styles from './TabButtons.module.scss';

export const TabButtons: FC<{
  activeTab: 'posts' | 'album';
  setActiveTab: (tab: 'posts' | 'album') => void;
}> = ({ activeTab, setActiveTab }) => (
  <div className={styles.toggleButtons}>
    <button
      className={activeTab === 'posts' ? styles.active : ''}
      onClick={() => setActiveTab('posts')}
    >
      Posts
    </button>
    <button
      className={activeTab === 'album' ? styles.active : ''}
      onClick={() => setActiveTab('album')}
    >
      Album
    </button>
  </div>
);
