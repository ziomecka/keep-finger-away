import { RadialGradientProps, StopProps } from 'react-native-svg';
import { default as variables } from '../../variables/';

const { sizes, colors } = variables;
const { widthTouchable, heightTouchable } = sizes;
const { touchableInside, touchableOutside } = colors;

export interface AppRadialGradientStyle {
  gradient?: RadialGradientProps;
  stops?: StopProps[];
}

export default {
  gradient: {
    cx: (widthTouchable / 2).toString(),
    cy: (heightTouchable / 2).toString(),
    rx: (widthTouchable / 2).toString(),
    ry: (heightTouchable / 2).toString(),
    fx: '25%',
    fy: '25%',
  },
  stops: [
    {
      offset: '0%',
      stopColor: touchableInside,
      stopOpacity: '1',
    },
    {
      offset: '100%',
      stopColor: touchableOutside,
      stopOpacity: '0.4',
    },
  ],
} as AppRadialGradientStyle;
