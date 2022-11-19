import { isNill, isValue, isFunction, isArray, isDate, isObject } from './guards';
import { ISimpleObject } from './../models/index';

function compareValues(x: unknown, y: unknown): boolean {
  if (isNill(x) || isNill(y)) {
    return false;
  }

  if (isObject(x) && isObject(y)) {
    return Object.keys(x).every((key) => compareValues(x[key], y[key]));
  }

  if (isArray(x) && isArray(y)) {
    return x.every((item, i) => compareValues(item, y[i]));
  }

  if (isDate(x) && isDate(y)) {
    return x.getTime() === y.getTime();
  }

  if (isFunction(x) && isFunction(y)) {
    return true;
  }

  if (isValue(x) && isValue(y)) {
    return x === y;
  }

  return false;
}

export function debounce<T>(func: (arg: T) => void, timeout = 200) {
  let timer: NodeJS.Timeout;
  return (arg: T) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(arg), timeout);
  };
}

export function isEmpty(arg: unknown) {
  if (arg instanceof Object) return !Object.keys(arg).length;
  if (Array.isArray(arg)) return !arg.length;
  return Boolean(arg);
}

export function isEqual(x: ISimpleObject, y: ISimpleObject): boolean {
  return compareValues(x, y);
}

export function merge(x: ISimpleObject, y: ISimpleObject): ISimpleObject {
  const keys = [...Object.keys(y)];

  return keys.reduce<ISimpleObject>(
    (acc, key) => {
      const innerX = x[key];
      const innerY = y[key];

      if (isObject(innerX) && isObject(innerY)) {
        acc[key] = merge(innerX, innerY);
        return acc;
      }

      acc[key] = innerY;
      return acc;
    },
    { ...x },
  );
}

export function set(object: ISimpleObject, path: string, value: unknown): ISimpleObject {
  if (typeof path !== 'string') throw new Error('path must be string');

  const newObjValue = path.split('.').reduceRight<ISimpleObject | unknown>((acc, key) => ({ [key]: acc }), value);

  if (!isObject(newObjValue)) return object;

  return merge(object, newObjValue);
}

export function trim(string: string, chars?: string): string {
  const value = string.replace(/\s/g, '');
  if (!chars) return value;
  return value.replace(new RegExp(`[${chars}]`, 'gi'), '');
}
