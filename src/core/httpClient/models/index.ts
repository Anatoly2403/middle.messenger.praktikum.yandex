export enum EMethods {
  GET = 'GET',
  POTS = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyType = any;

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
