import { FC, useState, useRef, MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { useOutsideClick } from 'shared/hooks';
import { deleteIcon, dropDownPostIcon } from 'shared/assets/images';
import {
  dropdownVariants,
  iconVariants,
  itemVariants,
  overlayVariants,
} from 'shared/animations/dropdownVariants';
import styles from './PostDropdown.module.scss';

interface PostDropdownProps {
  onDeleteClick: () => void;
}

export const PostDropdown: FC<PostDropdownProps> = ({ onDeleteClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsOpen((prevState) => !prevState);
  };

  const closeMenu = () => setIsOpen(false);

  useOutsideClick(dropdownRef, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  const postSettingsMenuItems = [
    {
      label: 'Delete Post',
      onClick: onDeleteClick,
    },
  ];

  return (
    <div className={styles.dropdown} onClick={toggleDropdown}>
      <motion.img
        src={dropDownPostIcon}
        alt="Dropdown Icon"
        animate={isOpen ? 'open' : 'closed'}
        variants={iconVariants}
      />
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial="closed"
          animate={isOpen ? 'open' : 'closed'}
          variants={overlayVariants}
          onClick={closeMenu}
        />
      )}
      <motion.div
        className={styles.dropdownMenu}
        ref={dropdownRef}
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        variants={dropdownVariants}
      >
        {postSettingsMenuItems.map((item, index) => (
          <motion.button
            key={index}
            onClick={item.onClick}
            className={styles.menuItem}
            variants={itemVariants}
            whileHover="hover"
            whileTap="tap"
          >
            {item.label}
            <img src={deleteIcon} alt="Delete icon" />
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};
