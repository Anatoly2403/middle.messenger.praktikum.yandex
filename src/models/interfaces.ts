export interface ISigninData {
  login: string;
  password: string;
}

export interface ISignupData extends ISigninData {
  first_name: string;
  second_name: string;
  email: string;
  phone: string;
}

export interface IUserData extends ISignupData {
  id: number;
  display_name: null | string;
  avatar: null | string;
}
