import { ChatMessageApi } from '../../api';
import { isArray } from './../../core/utils/guards';
import { store } from '../../store';
import { showError } from '../../core/error';
import { IMessage } from '../../models';

class MessageService {
  private api = new ChatMessageApi();

  private openHandler(e: Event) {
    if (!(e.target instanceof WebSocket)) return;
    e.target.send(JSON.stringify({ content: '0', type: 'get old' }));
  }

  private closeHandler(e: CloseEvent) {
    if (!e.wasClean) showError('Соединение прервано');
  }

  private messageHandler(e: MessageEvent) {
    const data: IMessage | IMessage[] = JSON.parse(e.data);
    let messages = [...store.getState().messages];
    if (isArray(data)) messages = [...messages, ...data];
    else messages = [...messages, data];
    store.setState({
      messages: messages.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()),
    });
  }

  private getConnectData() {
    const { activeChat, user, activeChatToken } = store.getState();
    if (!user || !activeChat || !activeChatToken) return;
    return { userId: user.id, chatId: activeChat.id, token: activeChatToken };
  }

  public init() {
    const data = this.getConnectData();
    if (!data) return;
    this.api.init(data);
    this.api.setHandlers({
      close: this.closeHandler,
      message: this.messageHandler,
      open: this.openHandler,
    });
  }

  public disconnect() {
    this.api.close();
  }

  public sendMessage(message: string) {
    this.api.send({ content: message, type: 'message' });
  }
}

type TChatsService = typeof MessageService;
const messageService = new MessageService();

export { messageService, TChatsService };
