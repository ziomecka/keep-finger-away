import { default as variables } from '../../variables/';
import { ContainerStyle } from '../container/';

import { default as settings } from '../../../settings';
let color = settings.debugLayout ? 'green' : 'transparent';


export default {
  width: '100%',
  height: variables.sizes.widthButtonsBasic,
  backgroundColor: color,
  flex: 0,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 1
} as ContainerStyle;
