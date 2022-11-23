export interface IMessage {
  id: number;
  user_id: number;
  chat_id: number;
  type: string;
  time: Date;
  content: string;
  is_read: boolean;
  file: File | null;
}
