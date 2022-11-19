import { prepareComponent } from '../../core/component';
import { MessageForm } from '../message-form';
import './chat.scss';

type TChatProps = {
  contact: [];
};

const template = `
  <div class="chat">
    <div class="chat__header">
      <div class="chat__contact">    
        <div class="chat__contact-name">{{props.contact.name}}</div>
      </div>
    </div>
    <div class="chat__content">
      <div class="chat__message chat__message_in">
        <div>Входящее</div>
      </div>
      <div class="chat__message chat__message_out">
        <div>Исходящее</div>
      </div>          
    </div>
    <div class="chat__footer">
      <div class="chat__footer-clip"></div>
      <div class="chat__footer-message">
      {{{ message-form onSubmit=helpers.sendMessage }}}
      </div>
  </div>
`;

export const Chat = prepareComponent<TChatProps>({
  name: 'chat',
  template,
  children: [MessageForm],
  helpers: { sendMessage },
});

function sendMessage(message: string) {
  // eslint-disable-next-line no-console
  console.log({ message });
}
