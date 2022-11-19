import { ISimpleObject } from '../models/index';
import { AnyType } from '../models/index';

export function isArray(x: unknown): x is AnyType[] {
  return Array.isArray(x);
}

export function isObject(x: unknown): x is ISimpleObject {
  return (
    typeof x === 'object' &&
    x !== null &&
    x.constructor === Object &&
    Object.prototype.toString.call(x) === '[object Object]'
  );
}

export function isFunction(x: unknown): x is (...args: AnyType) => AnyType {
  return Object.prototype.toString.call(x) === '[object Function]';
}

export function isDate(x: unknown): x is Date {
  return Object.prototype.toString.call(x) === '[object Date]';
}
export function isValue(x: unknown) {
  return !isObject(x) && !isArray(x) && !isDate(x) && !isFunction(x);
}

export function isNill(x: unknown) {
  return x === undefined || x === null;
}
