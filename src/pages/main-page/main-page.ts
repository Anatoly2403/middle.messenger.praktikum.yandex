import { prepareComponent } from '../../core/base/component';
import './main-page.scss';

const template = `
  <div class="root">
    <div class="chat">
      <div class="chat__header">
        <div class="chat__header-link">
          
        </div>
      </div>
    </div>  
    <div class="message-board">
      <div class="message-board__header">
        
      </div>
      <div class="message-board__footer">
        
      </div>
    </div>    
  </div>
`;

export const MainPage = prepareComponent({
  name: 'main-page',
  template,
  children: [],
});
