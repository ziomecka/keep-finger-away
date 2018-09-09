import { default as defaultButtons } from '../buttons/';
import { default as defaultContainer } from './navigation.container';
import { ButtonsStyle } from '../buttons/';
import { ContainerStyle } from '../container/';

export interface NavigationStyle {
  buttons: ButtonsStyle
  container: ContainerStyle
};

export default {
  buttons: defaultButtons,
  container: defaultContainer
} as NavigationStyle
