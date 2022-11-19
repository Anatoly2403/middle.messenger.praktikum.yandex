import { HttpClient } from '../../core/httpClient';

export class ChatApi extends HttpClient {
  private url = 'https://ya-praktikum.tech/api/v2';

  public async chats<TResponseType = unknown>(title = '') {
    return this.get<TResponseType>(`${this.url}/chats`, { data: { title } });
  }

  public async create<TResponseType = unknown>(title: string) {
    return this.post<TResponseType>(`${this.url}/chats`, {
      data: { title },
      headers: { 'Content-Type': 'application/json' },
    });
  }

  public async remove<TResponseType = unknown>(id: number) {
    return this.delete<TResponseType>(`${this.url}/chats`, {
      data: { chatId: id },
      headers: { 'Content-Type': 'application/json' },
    });
  }

  public async getToken<TResponseType = unknown>(id: number) {
    return this.post<TResponseType>(`${this.url}/chats/token/${id}`);
  }
}
