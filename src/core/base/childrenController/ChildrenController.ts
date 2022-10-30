import { AnyType } from '../../shared/models';
import { Component } from '../component';
import { ISimpleObject, TChildProps, TPreComponent } from '../models';
import { getPath, isPropEvent, parsePropNameWithKey } from '../utils';

export class ChildrenController<TStatic extends ISimpleObject = ISimpleObject> {
  private _initialChildren: TPreComponent[] = [];
  private _childrenProps: Record<string, ISimpleObject> = {};
  private _children: Component[] = [];
  private _helpers: TStatic;

  constructor(children: TPreComponent[], helpers?: TStatic) {
    this._initialChildren = children;
    this._helpers = helpers || ({} as TStatic);
    this.setChildrenProps = this.setChildrenProps.bind(this);
  }

  public get children() {
    return this._children;
  }

  private _prepareProps(props: ISimpleObject) {
    return Object.keys(props).reduce<ISimpleObject>(
      (acc, key) => {
        if (isPropEvent(props[key])) {
          const pathArray = getPath(props[key]);
          const value = pathArray.reduce<AnyType>((acc, item) => {
            if (!acc) acc = this._helpers[item];
            else acc = acc[item];
            return acc;
          }, undefined);

          acc[key] = value;
        }
        return acc;
      },
      { ...props },
    );
  }

  public resetChildren() {
    Object.keys(this._childrenProps).forEach((propNameWithKey) => {
      const props = this._childrenProps[propNameWithKey];
      const { key, name } = parsePropNameWithKey(propNameWithKey);
      const child = this._children.find((child) =>
        key ? child.name === name && key === child.uniqueKey : child.name === name,
      );

      if (!child) {
        const initialChild = this._initialChildren.find((item) => item.prototype['name'] === name);
        if (!initialChild) return;
        const childFromInit = initialChild(props);
        childFromInit.setUniqueKey(key);
        this._children.push(childFromInit);
        childFromInit.mount();
      } else {
        child.setNewProps(props);
        child.resetTemplate();
      }
    });
  }

  public setChildrenProps(childProps: TChildProps) {
    const key = childProps.props.key === undefined ? [] : `[${childProps.props.key}]`;
    this._childrenProps[`${childProps.name}${key}`] = this._prepareProps(childProps.props);
  }

  public initChildren() {
    Object.keys(this._childrenProps).forEach((propNameWithKey) => {
      const { key, name } = parsePropNameWithKey(propNameWithKey);
      const initialChild = this._initialChildren.find((item) => item.prototype['name'] === name);
      if (!initialChild) return;
      const props = this._childrenProps[propNameWithKey];
      const child = initialChild(props);
      child.setUniqueKey(key);
      this._children.push(child);
    });
  }

  public mountChildren() {
    this._children.forEach((child) => child.mount());
  }
}
