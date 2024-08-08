import { FC, MouseEvent } from 'react';

import React, { useState } from 'react';
import styles from './Header.module.scss';
import { logoIcon, seachIcon } from 'shared/assets/icons';

export const Header: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search Term:', searchTerm);
  };

  const toggleMenu = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setMenuOpen((prevState) => !prevState);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={logoIcon} alt="Logo" />
        <div className={styles['logo-title']}>Social</div>
        <div className={`${styles['logo-title']} ${styles['logo-title_mark']}`}>
          Net
        </div>
      </div>

      <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
        <input
          type="text"
          className={styles.searchInput}
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search"
        />
        <button type="submit" className={styles.searchButton}>
          <img src={seachIcon} alt={seachIcon} />
        </button>
      </form>
      <div className={styles.profile} onClick={toggleMenu}>
        <span className={styles.username}>Пользователь</span>
        {menuOpen && (
          <div className={styles.dropdownMenu}>
            <button className={styles.menuItem}>Настройки</button>
            <button className={styles.menuItem}>Выйти</button>
          </div>
        )}
      </div>
    </header>
  );
};
