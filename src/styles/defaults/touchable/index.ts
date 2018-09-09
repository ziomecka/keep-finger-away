import { ViewStyle, Dimensions } from 'react-native';
import variables from '../../variables/';

import { default as settings } from '../../../settings';

let color = settings.debugLayout
  ? 'yellow'
  : 'transparent';

export interface TouchableStyle {
  container: ViewStyle,
  animatedContainer?: ViewStyle,
};

const screenWidth = Dimensions.get('screen').width;

export default {
  container: {
    width: screenWidth,
    flex: 0,
    position: 'absolute',
    bottom: variables.positions.touchableContainerBottom,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color,
    zIndex: variables.zindex.touchableZindex
  },
  animatedContainer: {
    width: variables.sizes.widthTouchable,
    height: variables.sizes.heightTouchable,
    marginTop: variables.margins.touchableBottom,
    marginBottom: variables.margins.touchableBottom,
  }
} as TouchableStyle;