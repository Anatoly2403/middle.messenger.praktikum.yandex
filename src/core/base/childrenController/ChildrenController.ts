import { Component } from '../component';

export class ChildrenController {
  private _children: Component[] = [];

  constructor(children: Component[]) {
    this._children = children;
  }
}
