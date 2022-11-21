import { ChatApi } from '../../api';
import { IChatItem, IChatUser, isError, IToken } from './../../models';
import { store } from '../../store';
import { showError } from '../../core/error';

class ChatsService {
  private api = new ChatApi();

  public async getToken(id: number) {
    try {
      const { token } = await this.api.getToken<IToken>(id);
      store.setState({ activeChatToken: token });
    } catch (e) {
      if (isError(e)) showError(e.reason);
    }
  }

  public getAllChats = async (title = '') => {
    try {
      const chats = await this.api.chats<IChatItem[]>(title);
      store.setState({ chats });
    } catch (e) {
      if (isError(e)) showError(e.reason);
    }
  };

  public async setActiveChat(id: number) {
    try {
      const users = await this.api.getChatUsers<IChatUser[]>(id);
      const activeChat = store.getState().chats.find((item) => item.id === id) || null;
      store.setState({ activeChat, messages: [], activeChatUsers: users });
    } catch (e) {
      if (isError(e)) showError(e.reason);
    }

    const activeChat = store.getState().chats.find((item) => item.id === id) || null;
    store.setState({ activeChat, messages: [] });
  }

  public async crateChat(title: string) {
    try {
      await this.api.create<IChatItem[]>(title);
      await this.getAllChats();
    } catch (e) {
      if (isError(e)) showError(e.reason);
    }
  }

  public async removeChat() {
    const id = store.getState().activeChat?.id;
    if (!id) return;
    try {
      await this.api.remove(id);
      await this.getAllChats();
      store.setState({
        activeChat: null,
        activeChatToken: null,
      });
    } catch (e) {
      if (isError(e)) showError(e.reason);
    }
  }

  public async addUserToChat(userId: number) {
    const chatId = store.getState().activeChat?.id;
    if (!chatId) return;
    try {
      await this.api.addUserToChat(userId, chatId);
      const users = await this.api.getChatUsers<IChatUser[]>(chatId);
      store.setState({ activeChatUsers: users, foundUsers: [] });
    } catch (e) {
      if (isError(e)) showError(e.reason);
    }
  }

  public async removeUserFromChat(userId: number) {
    const chatId = store.getState().activeChat?.id;
    if (!chatId) return;
    try {
      await this.api.removeUserFromChat(userId, chatId);
      const users = await this.api.getChatUsers<IChatUser[]>(chatId);
      store.setState({ activeChatUsers: users });
    } catch (e) {
      if (isError(e)) showError(e.reason);
    }
  }
}

type TChatsService = typeof ChatsService;
const chatsService = new ChatsService();

export { chatsService, TChatsService };
