import { FC, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Loader } from 'shared/ui';
import { LogoItem } from 'shared/components';
import { UserEditPopup } from 'features/userEditPopup';

import styles from './Header.module.scss';
import { HeaderDropdown } from 'entities/dropdown';
import { SearchForm } from 'features/searchForm';
import { useCurrentUser } from 'features/auth/useCurrentUser';

export const Header: FC<{ clearSelectedTag?: () => void }> = ({
  clearSelectedTag,
}) => {
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
        <SearchForm clearSelectedTag={clearSelectedTag} />
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
