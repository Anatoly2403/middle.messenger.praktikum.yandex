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

export interface IProfileData {
  display_name: string;
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface IUserData {
  id: number;
  display_name: null | string;
  avatar: null | string;
  status: null | string;
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface IPasswordData {
  oldPassword: string;
  newPassword: string;
}
