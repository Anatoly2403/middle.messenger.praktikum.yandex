import { HttpClient } from '../../core/httpClient/HttpClient';
import { ISigninData, ISignupData } from './interfaces';

class AuthApi extends HttpClient {
  private url = 'https://ya-praktikum.tech/api/v2/auth';

  public async signup(data: ISignupData) {
    return this.post(`${this.url}/signup`, { data, headers: { 'Content-Type': 'application/json' } })
      .then(({ response }) => JSON.parse(response))
      .catch(({ response }) => JSON.parse(response));
  }

  public async signin(data: ISigninData) {
    return this.post(`${this.url}/signin`, { data, headers: { 'Content-Type': 'application/json' } })
      .then((data) => data.response)
      .catch(({ response }) => {
        throw new Error(JSON.parse(response).reason);
      });
  }

  public async getUserInfo() {}

  public async logout() {}
}

const authApi = new AuthApi();

export { authApi };
