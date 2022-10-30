import { prepareComponent } from '../../core/base/component';
import './link.scss';

export type TLinkProps = {
  href: string;
  label: string;
};

export const Link = prepareComponent<TLinkProps>({
  name: 'link',
  getTemplate: () => `<a class="link" href="{{ props.href }}">{{ props.label }}</a>`,
});
