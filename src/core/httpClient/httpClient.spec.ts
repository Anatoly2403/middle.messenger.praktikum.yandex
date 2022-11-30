import { expect } from 'chai';
import { describe } from 'mocha';
import { HttpClient } from './HttpClient';
import XMLHttpRequest from 'xhr2';

class HTTP extends HttpClient {
  public getPosts = async (url: string) => this.get(url);
}

global.XMLHttpRequest = XMLHttpRequest;

describe('HttpClient', () => {
  it('Should return todo with id 1', async () => {
    try {
      const http = new HTTP();
      const posts = await http.getPosts('https://jsonplaceholder.typicode.com/todos/1');
      expect(posts).to.include({ id: 1 });
    } catch (e) {
      expect(e).to.include({ id: 1 });
    }
  });
});
