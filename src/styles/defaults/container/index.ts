import { ContainerStyle } from '../container/';
import { ViewStyle } from 'react-native';

import { default as settings } from '../../../settings';
let color = settings.debugLayout ? 'violet' : 'transparent';

export interface ContainerStyle extends ViewStyle {
};

export default {
  flex: 1,
  backgroundColor: color,
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 1
} as ContainerStyle;