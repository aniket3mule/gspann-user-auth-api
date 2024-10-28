import bcrypt from 'bcryptjs';

export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
}

let users: IUser[] = [];

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (enteredPassword: string, savedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(enteredPassword, savedPassword);
};

export const getUserByEmail = (email: string): IUser | undefined => {
  return users.find(user => user.email === email);
};

export const addUser = (user: IUser): void => {
  users.push(user);
};
