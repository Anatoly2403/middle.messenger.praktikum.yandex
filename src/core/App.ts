import { Component2 } from "./Component2";
import { ClassComponent } from "./models";
import { registerComponent } from "./utils/registerComponent";

interface Props {
  imports: ClassComponent[];
}

export class App {
  constructor({ imports }: Props) {
    this.registerComponents(imports);
  }

  private registerComponents(components: ClassComponent[]) {
    components.forEach((component) => registerComponent(component));
  }

  public renderDOM(selector: string, component: Component2) {
    const root = document.querySelector(selector);
    if (!(root instanceof HTMLElement)) return;
    component.setParentElement(root);
    component.build();

    // root.appendChild(component.element);
    // component.dispatchComponentDidMount();
  }
}
