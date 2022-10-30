import { AnyType } from '../../shared/models';
import { Component } from '../component';
import { ISimpleObject, TChildProps, TPreComponent } from '../models';
import { getPath, isPropEvent } from '../utils';

export class ChildrenController<TStatic extends ISimpleObject = ISimpleObject> {
  private _initialChildren: TPreComponent[] = [];
  private _childrenProps: Record<string, ISimpleObject> = {};
  private _children: Component[] = [];
  private _static: TStatic;

  constructor(children: TPreComponent[], helpers?: TStatic) {
    this._initialChildren = children;
    this._static = helpers || ({} as TStatic);
    this.setChildrenProps = this.setChildrenProps.bind(this);
  }

  private _prepareProps(props: ISimpleObject) {
    return Object.keys(props).reduce<ISimpleObject>(
      (acc, key) => {
        if (isPropEvent(props[key])) {
          const pathArray = getPath(props[key]);
          const value = pathArray.reduce<AnyType>((acc, item) => {
            if (!acc) acc = this._static[item];
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
    this._children.forEach((child) => child.resetTemplate());
    this._children.forEach((child) => child.setNewProps(this._childrenProps[child.name]));
  }

  public setChildrenProps(childProps: TChildProps) {
    this._childrenProps[childProps.name] = this._prepareProps(childProps.props);
  }

  public initChildren() {
    this._initialChildren.forEach((child, i) => {
      const name = child.prototype['name'];
      const props = this._childrenProps[name];
      this._children[i] = child(props);
    });
  }

  public mountChildren() {
    this._children.forEach((child) => child.mount());
  }
}
