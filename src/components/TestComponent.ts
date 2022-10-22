import { Component } from '../core/Component'

type Props = {}
type Data = Props & {
  label: string
}
type Events = {
  click: () => void
}

export class TestComponent extends Component<Data, Events> {
  constructor(props?: Props) {
    super({ ...props, label: 'as;dkfhkjsahdf' })
    this.registerEvents(this.events)
  }

  events: Events = {
    click: () => {
      this.data.label = 'sadfsdf'
    },
  }

  render(): string {
    return `
      <button data-event="click:click">${this.data.label}</button>
    `
  }
}
