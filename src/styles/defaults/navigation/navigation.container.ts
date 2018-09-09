import { default as variables } from '../../variables/';
import { ContainerStyle } from '../container/';

import { default as settings } from '../../../settings';
let color = settings.debugLayout ? 'grey' : variables.colors.navigationContainerBackgroundBasic;

export default {
  width: '100%',
  opacity: 1,
  height: variables.sizes.heightNavigationContainer,
  backgroundColor: color,
  flex: 0,
  flexDirection: 'row',
  marginBottom: variables.margins.navigationMargin,
} as ContainerStyle;
