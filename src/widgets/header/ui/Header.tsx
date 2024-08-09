import { FC, MouseEvent } from 'react';

import React, { useState } from 'react';
import styles from './Header.module.scss';
import { useUser } from 'features/auth/useUser';
import { dropDownIcon, logoIcon, seachIcon } from 'shared/assets/images';

export const Header: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const { user } = useUser();

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
        <div className={`${styles['logo-title']} ${styles['logo-title_mark']}`}>
          SOCIUM
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
        <span>{user.name}</span>
        <img src={dropDownIcon} alt="Dropdown Icon" />
        {menuOpen && (
          <div className={styles.dropdownMenu}>
            <button className={styles.menuItem}>Settings</button>
            <button className={styles.menuItem}>Log out</button>
          </div>
        )}
      </div>
    </header>
  );
};
