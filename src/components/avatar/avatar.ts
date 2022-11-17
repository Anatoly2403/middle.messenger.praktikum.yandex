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
  template: `
              <div 
                class="avatar {{#if props.avatarSrc}}{{else}}avatar_default{{/if}}" 
                data-event="[click:handleAvatarClick]"
              >
                  {{#if props.avatarSrc}}
                    <img class="profile-avatar__avatar" src="{{ props.avatarSrc }}" alt="avatar"/>
                  {{/if}}
              </div>
  `,
  events: { handleAvatarClick },
});
