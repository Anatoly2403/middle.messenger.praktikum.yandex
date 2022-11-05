import { IUser } from '../models';
import { contact1, contact2, contact3, contact4 } from './contact';

export const user: IUser = {
  id: '0',
  data: {
    mail: 'mail',
    login: 'login',
    name: 'name',
    lastName: 'lastName',
    phone: 'phone',
    password: 'password',
    avatar: '',
  },
  contacts: [contact1, contact2, contact3, contact4],
};
