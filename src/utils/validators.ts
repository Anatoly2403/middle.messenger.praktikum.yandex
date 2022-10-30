const nemRegExp = /^[A-ZА-Я]+[a-zа-яA-ZА-Я]+([-]?)+[a-zа-яA-ZА-Я]+/;
const loginRegExp = /(\d?)+([-|_]?)+[a-zA-z]+([-|_]?)+[a-zA-z]+(\d?)+/;
const emailRegExp = /^[\w]+@([\d]?|[a-z]+\.)+[\w-]{2,4}$/;
const passwordRegExp = /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\d).+/;
const phoneRegExp = /^\+?\d{10,15}$/;

export function validateName(name: string) {
  return nemRegExp.test(name);
}

export function validateLogin(login: string) {
  if (login.length < 3 || login.length > 20) return false;
  return loginRegExp.test(login);
}

export function validateEmail(email: string) {
  return emailRegExp.test(email);
}

export function validatePassword(password: string) {
  if (password.length < 8 || password.length > 40) return false;
  return passwordRegExp.test(password);
}

export function validatePhone(phone: string) {
  return phoneRegExp.test(phone);
}
