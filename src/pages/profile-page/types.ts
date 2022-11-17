import { TButtonProps } from '../../ui-kit/button';
import { TFileFieldProps } from '../../ui-kit/file-field';
import { TInputFieldProps } from '../../ui-kit/input-field';

export type TProfilePageState = {
  modal: {
    name?: string;
    show: boolean;
    formData?: {
      title: string;
      fields: Array<TInputFieldProps | TFileFieldProps>;
      button: TButtonProps;
    };
  };
};

export type TAvatarData = Record<string, File>;
export type TUserData = Record<string, string>;

export function isAvatarData(data: TAvatarData | TUserData): data is TAvatarData {
  const key = Object.keys(data)[0];
  return data[key] instanceof File;
}
