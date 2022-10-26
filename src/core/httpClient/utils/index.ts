import { TSimpleObject } from '../models';

export function queryStringify(data?: TSimpleObject) {
  if (!data) return '';
  const queryParams = Object.keys(data).map(key => `${key}=${data[key]}`);
  return `?${queryParams.join('&')}`;
}
