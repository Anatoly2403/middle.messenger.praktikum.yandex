import { Component, prepareComponent } from '../../core/component';
import { TButtonProps } from '../../ui-kit/button';
import { Form } from '../form/form';
import { TInputFieldProps } from '../../ui-kit/input-field';
import './modal.scss';

export type TModalProps = {
  label: string;
  formData: {
    id: string;
    title: string;
    fields: Array<TInputFieldProps>;
    submit: TButtonProps;
  };
  hideModal: () => void;
  handleSubmit: (data: Record<string, string>, id?: string) => void;
};

const template = `    
    <div class="modal-wrapper" data-event="[click:hideModal]"> 
      <div class="form__wrapper">
        {{{ 
          form 
            onSubmit=helpers.handleSubmit
            title=props.formData.title 
            fields=props.formData.fields
            button=props.formData.submit
        }}}
      </div>           
    </div> 
  `;

function hideModal(this: Component<TModalProps>, e: Event) {
  if ((e.target as Element).className === 'modal-wrapper') {
    if (this.props.hideModal) this.props.hideModal();
  }
}

function handleSubmit(this: Component<TModalProps>, data: Record<string, string>) {
  if (this.props.handleSubmit) this.props.handleSubmit(data, this.props.formData.id);
}

export const Modal = prepareComponent<TModalProps>({
  name: 'modal',
  template,
  children: [Form],
  events: { hideModal },
  helpers: { handleSubmit },
});
