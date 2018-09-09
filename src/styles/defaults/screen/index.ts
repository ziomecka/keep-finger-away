import { ScreenStyle } from './';

import { default as defaultHeadingContainer } from '../heading-container/';
import { default as defaultBackgroundImage } from '../background-image/';
import { default as defaultMainContainer } from '../main-container/';
import { default as defaultContentContainer } from '../content-container/';
import { default as defaultNavigation } from '../navigation/';
import { NavigationStyle } from '../navigation/';
import { ViewStyle, ImageStyle } from 'react-native';

export interface ScreenStyle {
  headingContainer?: ViewStyle;
  backgroundImage?: ImageStyle;
  mainContainer?: ViewStyle;
  contentContainer?: ViewStyle;
  navigation?: NavigationStyle;
};

export default {
  headingContainer: defaultHeadingContainer,
  backgroundImage: defaultBackgroundImage,
  mainContainer: defaultMainContainer,
  contentContainer: defaultContentContainer,
  navigation: defaultNavigation
} as ScreenStyle;