import { prepareComponent } from '../../core/component';
import './message-field.scss';

type TMessageFieldProps = {
  placeholder?: string;
  validators?: [(value: string) => boolean];
};

const template = `
  <input 
    name="message"
    class='message-field' 
    placeholder={{#if props.placeholder}}{{props.placeholder}}{{else}}"Сообщение"{{/if}}
  />
`;

export const MessageField = prepareComponent<TMessageFieldProps>({
  name: 'message-field',
  template,
});
