export const initialDataAuth = {
  initial: {
    email: '',
    password: '',
    name: '',
    avatar: '',
    about: '',
  },
  placeholder: {
    email: 'E-Mail *',
    password: 'Password *',
    name: 'Name *',
    avatar: 'Avatar URL',
    about: 'About',
  },
  type: {
    email: 'email',
    password: 'password',
    name: 'text',
    avatar: 'url',
    about: 'text',
  },

  require: {
    email: true,
    password: true,
    name: true,
    avatar: false,
    about: false,
  },
  register: {
    name: true,
    avatar: true,
    about: true,
  },
  login: {
    email: true,
    password: true,
  },
} as const;
