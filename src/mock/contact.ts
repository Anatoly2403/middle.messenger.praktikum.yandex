import { IContact } from '../models';
import { message1, message2, message3, message4 } from './message';

export const contact1: IContact = {
  id: '0',
  lastName: 'lastName0',
  name: 'name0',
  phone: '1234',
  messages: [message4, message1],
};
export const contact2: IContact = {
  id: '1',
  lastName: 'lastName1',
  name: 'name1',
  phone: '1234',
  messages: [message2],
};
export const contact3: IContact = {
  id: '2',
  lastName: 'lastName2',
  name: 'name2',
  phone: '1234',
  messages: [message3],
};
export const contact4: IContact = {
  id: '3',
  lastName: 'lastName3',
  name: 'name3',
  phone: '1234',
  messages: [],
};

export const contacts = [contact1, contact2, contact3, contact4];
