// import { FC } from 'react';
// import { useForm } from 'features/userForm/ui';
// import { ICustomObject, IValues } from 'features/userForm/ui/userForm';

// const formInputs: ICustomObject = {
//   firstName: {
//     value: '',
//     required: true,
//     validators: [
//       (s: string) =>
//         !s.length ? 'Поле обязательно для заполнения' : undefined,
//       (s: string) => (s.length < 2 ? 'Минимальная длина строки 2' : undefined),
//       (s: string) => (s.length <= 2 ? 'А теперь 3' : undefined),
//       (s: string) =>
//         isNaN(parseInt(s)) || parseInt(s) < 2
//           ? 'Должна быть цифра, больше 1'
//           : undefined,
//     ],
//     label: 'First Name',
//   },
//   datetime: {
//     value: '',
//     type: 'date',
//     label: 'Birth Date',
//     validators: [
//       (s: string) =>
//         new Date(s).getUTCFullYear() > new Date().getUTCFullYear()
//           ? 'Год рождения не может быть больше текущего'
//           : undefined,
//     ],
//   },
//   lastName: {
//     value: '',
//     label: 'Last Name',
//   },
// };

// export const Profile: FC = () => {
//   const { fields, isValid, handleSubmit } = useForm(formInputs);
//   const { firstName, datetime, lastName } = fields;

//   const onSubmit = (values: IValues) => {
//     console.log(values, 'submit');
//   };

//   const formFields = [firstName, lastName, datetime];
//   return (
//     <>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         {formFields.map((field, index) => (
//           <div key={index}>
//             <input
//               type={field.type}
//               placeholder={field.label}
//               value={field.value}
//               onChange={field.setState}
//             />
//             <span>{field.touched && field.error}</span>
//           </div>
//         ))}
//         <div>
//           <button disabled={!isValid}>Send form</button>
//         </div>
//       </form>
//     </>
//   );
// };

import React from 'react';
import useForm from 'shared/ui/useForm';

export const Profile: React.FC = () => {
  const initialValues = {
    username: { value: '', required: true },
    email: { value: '', required: false }, // Пример поля, где не требуется заполнение
  };

  const { values, errors, handleChange, handleSubmit } = useForm(initialValues);

  const onSubmit = (formData: Record<string, string>) => {
    console.log('Form submitted successfully!', formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          value={values.username}
          onChange={handleChange}
          required
        />
        {errors.username && <span>{errors.username}</span>}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <span>{errors.email}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};
