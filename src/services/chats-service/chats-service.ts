import { ChatApi } from '../../api';
import { IChatItem, isError } from './../../models';
import { store } from '../../store';
import { showError } from '../../core/error';

class ChatsService {
  private api = new ChatApi();

  constructor() {
    this.getAllChats = this.getAllChats.bind(this);
  }

  public async getAllChats(title = '') {
    try {
      const chats = await this.api.chats<IChatItem[]>(title);
      store.setState({ chats: { ...store.getState().chats, items: chats } });
    } catch (e) {
      if (isError(e)) showError(e.reason);
    }
  }

  public setActiveChat(id: number) {
    store.setState({ chats: { ...store.getState().chats, active: id } });
  }
}

type TChatsService = typeof ChatsService;
const chatsService = new ChatsService();

export { chatsService, TChatsService };
