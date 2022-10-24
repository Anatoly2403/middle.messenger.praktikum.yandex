import { Component } from '../../core/component'
import './avatar.scss'
import { TEvents, TProps } from './types'

export class Avatar extends Component<TProps, TEvents> {
  constructor(props: TProps) {
    super({
      ...props,
    })
  }

  events: TEvents = {
    handleAvatarClick: () => console.log('avatar click'),
  }

  protected render(): string {
    return `
      <div class="avatar" data-event="[click:handleAvatarClick]">
        <img class="profile-avatar__avatar" src="${this.data.avatarSrc}" alt="avatar"/>
      </div>
      `
  }
}
