import { Component } from '../component';
import { ISimpleObject, TChildProps, TPreComponent } from '../models';
import { getEventNameFromPath, isPropEvent } from '../utils';

export class ChildrenController<THelpers extends ISimpleObject = ISimpleObject> {
  private _initialChildren: TPreComponent[] = [];
  private _childrenProps: Record<string, ISimpleObject> = {};
  private _children: Component[] = [];
  private _helpers: THelpers;

  constructor(children: TPreComponent[], helpers?: THelpers) {
    this._initialChildren = children;
    this._helpers = helpers || ({} as THelpers);
    this.setChildrenProps = this.setChildrenProps.bind(this);
  }

  private _prepareProps(props: ISimpleObject) {
    return Object.keys(props).reduce<ISimpleObject>(
      (acc, key) => {
        if (isPropEvent(props[key])) {
          const eventName = getEventNameFromPath(props[key]);
          const event = this._helpers[eventName];
          acc[key] = event;
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
