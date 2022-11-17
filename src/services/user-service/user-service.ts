import { AuthApi } from '../../api/auth-api';
import { redirect } from './../../core/router';
import { isError, ISigninData, ISignupData, IUserData } from '../../models';
import { store } from '../../store';
import { showError } from '../../core/error';

class UserService {
  private api = new AuthApi();

  public async login(data: ISigninData) {
    try {
      await this.api.signin(data);
      await this.getUserData();
      redirect('/');
    } catch (e) {
      if (isError(e)) showError(e.reason);
    }
  }

  public async signup(data: ISignupData) {
    try {
      await this.api.signup<IUserData>(data);
      await this.getUserData();
      redirect('/');
    } catch (e) {
      if (isError(e)) showError(e.reason);
    }
  }

  public async logout() {
    try {
      await this.api.logout();
      store.setState({ user: null });
      redirect('/login');
    } catch (e) {
      if (isError(e)) showError(e.reason);
    }
  }

  public async getUserData() {
    const userInfo = await this.api.info<IUserData>();
    store.setState({ user: userInfo });
  }
}

type TUserService = typeof UserService;
const userService = new UserService();

export { userService, TUserService };

// some@some.com
// Some
// Some
// Some
// 79011111111
// Some111some
