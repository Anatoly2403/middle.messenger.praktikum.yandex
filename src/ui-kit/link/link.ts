import { prepareComponent } from '../../core/component';
import './link.scss';

export type TLinkProps = {
  href: string;
  label: string;
};

export const Link = prepareComponent<TLinkProps>({
  name: 'link',
  template: `<a class="link" data-event="[click:handleLink]" href="{{ props.href }}">{{ props.label }}</a>`,
});
