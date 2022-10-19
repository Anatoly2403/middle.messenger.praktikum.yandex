import { Component } from "../Component";
import { Component2 } from "../Component2";

export interface IComponentMeta<P, S> {
  props: P;
  state: S;
}

export interface ISimpleObject {
  [key: string | symbol]: unknown;
}
export interface IClassComponent {
  new (...args: ISimpleObject[]): Component2;
}
