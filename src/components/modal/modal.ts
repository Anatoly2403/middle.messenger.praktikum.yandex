import { Component, prepareComponent } from '../../core/component';
import { TButtonProps } from '../../ui-kit/button';
import { Form } from '../form/form';
import { TInputFieldProps } from '../../ui-kit/input-field';
import './modal.scss';

export type TModalProps = {
  label: string;
  formData: {
    title: string;
    fields: Array<TInputFieldProps>;
    submit: TButtonProps;
  };
  hideModal: () => void;
  saveData: () => void;
};

const template = `    
    <div class="modal-wrapper" data-event="[click:hideModal]"> 
      <div class="form__wrapper">
        {{{ 
          form 
            onSubmit=props.saveData
            title=props.formData.title 
            fields=props.formData.fields
            button=props.formData.button
            onSubmit=props.formData.saveData
        }}}
      </div>           
    </div> 
  `;

function buttonClick(this: Component<TModalProps>) {
  if (this.props.saveData) this.props.saveData();
}

function hideModal(this: Component<TModalProps>, e: Event) {
  if ((e.target as Element).className === 'modal-wrapper') {
    if (this.props.hideModal) this.props.hideModal();
  }
}

export const Modal = prepareComponent<TModalProps>({
  name: 'modal',
  template,
  children: [Form],
  events: { buttonClick, hideModal },
});
