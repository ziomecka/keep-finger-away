import { ViewStyle } from 'react-native';

export interface ButtonStyle {
  buttonStyle?: ViewStyle;
  buttonContainer?: ViewStyle;
}

import {default as buttonContainer} from './button.container'
export default {
  buttonStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 1
  },
  buttonContainer: buttonContainer
} as ButtonStyle;