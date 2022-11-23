export interface IUser {
  first_name: string;
  second_name: string;
  avatar: string;
  email: string;
  login: string;
  phone: string;
}

export interface ILastMessage {
  user: IUser;
  time: Date;
  content: string;
}

export interface IChatItem {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: ILastMessage;
}

export interface INewChatItem {
  title: string;
  avatar: string;
  unread_count: number;
  last_message: ILastMessage;
}

export interface IToken {
  token: string;
}

export interface IChatUser {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  avatar: string;
  email: string;
  phone: string;
  role: string;
}
