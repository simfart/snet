import { FC, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { buttonHoverAnimation } from 'shared/animations/animationSettings';
import { clearIcon, seachIcon } from 'shared/assets/images';
import { useSearchStore } from '../model/useSearchStore';

import styles from './SearchForm.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';

export const SearchForm: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);

  const { setSearchTerm } = useSearchStore();

  const [localSearchTerm, setLocalSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (location.pathname !== '/') {
      navigate(`/?search=${localSearchTerm}`);
    } else {
      setSearchTerm(localSearchTerm);
    }
  };
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    if (localSearchTerm === '') {
      setIsFocused(false);
    }
  };

  const clearSearch = () => {
    setLocalSearchTerm('');
    setSearchTerm('');
  };

  useEffect(() => {
    if (localSearchTerm === '') {
      setIsFocused(false);
    }
  }, [localSearchTerm]);

  return (
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
          <img src={seachIcon} alt="Search" />
        </motion.button>
        <motion.input
          type="text"
          className={styles.searchInput}
          value={localSearchTerm}
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
  );
};
