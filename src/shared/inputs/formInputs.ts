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

export const editUserInputs = {
  name: { value: '', required: true, type: 'text' },
  avatar: { value: '', required: false, type: 'url' },
  about: { value: '', required: true, type: 'text' },
};

export const uploadInput = {
  image: { value: '', required: true, type: 'url' },
};
