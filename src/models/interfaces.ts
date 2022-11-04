import { EMessageContentType, EMessageStatus, EMessageType } from './enums';

export interface IMessage {
  id: string;
  type: EMessageType;
  createdAt: Date;
  content: string;
  contentType: EMessageContentType;
  status: EMessageStatus;
}

export interface IContact {
  id: string;
  name: string;
  avatar?: string;
  lastName: string;
  phone: string;
  messages: IMessage[];
}

export interface IPersonalData {
  mail: string;
  login: string;
  name: string;
  lastName: string;
  phone: string;
  password: string;
  avatar?: string;
}

export interface IUser {
  id: string;
  data: IPersonalData;
  contacts: IContact[];
}
