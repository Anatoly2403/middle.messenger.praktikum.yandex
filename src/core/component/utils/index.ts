import Handlebars from 'handlebars';
import { parseDate } from '../../../utils';
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
  Handlebars.registerHelper('if_or', function (this: unknown, a, b, opts) {
    return a || b ? opts.fn(this) : opts.inverse(this);
  });

  Handlebars.registerHelper('if_eq', function (this: unknown, a, b, opts) {
    return a == b ? opts.fn(this) : opts.inverse(this);
  });

  Handlebars.registerHelper('if_not', function (this: unknown, a, opts) {
    return !a ? opts.fn(this) : opts.inverse(this);
  });

  Handlebars.registerHelper('if_and-not', function (this: unknown, a, b, opts) {
    return !a && !b ? opts.fn(this) : opts.inverse(this);
  });

  Handlebars.registerHelper('time', function (this: unknown, time, opts) {
    if (!time) return opts.inverse(this);
    const date = parseDate(new Date(time));
    return opts.fn({ date });
  });
}

export function renderDOM(selector: string, component: Component<AnyType>) {
  const rootElement = document.querySelector(selector);
  const parentElementTemplate = `<div data-child=${component.id}></div>`;
  if (!rootElement) throw new Error(`Ошибка. Элемент с селектором ${selector} - отсутствует`);
  rootElement.innerHTML = parentElementTemplate;
  const parentElement = rootElement.firstElementChild;
  if (!parentElement) throw new Error(`Ошибка. Элемент с селектором ${selector} - отсутствует`);
  component.setParentElement(parentElement);
  component.mount();
}
