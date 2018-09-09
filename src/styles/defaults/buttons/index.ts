import { default as defaultButton, ButtonStyle } from '../button/';
import { default as buttonsContainerStyle } from './buttons.container';
import { ContainerStyle } from '../container/';

export interface ButtonsStyle {
  buttonsContainerStyle?: ContainerStyle;
  buttonStyle?: ButtonStyle;
  buttonContainerStyle?: ContainerStyle;
};

export default {
  buttonsContainerStyle: buttonsContainerStyle,
  button: defaultButton,
} as ButtonsStyle;
