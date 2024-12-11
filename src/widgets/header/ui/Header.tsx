import { FC, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useCurrentUser } from 'entities/user/hooks';
import { UserEditPopup } from 'features/userEditPopup';
import { SearchForm } from 'features/searchForm';
import { HeaderDropdown } from 'features/headerDropdown';
import { Loader } from 'shared/ui';
import { LogoItem } from 'shared/components';
import styles from './Header.module.scss';

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
