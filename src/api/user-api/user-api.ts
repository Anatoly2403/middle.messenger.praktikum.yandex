import { HttpClient } from '../../core/httpClient';
import { IPasswordData, IProfileData, ISigninData, ISignupData } from '../../models';

export class UserApi extends HttpClient {
  private url = 'https://ya-praktikum.tech/api/v2';

  public async signin<TResponseType = unknown>(data: ISigninData): Promise<TResponseType> {
    return this.post<TResponseType>(`${this.url}/auth/signin`, {
      data,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  public async signup<TResponseType = unknown>(data: ISignupData): Promise<TResponseType> {
    return this.post<TResponseType>(`${this.url}/auth/signup`, {
      data,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  public async info<TResponseType = unknown>(): Promise<TResponseType> {
    return this.get<TResponseType>(`${this.url}/auth/user`);
  }

  public async logout<TResponseType = unknown>(): Promise<TResponseType> {
    return this.post<TResponseType>(`${this.url}/auth/logout`);
  }

  public async updateData<TResponseType = unknown>(data: IProfileData): Promise<TResponseType> {
    return this.put<TResponseType>(`${this.url}/user/profile`, {
      data,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  public async updatePassword<TResponseType = unknown>(data: IPasswordData): Promise<TResponseType> {
    return this.put<TResponseType>(`${this.url}/user/password`, {
      data,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  public async updateAvatar<TResponseType = unknown>(data: FormData): Promise<TResponseType> {
    return this.put<TResponseType>(`${this.url}/user/profile/avatar`, {
      data,
    });
  }

  public async getUser<TResponseType = unknown>(login: string) {
    return this.post<TResponseType>(`${this.url}/user/search`, {
      data: { login },
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
