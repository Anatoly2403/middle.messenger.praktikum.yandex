import Handlebars, { HelperOptions } from 'handlebars';
import { Component } from '../component';
import { ISimpleObject, TPreComponent } from '../models';

export class ChildrenController {
  private _parent: Element | null = null;
  private _children: Record<string, TPreComponent> = {};
  private _childTree: Record<string, Component | Component[]> = {};
  private _childPropsTree: Record<string, ISimpleObject | ISimpleObject[]> = {};

  constructor(children: TPreComponent[]) {
    this._children = this._parseChildArray(children);
    this._registerChildren(children, this._setProps.bind(this));
  }

  private _setProps(id: string, hash: ISimpleObject) {
    const { key, ...props } = hash;
    const record = this._childPropsTree[id];
    if (key === undefined) {
      this._childPropsTree[id] = props;
    } else {
      let childPropsArray: ISimpleObject[] = [];
      if (Array.isArray(record)) childPropsArray = record;
      this._childPropsTree[id] = [...childPropsArray.slice(0, key), props, ...childPropsArray.slice(key + 1)];
    }
  }

  private _registerChildren(children: TPreComponent[], callback: (id: string, hash: ISimpleObject) => void) {
    children.forEach((child) => {
      Handlebars.registerHelper(child.prototype.name, ({ hash }: HelperOptions) => {
        callback(child.prototype.id, hash);
        return `<div data-child="${child.prototype.id}"></div>`;
      });
    });
  }

  private _getChildParentArray(id: string) {
    if (!this._parent) return;
    return this._parent.querySelectorAll(`[data-child="${id}"]`);
  }

  private _parseChildArray(children: TPreComponent[]) {
    return children.reduce<Record<string, TPreComponent>>((acc, child) => {
      acc[child.prototype.id] = child;
      return acc;
    }, {});
  }

  private _updateChild(id: string, parent: Element, props: ISimpleObject, child?: Component) {
    if (child) {
      child.setParentElement(parent);
      child.setProps(props);
      return child;
    }
    const newChild = this._children[id](props);
    newChild.setParentElement(parent);
    newChild.mount();
    return newChild;
  }

  private _updateChildArray(
    id: string,
    parents: NodeListOf<Element>,
    propsArray: ISimpleObject[],
    childArray: Component[],
  ) {
    return propsArray.reduce<Component[]>((acc, prop, idx) => {
      const child = childArray[idx];
      acc[idx] = this._updateChild(id, parents[idx], prop, child);
      return acc;
    }, []);
  }

  public setParent(elem: Element | null) {
    this._parent = elem;
  }

  public mountChildren() {
    this._childTree = Object.keys(this._childPropsTree).reduce<Record<string, Component | Component[]>>((acc, key) => {
      const parents = this._getChildParentArray(key);
      const propsRecord = this._childPropsTree[key];
      if (!parents) return acc;
      if (Array.isArray(propsRecord)) {
        acc[key] = this._updateChildArray(key, parents, propsRecord, []);
      } else {
        acc[key] = this._updateChild(key, parents[0], propsRecord);
      }
      return acc;
    }, {});
  }

  public updateChildren() {
    this._childTree = Object.keys(this._childPropsTree).reduce<Record<string, Component | Component[]>>((acc, key) => {
      const propsRecord = this._childPropsTree[key];
      const childRecord = this._childTree[key];
      const parents = this._getChildParentArray(key);
      if (parents) {
        if (Array.isArray(propsRecord) && Array.isArray(childRecord)) {
          acc[key] = this._updateChildArray(key, parents, propsRecord, childRecord);
        }
        if (!Array.isArray(childRecord)) {
          acc[key] = this._updateChild(key, parents[0], propsRecord, childRecord);
        }
      }
      return acc;
    }, {});
  }
}
