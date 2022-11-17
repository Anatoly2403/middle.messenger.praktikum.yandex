import { TButtonProps } from '../../ui-kit/button';
import { TFileFieldProps } from '../../ui-kit/file-field';
import { TInputFieldProps } from '../../ui-kit/input-field';

export type TProfilePageState = {
  changeData: boolean;
  changePassword: boolean;
  showModal: boolean;
  modalFormData: {
    title: string;
    fields: Array<TInputFieldProps | TFileFieldProps>;
    button: TButtonProps;
  };
};

export type TAvatarData = Record<string, File>;
