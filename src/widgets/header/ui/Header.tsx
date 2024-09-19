import React, { FC, useEffect, useState } from 'react';
import { clearIcon, seachIcon } from 'shared/assets/images';
import { AnimatePresence, motion } from 'framer-motion';
import { buttonHoverAnimation } from 'shared/animations/animationSettings';
import { Loader } from 'shared/ui';
import { LogoItem } from 'shared/components';
import { useUser } from 'features/auth/useUser';
import { UserEditPopup } from 'features/userEditPopup';
import { Dropdown } from 'entities/dropdown';

import styles from './Header.module.scss';

interface HeaderProps {
  onSearchClick: (tagId: string) => void;
}

export const Header: FC<HeaderProps> = ({ onSearchClick }) => {
  const { user, isLoading: isLoadUser } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchClick(searchTerm);
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };
  const clearSearch = () => {
    onSearchClick('');
    setSearchTerm('');
  };

  useEffect(() => {
    if (searchTerm === '') {
      setIsFocused(false);
    }
  }, [searchTerm]);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    if (searchTerm === '') {
      setIsFocused(false);
    }
  };

  isLoadUser && <Loader />;

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <LogoItem />
        <motion.form
          className={styles.searchForm}
          onSubmit={handleSearchSubmit}
          initial={{ justifyContent: 'start' }}
          animate={
            isFocused
              ? { justifyContent: 'space-between', scale: 1.05 }
              : { justifyContent: 'start' }
          }
          transition={{ duration: 0.5 }}
        >
          <div className={styles.searchGroup}>
            <motion.button
              type="submit"
              className={styles.searchButton}
              {...buttonHoverAnimation}
            >
              <img src={seachIcon} alt={seachIcon} />
            </motion.button>
            <motion.input
              type="text"
              className={styles.searchInput}
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search"
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
          {isFocused && (
            <motion.button
              type="button"
              onClick={clearSearch}
              className={styles.clearButton}
              {...buttonHoverAnimation}
            >
              <img src={clearIcon} alt="Clear" />
            </motion.button>
          )}
        </motion.form>
        <Dropdown user={user} openPopup={openPopup} />

        <AnimatePresence>
          {isPopupOpen && (
            <UserEditPopup isOpen={isPopupOpen} onClose={closePopup} />
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
