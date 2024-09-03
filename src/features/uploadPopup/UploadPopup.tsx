import { Popup } from 'shared/components/popup';
import { FC } from 'react';
import { Button, Input } from 'shared/components';
import { useForm } from 'shared/hooks/useForm';
import { uploadInput } from 'shared/inputs/formInputs';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  setImage: (image: string) => void;
}

export const UploadPopup: FC<PopupProps> = ({ isOpen, onClose, setImage }) => {
  const { handleChange, handleFocus, handleSubmit, values, getErrorClass } =
    useForm(uploadInput);

  const onSubmit = () => {
    setImage(values.image);
    onClose();
  };

  return (
    <Popup isOpen={isOpen} onClose={onClose} variant="upload">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          name="image"
          onChange={handleChange}
          onFocus={handleFocus}
          placeholder="Paste image URL"
          value={values.image}
          className={getErrorClass('image')}
          required={uploadInput.image.required}
          type={uploadInput.image.type}
        />
        <Button label="Upload" type="submit" size="small" variant="upload" />
      </form>
    </Popup>
  );
};
