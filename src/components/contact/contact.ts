import { prepareComponent } from '../../core/base/component';
import { IContact } from '../../models';
import './contact.scss';

type TContactProps = {
  contact: IContact;
};

const template = `
  <div class="contact-item">
    <div class="contact-item__avatar">
      <img href="" alt="contact avatar" />
    </div>
    <div class="contact-item__data">
      <span class="contact-item__data-name">Name</span>
      <span class="contact-item__data-message">message</span>
    </div>
    <div class="contact-item__info">
      <time class="contact-item__info-time">11:29</time>
      <span class="contact-item__info-count">2</span>
    </div>  
  </div>
`;

export const Contact = prepareComponent<TContactProps>({
  name: 'contact',
  template,
});
