export const loginInputs = {
  email: { value: '', required: true, type: 'email' },
  password: { value: '', required: true, type: 'password' },
};
export const registerInputs = {
  ...loginInputs,
  userName: { value: '', required: true, type: 'text' },
  avatar: { value: '', required: true, type: 'url' },
  about: { value: '', required: true, type: 'text' },
};

export const createPostInputs = {
  description: { value: '', required: true, type: 'text' },
  image: { value: '', required: false, type: 'url' },
};
