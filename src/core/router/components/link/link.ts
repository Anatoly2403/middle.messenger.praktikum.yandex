import { prepareComponent, Component } from '../../../component';
import { redirect } from '../../helpers/helpers';
import './link.scss';

export type TLinkProps = {
  href: string;
  label: string;
};

export const Link = prepareComponent<TLinkProps>({
  name: 'link',
  template: `<a class="link" data-event="[click:handleClick]" href="{{ props.href }}">{{ props.label }}</a>`,
  events: {
    handleClick(this: Component<TLinkProps>, e: Event) {
      e.preventDefault();
      redirect(this.props.href || '');
    },
  },
});
