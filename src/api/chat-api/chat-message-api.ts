import { BASE_WSS_URL } from '../constants';

type THandlers = {
  open: (e: Event) => void;
  close: (e: CloseEvent) => void;
  message: (e: MessageEvent) => void;
};

interface IPayload {
  content: string;
  type: string;
}

export class ChatMessageApi {
  private url = BASE_WSS_URL;
  private socket: WebSocket | null = null;

  private setOpenHandler(handler: (e: Event) => void) {
    if (!this.socket) return;
    this.socket.addEventListener('open', handler);
  }

  private setCloseHandler(handler: (e: CloseEvent) => void) {
    if (!this.socket) return;
    this.socket.addEventListener('close', handler);
  }

  private setMessageHandler(handler: (event: MessageEvent) => void) {
    if (!this.socket) return;
    this.socket.addEventListener('message', handler);
  }

  public close() {
    if (!this.socket) return;
    this.socket.close();
  }

  public init(data: { userId: number; chatId: number; token: string }) {
    if (this.socket) this.close();
    this.socket = new WebSocket(`${this.url}/${data.userId}/${data.chatId}/${data.token}`);
  }

  public send(payload: IPayload) {
    if (!this.socket) return;
    this.socket.send(JSON.stringify(payload));
  }

  public setHandlers(handlers: THandlers) {
    this.setOpenHandler(handlers.open);
    this.setCloseHandler(handlers.close);
    this.setMessageHandler(handlers.message);
  }
}
