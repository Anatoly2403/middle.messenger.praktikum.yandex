import Handlebars, { HelperOptions } from 'handlebars'
import { IClassComponent } from '../models'

export function registerComponent(Component: IClassComponent) {
  Handlebars.registerHelper(Component.name, (opts: HelperOptions) => {
    const { setChild, EEvents, props, state } = opts.data.root
    const child = new Component({})

    console.log('opts', opts.data.root)
    return 'Привет мир'
  })
}
