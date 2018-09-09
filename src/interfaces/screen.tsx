import { AppButtonProps } from '../components/Button';
import { ScreenStyle } from '../styles/defaults/screen';

import {
  NavigationScreenOptionsGetter,
  NavigationScreenProps,
  Routes,
  RouteParams
} from './navigator';

export interface ScreenProps {
  navigation: NavigationScreenOptionsGetter<NavigationScreenProps>;
  routes?: Routes;
  buttons?: AppButtonProps[];
  style?: ScreenStyle;
  children?: any;
};

export interface ScreenState {
  routeParams?: RouteParams
};