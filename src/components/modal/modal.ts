import { Component } from '../../core/base/component';
import './modal.scss';
import { TData, TEvents, TProps, TStructure } from './types';

export class Modal extends Component<TData, TEvents> {
  constructor(props: TProps) {
    super({ ...props });
  }

  events: TEvents = {
    buttonClick: () => console.log('buttonClick'),
    hideModal: () => console.log('buttonClick'),
  };

  renderStructure(structure: TStructure[]) {
    return structure.reduce<string>((acc, item) => {
      if (item.type === 'inputField') {
        acc = acc.concat(`
          {{{ 
            InputField label="${item.label}" name="${item.label}"
          }}}
        `);
      } else {
        acc = acc.concat(`
          {{{ 
            FileField label="${item.label}" name="${item.label}"
          }}}
        `);
      }

      return acc;
    }, ``);
  }

  protected render(): string {
    const { hidden, label } = this.data;
    const structure = this.renderStructure(this.data.structure);

    return `
      <div class="modal-wrapper" ${hidden ? 'hidden' : ''} data-event="click:hideModal">
        <form class="modal">
          <div class="modal__title">${label}</div>
          <div class="modal__structure">
            ${structure}
          </div>
          <div class="modal__button">
            {{{ 
              Button type="button" label="Добавить" click="[buttonClick]"
            }}}
          </div>
        </form>
      </div>
    `;
  }
}
