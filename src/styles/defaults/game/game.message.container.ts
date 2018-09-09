import { ContainerStyle } from '../container/';

import { default as settings } from '../../../settings';
import { default as variables } from '../../variables/';

let color = settings.debugLayout ? 'red' : 'transparent';

export default {
  height: variables.sizes.gameMessageHeight,
  flex: 0,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: color,
  top: variables.positions.gameMessageTop,
  zIndex: variables.zindex.gameMessageContainerZindex
} as ContainerStyle;
