import Handlebars, { HelperOptions } from 'handlebars';
import { Component } from '../component';
import { IClassComponent, ISimpleObject } from '../models';
import { getPathsObj } from '../utils';

export class App {
  constructor({ imports }: { imports: IClassComponent[] }) {
    this._registerComponents(imports);
  }

  private _isPropsFromParent(path: string): boolean {
    const start = path[0];
    const end = path[path.length - 1];
    return start === '[' && end === ']';
  }

  private _getDataForChild(
    hash: ISimpleObject,
    data: ISimpleObject,
  ): ISimpleObject {
    const propsForChild: ISimpleObject = {};

    for (const key in hash) {
      if (this._isPropsFromParent(hash[key])) {
        const arrayPath = getPathsObj(hash[key]);
        let value: unknown;
        for (const item of arrayPath) {
          value = data[`${item}`];
        }
        propsForChild[key] = value;
      } else {
        propsForChild[key] = hash[key];
      }
    }
    return propsForChild;
  }

  private _hbRegister(Component: IClassComponent): void {
    Handlebars.registerHelper(
      Component.name,
      ({ hash, data }: HelperOptions) => {
        const { setChild, events, data: rootData } = data.root;

        const dataForChild = this._getDataForChild(hash, {
          ...rootData,
          ...events,
        });
        const child = new Component(dataForChild);
        setChild(child);

        return `<div data-child-id="${child.id}"></div>`;
      },
    );
  }

  private _registerComponents(components: IClassComponent[]): void {
    components.forEach((component) => this._hbRegister(component));
  }

  public renderDOM(selector: string, component: Component): void {
    const root = document.querySelector(selector);
    if (!(root instanceof HTMLElement)) return;
    component.setParentElement(root);
    component.mount();
  }
}
