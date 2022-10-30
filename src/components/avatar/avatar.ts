import { Component, prepareComponent } from '../../core/base/component';
import './avatar.scss';

export type TAvatarProps = {
  avatarSrc: string;
  avatarClick?: () => void;
};

export const Avatar = prepareComponent<TAvatarProps>({
  name: 'avatar',
  getTemplate: () =>
    `<div class="avatar" data-event="[click:handleAvatarClick]">
        <img class="profile-avatar__avatar" src="{{ props.avatarSrc }}" alt="avatar"/>
      </div>
    `,
  events: {
    handleAvatarClick(this: Component<TAvatarProps>) {
      if (this.props.avatarClick) this.props.avatarClick();
    },
  },
});
