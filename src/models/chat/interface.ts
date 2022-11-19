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

export interface IChat {
  items: IChatItem[];
  active?: number;
}
