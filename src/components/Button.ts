import { Component, Event } from "../core";
import { registerComponent } from "../core/utils/registerComponent";
type Props = {};
type State = {
  label: string;
};
type EEvents = {
  someHandle: () => void;
  next: () => void;
};

export class Button extends Component<Props, State, EEvents> {
  constructor(props: Props) {
    super({
      props,
      state: {
        label: "Push",
      },
    });
  }

  @Event() someHandle() {
    console.log(this);
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
    return `<button data-event="click:someHandle">
      ${this.state.label}
      </button>`;
  }
}
