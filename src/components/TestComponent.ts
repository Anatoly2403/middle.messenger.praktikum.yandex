import { Ev } from '../core'
import { Component2 } from '../core/Component2'
import { EEvents, TEvents } from '../core/models'

type Props = {}
type Data = {
  label: string
}

export class TestComponent extends Component2<Data & Props> {
  constructor(props?: Props) {
    super({ ...props, label: 'as;dkfhkjsahdf' })
  }

  @Ev click() {
    console.log(this)
  }

  render(): string {
    return `
      <button data-event="click:click">${this.data.label}</button>
    `
  }
}
