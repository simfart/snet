import { ICustomObject } from '../ui/userForm';

export const formInputs: ICustomObject = {
  email: {
    value: '',
    required: true,
  },
  name: {
    value: '',
    required: true,
    validators: [
      (s: string) =>
        !s.length ? 'Поле обязательно для заполнения' : undefined,
      (s: string) => (s.length < 2 ? 'Минимальная длина строки 2' : undefined),
      (s: string) => (s.length <= 2 ? 'А теперь 3' : undefined),
      (s: string) =>
        isNaN(parseInt(s)) || parseInt(s) < 2
          ? 'Должна быть цифра, больше 1'
          : undefined,
    ],
    label: 'First Name',
  },
  datetime: {
    value: '',
    type: 'date',
    label: 'Birth Date',
    validators: [
      (s: string) =>
        new Date(s).getUTCFullYear() > new Date().getUTCFullYear()
          ? 'Год рождения не может быть больше текущего'
          : undefined,
    ],
  },
  lastName: {
    value: '',
    label: 'Last Name',
  },
};
