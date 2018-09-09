import { ContainerStyle } from '../container/';

import { default as settings } from '../../../settings';
let color = settings.debugLayout ? 'grey' : 'transparent';

export default {
  flex: 0,
  height: '100%',
  width: '100%',
  alignItems: 'center',
  backgroundColor: color,
} as ContainerStyle;
