import { AnyType } from '../../shared/models';

export enum EMethods {
  GET = 'GET',
  POTS = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export type TSimpleObject = Record<string | symbol, AnyType>;

export type IOptions = {
  data?: AnyType;
  headers?: TSimpleObject;
  timeout?: number;
};

export interface IRequestData {
  url: string;
  method: EMethods;
  options: IOptions;
}
