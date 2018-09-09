import { default as variables } from '../../variables/';
import { ContainerStyle } from '../container/';

export default {
  width: variables.sizes.widthButtonContainerBasic,
  height: variables.sizes.heightButtonContainerBasic,
  backgroundColor: variables.colors.buttonContainerBackgroundBasic,
  flex: 0,
  alignItems: 'center',
  borderRadius: variables.other.standardBorderRadius,
  elevation: 6,
  opacity: 1,
  margin:
    variables.margins.buttonContainerMargin,
  padding:
    variables.margins.buttonContainerPadding,
} as ContainerStyle;
