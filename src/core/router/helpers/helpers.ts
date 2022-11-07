import { Router } from '../Router';

export function redirect(pathname: string) {
  Router.getInstance().go(pathname);
}
