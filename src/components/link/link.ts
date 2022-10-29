import { prepareComponent } from '../../core/base/component';
import './link.scss';

export type TProps = {
  href: string;
  label: string;
};

export const Link = prepareComponent<TProps>({
  name: 'link',
  getTemplate: () => `<a class="link" href="{{ props.href }}">{{ props.label }}</a>`,
  children: [],
  events: {},
});
