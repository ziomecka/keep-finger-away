import { default as variables } from '../../variables/';
import { ViewStyle, TextStyle } from 'react-native';

export interface SelectStyle {
  picker?: ViewStyle,
  container?: ViewStyle,
  pickerItem?: TextStyle
};

export default {
  container: {
    borderRadius: variables.other.selectBorderRadius,
    backgroundColor: variables.colors.selectBackgroundBasic,
    width: variables.sizes.widthSelect,
    flex: 0,
    alignItems: 'center',
    flexDirection: 'row',
  },
  picker: {
  },
  pickerItem: {
  },
} as SelectStyle;
