import { FC, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Loader } from 'shared/ui';
import { LogoItem } from 'shared/components';
import { UserEditPopup } from 'features/userEditPopup';

import styles from './Header.module.scss';
import { HeaderDropdown } from 'entities/dropdown';
import { useCurrentUser } from 'features/auth/useCurrentUser';
import { SearchForm } from 'features/searchForm';

interface HomeProps {
  selectedTagName?: string | null;
  searchTerm?: string | null;
}

export const Header: FC<HomeProps> = ({ selectedTagName, searchTerm }) => {
  const { user, isLoading: isLoadUser } = useCurrentUser();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  isLoadUser && <Loader />;

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <LogoItem />
        <SearchForm searchTerm={searchTerm} selectedTagName={selectedTagName} />
        <HeaderDropdown user={user} openPopup={openPopup} />
        <AnimatePresence>
          {isPopupOpen && (
            <UserEditPopup isOpen={isPopupOpen} onClose={closePopup} />
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
