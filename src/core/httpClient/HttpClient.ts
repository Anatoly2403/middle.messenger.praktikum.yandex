import { EMethods, IOptions, IRequestData } from './models';
import { queryStringify } from './utils';

export class HttpClient {
  protected get<T = unknown>(url: string, options: IOptions = {}): Promise<T> {
    return this._request<T>({
      url: url + queryStringify(options.data),
      method: EMethods.GET,
      options,
    });
  }
  protected post<T = unknown>(url: string, options: IOptions = {}): Promise<T> {
    return this._request<T>({
      url,
      method: EMethods.POTS,
      options,
    });
  }
  protected put<T = unknown>(url: string, options: IOptions = {}): Promise<T> {
    return this._request<T>({
      url,
      method: EMethods.PUT,
      options,
    });
  }
  protected delete<T = unknown>(url: string, options: IOptions = {}): Promise<T> {
    return this._request<T>({
      url,
      method: EMethods.DELETE,
      options,
    });
  }

  private _request<T = unknown>({ url, method, options }: IRequestData): Promise<T> {
    return new Promise((resolve, reject) => {
      const { data, headers, timeout } = options;
      const xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      xhr.withCredentials = true;
      xhr.responseType = 'json';

      xhr.onload = () => {
        if (xhr.status !== 200) {
          reject(xhr.response);
        } else {
          resolve(xhr.response);
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      if (timeout) xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (headers) {
        Object.keys(headers).forEach((key) => {
          xhr.setRequestHeader(key, headers[key]);
        });
      }

      if (method === EMethods.GET && !data) {
        xhr.send();
      } else {
        if (data instanceof FormData) {
          xhr.send(data);
        } else {
          xhr.send(JSON.stringify(data));
        }
      }
    });
  }
}
