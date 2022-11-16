import { Component, renderDOM } from '../../component';
import { TPreComponent } from '../../component/models';

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

  public match(pathname: string) {
    return pathname === this.pathname;
  }

  public render() {
    this.component = this.view({});
    renderDOM(this.props?.rootQuery || '#app', this.component);
  }
}
