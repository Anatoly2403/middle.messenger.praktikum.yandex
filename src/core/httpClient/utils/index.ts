import { ISimpleObject } from '../../models';

export function queryStringify(data?: ISimpleObject) {
  if (!data) return '';
  const queryParams = Object.keys(data).map((key) => `${key}=${data[key]}`);
  return `?${queryParams.join('&')}`;
}
