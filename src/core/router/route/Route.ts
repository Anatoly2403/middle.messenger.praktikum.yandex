import { Component } from '../../base/component';
import { TPreComponent } from '../../base/models';
import { renderDOM } from '../../base/utils';
import { redirect } from '../helpers/helpers';
import { ElementWithPathname } from '../models/types';

export class Route {
  private pathname: string;
  private view: TPreComponent;
  private component: Component | null = null;
  private props?: Record<string, string>;

  constructor(pathname: string, view: TPreComponent, props?: Record<string, string>) {
    this.pathname = pathname;
    this.view = view;
    this.props = props;
  }

  private _listener(e: MouseEvent) {
    e.preventDefault();
    const { pathname } = e.target as ElementWithPathname;
    redirect(pathname);
  }

  private _addListener() {
    const links = document.querySelectorAll('a');
    links.forEach((link) => link.addEventListener('click', this._listener.bind(this)));
  }

  private _removeListener() {
    const links = document.querySelectorAll('a');
    links.forEach((link) => link.removeEventListener('click', this._listener.bind(this)));
  }

  public match(pathname: string) {
    return pathname === this.pathname;
  }

  public render() {
    this._removeListener();
    this.component = this.view({});
    renderDOM(this.props?.rootQuery || '#app', this.component);
    this._addListener();
  }
}
