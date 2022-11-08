import { Component, prepareComponent } from '../../core/component';
import { Popup } from '../../ui-kit/popup';
import './action-menu.scss';

type TMenuProps = {
  menuItems: { name: string; value: string }[];
  handler: (name: string | null) => void;
};

type TMenuState = {
  showPopup: boolean;
};

const template = `
  <div class="action-menu">
    <div class="menu" data-event="[click:handleClickMenu]">
      <div class="action-menu__dot"></div>
      <div class="action-menu__dot"></div>
      <div class="action-menu__dot"></div>
    </div>
    {{#if state.showPopup}}
      {{{popup show=state.showPopup items=props.menuItems handler=helpers.handlePopupAction}}}
    {{/if}}
  </div>
`;

export const ActionMenu = prepareComponent<TMenuProps, TMenuState>({
  name: 'action-menu',
  template,
  state: {
    showPopup: false,
  },
  children: [Popup],
  events: {
    handleClickMenu(this: Component<TMenuProps, TMenuState>) {
      this.setState((data) => ({ ...data, showPopup: !data.showPopup }));
    },
  },
  helpers: {
    handlePopupAction(this: Component<TMenuProps, TMenuState>, name: string | null) {
      if (this.props.handler) this.props.handler(name);
      this.setState((data) => ({ ...data, showPopup: !data.showPopup }));
    },
  },
});
