import { Component } from '../core/component'

type Props = {}

export class TestCard extends Component<Props> {
  constructor(props?: Props) {
    super({ ...props, label: 'Ghb' })
  }

  events = {
    click: () => console.log('events'),
  }

  protected render(): string {
    return `
      <div> 
            {{{ TestComponent label="[data.label]"}}}       
      </div>
    `
  }
}
