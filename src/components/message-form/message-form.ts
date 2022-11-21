import { Component, prepareComponent } from '../../core/component';
import './message-form.scss';
import { ArrowButton } from '../../ui-kit/arrow-button';
import { MessageField } from '../../ui-kit/message-field';

type TMessageFormProps = {
  onSubmit: (message: string) => void;
};

const template = `
  <form class='message-form' data-event="[submit:handleSubmit]">
    {{{ message-field }}}
    <button class="message-form__submit" >
      {{{ arrow-button  }}}
    </button>
  </form>
`;

export const MessageForm = prepareComponent({
  name: 'message-form',
  template,
  children: [ArrowButton, MessageField],
  events: {
    handleSubmit(this: Component<TMessageFormProps>, e: Event) {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const messageInput = form.querySelector('input');
      if (!messageInput) return;
      const { value } = messageInput;
      if (!value) return;
      if (this.props.onSubmit) {
        this.props.onSubmit(value);
        messageInput.value = '';
      }
    },
  },
});
