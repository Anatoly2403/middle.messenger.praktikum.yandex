import { EMethods, IOptions, IRequestData } from './models';
import { queryStringify } from './utils';

export class HttpClient {
  public get(url: string, options: IOptions = {}): Promise<XMLHttpRequest> {
    return this._request({
      url: url + queryStringify(options.data),
      method: EMethods.GET,
      options,
    });
  }
  public post(url: string, options: IOptions = {}): Promise<XMLHttpRequest> {
    return this._request({
      url,
      method: EMethods.POTS,
      options,
    });
  }
  public put(url: string, options: IOptions = {}): Promise<XMLHttpRequest> {
    return this._request({
      url,
      method: EMethods.PUT,
      options,
    });
  }
  public delete(url: string, options: IOptions = {}): Promise<XMLHttpRequest> {
    return this._request({
      url,
      method: EMethods.DELETE,
      options,
    });
  }

  private _request({ url, method, options }: IRequestData): Promise<XMLHttpRequest> {
    return new Promise((resolve, reject) => {
      const { data, headers, timeout } = options;
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.onload = () => {
        if (xhr.status !== 200) {
          reject(xhr);
        } else {
          resolve(xhr);
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (headers) {
        Object.keys(headers).forEach((key) => {
          xhr.setRequestHeader(key, headers[key]);
        });
      }

      if (timeout) {
        xhr.timeout = timeout;
      }

      if (method !== EMethods.GET && data) {
        xhr.send(JSON.stringify(data));
      }
      if (method === EMethods.GET) {
        xhr.send();
      }
    });
  }
}
