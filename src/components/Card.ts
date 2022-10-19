import { Component, Event } from "../core";

type Props = {};
type State = {
  label: string;
};
type EEvents = {
  someHandle: () => void;
};

export class Card extends Component<Props, State, EEvents> {
  constructor(props: Props) {
    super({
      props,
      state: {
        label: "Push",
      },
    });
  }

  @Event() someHandle() {
    this.setState({
      label: "after click",
    });
  }

  protected componentDidMount(prevProps: Props): void {
    console.dir(prevProps);
  }
  protected componentDidUpdate(prevProps: Props, prevState: State): void {
    console.log(prevProps, prevState);
  }
  protected render(): string {
    return `<div>
      ${this.state.label}
      {{ Button data-event="click:someHandle" }}
      </div>`;
  }
}

