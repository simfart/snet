export interface IUser {
  name: string;
  email: string;
  lastLogin: number;
  created: number;
  ___class: string;
  ownerId: string;
  'user-token': string;
  objectId: string;
  avatar: string;
  about: string;
}
// Интерфейс для создания нового пользователя (например, при регистрации)
export interface CreateUserInput {
  name: string;
  email: string;
  password: string; // Необходимо для регистрации, но не возвращается в User
}

// Интерфейс для обновления пользователя
export interface UpdateUserInput {
  name?: string;
  email?: string;
  avatarUrl?: string;
}
