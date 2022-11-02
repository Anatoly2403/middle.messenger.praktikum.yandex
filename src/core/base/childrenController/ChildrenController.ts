import Handlebars, { HelperOptions } from 'handlebars';
import { Component } from '../component';
import { ISimpleObject, TPreComponent } from '../models';

export class ChildrenController {
  private _initialChildren: TPreComponent[] = [];
  private _children: Record<string, Component | Component[]> = {};
  private _childProps: Record<string, ISimpleObject | ISimpleObject[]> = {};
  private _parent: Element | null = null;

  constructor(children: TPreComponent[]) {
    this._initialChildren = children;
    this._registerChildren(children, this._setProps.bind(this));
  }

  private _setProps(id: string, hash: ISimpleObject) {
    const { key, ...props } = hash;
    const record = this._childProps[id];
    if (key === undefined) {
      this._childProps[id] = props;
    } else {
      let childPropsArray: ISimpleObject[] = [];
      if (Array.isArray(record)) childPropsArray = record;
      this._childProps[id] = [...childPropsArray.slice(0, key), props, ...childPropsArray.slice(key + 1)];
    }
  }

  private _setChildren(child: Component, id: string, key?: number) {
    const record = this._children[id];
    if (key === undefined) {
      this._children[id] = child;
    } else {
      let childArray: Component[] = [];
      if (Array.isArray(record)) childArray = record;
      this._children[id] = [...childArray.slice(0, key), child, ...childArray.slice(key + 1)];
    }
  }

  private _getChildParentArray(id: string) {
    if (!this._parent) return;
    return this._parent.querySelectorAll(`[data-child="${id}"]`);
  }

  private _registerChildren(children: TPreComponent[], callback: (id: string, hash: ISimpleObject) => void) {
    children.forEach((child) => {
      Handlebars.registerHelper(child.prototype.name, ({ hash }: HelperOptions) => {
        callback(child.prototype.id, hash);
        return `<div data-child="${child.prototype.id}"></div>`;
      });
    });
  }

  public mountChildren() {
    Object.keys(this._childProps).forEach((key) => {
      const parents = this._getChildParentArray(key);
      if (!parents) return;
      const initChild = this._initialChildren.find((item) => item.prototype.id === key);
      if (!initChild) return;
      const props = this._childProps[key];
      if (Array.isArray(props)) {
        props.forEach((props, idx) => {
          const child = initChild(props);
          child.setParentElement(parents[idx]);
          child.mount();
          this._setChildren(child, key, idx);
        });
      } else {
        const child = initChild(props);
        child.setParentElement(parents[0]);
        child.mount();
        this._setChildren(child, key);
      }
    });
  }

  public updateChildren() {
    Object.keys(this._childProps).forEach((key) => {
      const propsRecord = this._childProps[key];
      const childRecord = this._children[key];
      const parents = this._getChildParentArray(key);
      if (!parents) return;
      const initChild = this._initialChildren.find((item) => item.prototype.id === key);
      if (Array.isArray(propsRecord) && Array.isArray(childRecord)) {
        propsRecord.forEach((props, idx) => {
          const child = childRecord[idx];
          if (child) {
            child.setParentElement(parents[idx]);
            child.setProps(props);
          } else {
            if (!initChild) return;
            const newChild = initChild(props);
            newChild.setParentElement(parents[idx]);
            newChild.mount();
            this._setChildren(newChild, key, idx);
          }
        });
      } else {
        if (childRecord instanceof Component) {
          childRecord.setParentElement(parents[0]);
          childRecord.setProps(propsRecord);
        } else {
          if (!initChild) return;
          const newChild = initChild(propsRecord);
          newChild.setParentElement(parents[0]);
          newChild.mount();
          this._setChildren(newChild, key);
        }
      }
    });
  }

  public setParent(elem: Element) {
    this._parent = elem;
  }
}
