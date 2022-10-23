import { Component } from '../core/component'

type Props = {
  label: string
}
type Data = Props & {}
type Events = {
  click: () => void
}

export class TestComponent extends Component<Data, Events> {
  constructor(props: Props) {  
    super({ ...props })
  }

  override events: Events = {
    click: () => {
      this.data.label = 'sadfsdf'
    },
  }

  protected override render(): string {
    return `
    <div>
      <button data-event="click:click">${this.data.label}</button> 
      {{{Test2}}}
    </div>
      
    `
  }
}
