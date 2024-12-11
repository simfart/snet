import { FC, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { buttonHoverAnimation } from 'shared/animations/animationSettings';
import { clearIcon, seachIcon } from 'shared/assets/images';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './SearchForm.module.scss';

interface SearchFormProps {
  selectedTagName?: string | null;
  searchTerm?: string | null;
}

export const SearchForm: FC<SearchFormProps> = ({
  selectedTagName = '',
  searchTerm = '',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState<string>(
    searchTerm || selectedTagName || '',
  );
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (selectedTagName) {
      setInputValue(`#${selectedTagName}`);
    } else if (selectedTagName === '') {
      setInputValue('');
    }
  }, [selectedTagName]);

  useEffect(() => {
    if (searchTerm) {
      setInputValue(searchTerm);
    }
  }, [searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      navigate(`/?search=${encodeURIComponent(inputValue.trim())}`, {
        replace: true,
      });
    }
  };

  const handleClear = () => {
    setInputValue('');
    if (location.pathname === '/') {
      navigate('/');
    }
  };
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    if (inputValue === '') {
      setIsFocused(false);
    }
  };

  useEffect(() => {
    if (inputValue === '') {
      setIsFocused(false);
    }
  }, [inputValue, searchTerm]);

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
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search..."
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
      {inputValue && (
        <motion.button
          type="button"
          onClick={handleClear}
          className={styles.clearButton}
          {...buttonHoverAnimation}
        >
          <img src={clearIcon} alt="Clear" />
        </motion.button>
      )}
    </motion.form>
  );
};
