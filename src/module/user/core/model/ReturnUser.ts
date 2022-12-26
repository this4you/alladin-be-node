import { User } from './User';

export type ReturnUser = Omit<User, 'password'>;