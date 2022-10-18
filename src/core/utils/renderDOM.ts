import Component from "../Component";

export function renderDOM(selector: string, component: Component) {
  const root = document.querySelector(selector);
  if (!root || !component.element) return;
  root.appendChild(component.element);
  component.dispatchComponentDidMount();
  return root;
}
