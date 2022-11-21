const regExps = {
  NAME: /^[A-ZА-Я]+[a-zа-яA-ZА-Я]+([-]?)+[a-zа-яA-ZА-Я]+/,
  LOGIN: /(\d?)+([-|_]?)+[a-zA-z]+([-|_]?)+[a-zA-z]+(\d?)+/,
  EMAIL: /^[\w]+@([\d]?|[a-z]+\.)+[\w-]{2,4}$/,
  PASSWORD: /^(?=.*\d)(?=.*[A-Z])\w{8,40}$/i,
  PHONE: /^\+?\d{10,15}$/,
};

export function validateName(name: string) {
  return regExps.NAME.test(name);
}

export function validateLogin(login: string) {
  if (login.length < 3 || login.length > 20) return false;
  return regExps.LOGIN.test(login);
}

export function validateEmail(email: string) {
  return regExps.EMAIL.test(email);
}

export function validatePassword(password: string) {
  if (password.length < 8 || password.length > 40) return false;
  return regExps.PASSWORD.test(password);
}

export function validatePhone(phone: string) {
  return regExps.PHONE.test(phone);
}

export const validatorsMap: Record<string, (name: string) => boolean> = {
  name: validateName,
  login: validateLogin,
  email: validateEmail,
  password: validatePassword,
  phone: validatePhone,
};
