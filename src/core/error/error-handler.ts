import { compile } from 'handlebars';
import './error.scss';

const tmp = `
  <div class='error'>
    {{message}}
  </div>
`;

export function showError(message: string, delay = 1500) {
  const template = compile(tmp)({ message });
  const elem = document.createElement('div');
  elem.innerHTML = template;
  document.body.append(elem);

  setTimeout(() => elem.remove(), delay);
}
