import Handlebars from 'handlebars';
import { AnyType } from '../../models';
import { Component } from '../Component';

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
