import { FC, useCallback } from 'react';
import { useCreatePost } from './useCreatePost';
import { Loader } from 'shared/ui';
import { createPostInputs } from 'shared/inputs/formInputs';
import { useForm } from 'shared/hooks/useForm';

export const CreatePostForm: FC = () => {
  const { handleChange, handleFocus, handleSubmit, values, getErrorClass } =
    useForm(createPostInputs);

  const { mutate, isLoading } = useCreatePost();

  const onSubmit = (formData: Record<string, string>) => {
    try {
      mutate({ description: formData.description, image: formData.image });
    } catch (err) {
      console.log(err);
    }
  };

  const renderInputs = useCallback(() => {
    return Object.entries(createPostInputs).map(([key, config]) => (
      <div key={key}>
        <label htmlFor={key}>{key}</label>
        <input
          id={key}
          name={key}
          type={config.type}
          value={values[key]}
          onChange={handleChange}
          onFocus={handleFocus}
          required={config.required}
          className={getErrorClass(key)}
          placeholder={key}
        />
      </div>
    ));
  }, [values, handleChange, handleFocus, getErrorClass]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {renderInputs()}
      <button type="submit">Create Post</button>
    </form>
  );
};
