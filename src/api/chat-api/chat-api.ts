import { HttpClient } from '../../core/httpClient';

export class ChatApi extends HttpClient {
  private url = 'https://ya-praktikum.tech/api/v2';

  public async chats<TResponseType = unknown>(title = '') {
    return this.get<TResponseType>(`${this.url}/chats`, { data: { title } });
  }
}
