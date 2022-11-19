import { Component, prepareComponent } from '../../core/component';
import { AnyType } from '../../core/models/index';
import './profile-avatar.scss';

export type TAvatarProps = {
  avatarSrc: AnyType;
  avatarClick?: () => void;
};

export const ProfileAvatar = prepareComponent<TAvatarProps>({
  name: 'profile-avatar',
  template: `
              <div 
                class="profile-avatar {{#if props.avatarSrc}}{{else}}avatar_default{{/if}}" 
                data-event="[click:handleAvatarClick]"
              >
                  {{#if props.avatarSrc}}
                    <img 
                      class="profile-avatar__avatar" 
                      src="https://ya-praktikum.tech/api/v2/resources/{{props.avatarSrc}}" alt="avatar"/>
                  {{/if}}
              </div>
  `,
  events: { handleAvatarClick },
});

function handleAvatarClick(this: Component<TAvatarProps>) {
  if (this.props.avatarClick) this.props.avatarClick();
}
