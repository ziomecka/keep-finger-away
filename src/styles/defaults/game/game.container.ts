import { ContainerStyle } from '../container/';

import { default as settings } from '../../../settings';
let color = settings.debugLayout ? 'orange' : 'transparent';

export default {
  backgroundColor: color,
  flex: 1
} as ContainerStyle;
