export enum EMessageContentType {
  TEXT = 'text',
  IMAGE = 'image',
  FILE = 'file',
  LOCATION = 'location',
}

export enum EMessageType {
  IN = 'in',
  OUT = 'out',
}

export interface TMessage {
  id: string;
  type: EMessageType;
  createdAt: Date;
  content: string;
  contentType: EMessageContentType;
}

export interface TContact {
  id: string;
  name: string;
  lastName: string;
  phone: string;
  messages: TMessage[];
}

export interface TUser {
  id: string;
  mail: string;
  login: string;
  name: string;
  lastName: string;
  phone: string;
  password: string;
  avatar?: string;
  contacts: TContact[];
}
