import { Component, renderDOM } from '../../component';
import { redirect } from './../helpers/helpers';
import { TPreComponent } from '../../component/models';

export type TGuard = {
  guardFn: () => boolean;
  redirectPath: string;
};

export class Route {
  private pathname: string;
  private view: TPreComponent;
  private component: Component | null = null;
  private props?: Record<string, string>;
  private guard?: TGuard;

  constructor(pathname: string, view: TPreComponent, props?: Record<string, string>, guard?: TGuard) {
    this.pathname = pathname;
    this.view = view;
    this.props = props;
    this.guard = guard;
  }

  public match(pathname: string) {
    return pathname === this.pathname;
  }

  public render() {
    if (this.guard && !this.guard.guardFn()) {
      redirect(this.guard.redirectPath);
    } else {
      this.component = this.view({});
      renderDOM(this.props?.rootQuery || '#app', this.component);
    }
  }

  public destroy() {
    this.component?.destroy();
  }
}
