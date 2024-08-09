import { FC } from 'react';

import React, { useState } from 'react';
import styles from './Header.module.scss';
import { logoIcon, seachIcon } from 'shared/assets/images';
import { Dropdown } from 'entities/menu';
import { motion } from 'framer-motion';
import {
  buttonHoverAnimation,
  formAnimation,
  inputFocusAnimation,
} from 'shared/animations/animationSettings';

export const Header: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search Term:', searchTerm);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={logoIcon} alt="Logo" />
        <div className={`${styles['logo-title']} ${styles['logo-title_mark']}`}>
          SOCIUM
        </div>
      </div>

      <motion.form
        className={styles.searchForm}
        onSubmit={handleSearchSubmit}
        {...formAnimation}
      >
        <motion.input
          type="text"
          className={styles.searchInput}
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search"
          {...inputFocusAnimation}
        />
        <motion.button
          type="submit"
          className={styles.searchButton}
          {...buttonHoverAnimation}
        >
          <img src={seachIcon} alt={seachIcon} />
        </motion.button>
      </motion.form>
      <Dropdown />
    </header>
  );
};
