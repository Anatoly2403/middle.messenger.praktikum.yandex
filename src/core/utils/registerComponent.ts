import Handlebars, { HelperOptions } from "handlebars";
import { ClassComponent } from "../models";

export function registerComponent(Component: ClassComponent) {
  Handlebars.registerHelper(Component.name, (opts: HelperOptions) => {
    const { setChild, EEvents, props, state } = opts.data.root;
    const child = new Component({});
    
    console.log("opts", opts.data.root);
    return "Привет мир";
  });
}
