import Handlebars, { HelperOptions } from 'handlebars';
import { AnyType } from '../../shared/models';
import { Component } from '../component';
import { TPreComponent } from '../models';

export function parseEvent(evString: string) {
  const str = evString.replace(/\[/g, '').replace(/\]/g, '');

  return str.split(',').map((item) => {
    const [event, name] = item.split(':');
    return {
      event: event.trim(),
      name: name.trim(),
    };
  });
}

export function isPropEvent(propsValue: string) {
  if (typeof propsValue === 'string') {
    return /^\[.+]$/.test(propsValue);
  }
  return false;
}

export function parsePropNameWithKey(propNameWithKey: string) {
  const key = propNameWithKey.match(/\[.+]/)?.[0];
  const name = propNameWithKey.replace(/\[.+]/, '');
  return { key, name };
}

export function getPath(path: string) {
  const pathArray = path.replace(/\[/g, '').replace(/\]/g, '').split('.');
  return pathArray.filter((item) => item !== 'static');
}

export function registerHbHelpers() {
  Handlebars.registerHelper('if_eq', function (this: unknown, a, b, opts) {
    return a == b ? opts.fn(this) : opts.inverse(this);
  });
}

export function renderDOM(selector: string, component: Component<AnyType>) {
  registerHbHelpers();
  const parentElement = document.querySelector(selector);
  if (!parentElement) throw new Error(`Ошибка. Элемент с селектором ${selector} - отсутствует`);
  component.setParentElement(parentElement);
  component.mount();
}
