const regExps = {
  NAME: /^[A-ZА-Я]+[a-zа-яA-ZА-Я]+([-]?)+[a-zа-яA-ZА-Я]+/,
  LOGIN: /(\d?)+([-|_]?)+[a-zA-z]+([-|_]?)+[a-zA-z]+(\d?)+/,
  EMAIL: /^[\w]+@([\d]?|[a-z]+\.)+[\w-]{2,4}$/,
  PASSWORD: /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\d).+/,
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
