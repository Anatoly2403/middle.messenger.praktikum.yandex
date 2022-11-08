import { Component, prepareComponent } from '../../core/component';
import './avatar.scss';

export type TAvatarProps = {
  avatarSrc: string;
  avatarClick?: () => void;
};

function handleAvatarClick(this: Component<TAvatarProps>) {
  if (this.props.avatarClick) this.props.avatarClick();
}

export const Avatar = prepareComponent<TAvatarProps>({
  name: 'avatar',
  template: `<div class="avatar" data-event="[click:handleAvatarClick]">
                <img class="profile-avatar__avatar" src="{{ props.avatarSrc }}" alt="avatar"/>
            </div>
  `,
  events: { handleAvatarClick },
});
