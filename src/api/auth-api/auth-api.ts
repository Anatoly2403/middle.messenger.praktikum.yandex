import { HttpClient } from '../../core/httpClient/HttpClient';
import { ISigninData, ISignupData } from '../../models';

export class AuthApi extends HttpClient {
  private url = 'https://ya-praktikum.tech/api/v2/auth';

  public async signin<TResponseType = unknown>(data: ISigninData): Promise<TResponseType> {
    return this.post<TResponseType>(`${this.url}/signin`, { data, headers: { 'Content-Type': 'application/json' } });
  }

  public async signup<TResponseType = unknown>(data: ISignupData): Promise<TResponseType> {
    return this.post<TResponseType>(`${this.url}/signup`, { data, headers: { 'Content-Type': 'application/json' } });
  }

  public async info<TResponseType = unknown>(): Promise<TResponseType> {
    return this.get<TResponseType>(`${this.url}/user`);
  }

  public async logout<TResponseType = unknown>(): Promise<TResponseType> {
    return this.post<TResponseType>(`${this.url}/logout`);
  }
}
