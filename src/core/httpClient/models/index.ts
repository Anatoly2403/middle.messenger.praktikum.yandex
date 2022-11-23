import { AnyType, ISimpleObject } from '../../models';

export enum EMethods {
  GET = 'GET',
  POTS = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export type IOptions = {
  data?: AnyType;
  headers?: ISimpleObject;
  timeout?: number;
};

export interface IRequestData {
  url: string;
  method: EMethods;
  options: IOptions;
}
