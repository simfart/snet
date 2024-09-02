import { Popup } from 'entities/popup';
import { FC } from 'react';
import { Input } from 'shared/components';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UploadPopup: FC<PopupProps> = ({ isOpen, onClose }) => {
  const handleChange = () => {};
  const handleFocus = () => {};
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <form action="">
        <Input
          onChange={handleChange}
          onFocus={handleFocus}
          placeholder="images url"
          value=""
        />
      </form>
    </Popup>
  );
};
