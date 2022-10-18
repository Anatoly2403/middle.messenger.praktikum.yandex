import Component from "../../core/Component";
import { Event } from "../../core/Decorators";

type Props = {};
type State = {
  label: string;
};
type Events = {
  someHandle: () => void;
  next: () => void;
};

export class Button extends Component<Props, State, Events> {
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
    return `<button data-event="click:someHandle">${this.state.label}</button>`;
  }
}
