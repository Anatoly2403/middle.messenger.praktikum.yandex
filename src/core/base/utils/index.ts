import Handlebars, { HelperOptions } from 'handlebars';
import { AnyType } from '../../shared/models';
import { Component } from '../component';

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
  return /^\[.+]$/.test(propsValue);
}

export function getEventNameFromPath(path: string) {
  const pathArray = path.replace(/\[/g, '').replace(/\]/g, '').split('.');
  return pathArray[pathArray.length - 1];
}

export function registerComponent(id: string, name: string) {
  Handlebars.registerHelper(name, ({ hash, data }: HelperOptions) => {
    const { setChildProps } = data.root;
    setChildProps({ name, props: hash });

    return `<div data-child="${id}"></div>`;
  });
}

export function renderDOM(selector: string, component: Component<AnyType, AnyType>) {
  const parentElement = document.querySelector(selector);
  if (!parentElement) throw new Error(`Ошибка. Элемент с селектором ${selector} - отсутствует`);
  parentElement.innerHTML = `<div data-child="${component.id}"></div>`;
  component.mount();
}
