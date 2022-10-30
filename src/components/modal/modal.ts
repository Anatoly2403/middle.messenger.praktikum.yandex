import { Component, prepareComponent } from '../../core/base/component';
import { TButtonProps } from '../button';
import { Form } from '../form/form';
import { TInputFieldProps } from '../input-field';
import './modal.scss';

export type TModalProps = {
  show: boolean;
  label: string;
  formData: {
    title: string;
    fields: Array<TInputFieldProps>;
    submit: TButtonProps;
  };
  hideModal: () => void;
  saveData: () => void;
};

function getTemplate() {
  return `
    
          <div class="modal-wrapper" data-event="[click:hideModal]">     
            {{{ 
              form 
                onSubmit=props.saveData
                title=props.formData.title 
                fields=props.formData.fields
                submit=props.formData.submit
            }}}         
          </div>
 
    `;
}

export const Modal = prepareComponent<TModalProps>({
  name: 'modal',
  getTemplate,
  children: [Form],
  events: {
    buttonClick(this: Component<TModalProps>) {
      if (this.props.saveData) this.props.saveData();
    },
    hideModal(this: Component<TModalProps>, e: Event) {
      if ((e.target as Element).className === 'modal-wrapper') {
        if (this.props.hideModal) this.props.hideModal();
      }
    },
  },
});
