import { ContainerStyle } from '../container/';

import { default as settings } from '../../../settings';
import { default as variables } from '../../variables/';

let color = settings.debugLayout ? 'blue' : 'transparent';

export default {
  backgroundColor: color,
  top: variables.positions.bloodTop
} as ContainerStyle;
