import { CircleProps, RadialGradientProps, StopProps } from 'react-native-svg';
import { default as variables } from '../../variables/';
import { default as radialGradient } from '../appradialgradient/';

const { widthTouchable, heightTouchable } = variables.sizes;

export interface AppCircleStyle {
  height: number;
  width: number;
  circle: CircleProps;
  gradient?: RadialGradientProps;
  stops?: StopProps[];
};

export default {
  height: heightTouchable,
  width: widthTouchable,
  circle: {
    cx: (widthTouchable / 2).toString(),
    cy: (heightTouchable / 2).toString(),
    r: (heightTouchable / 2).toString(),
  },
  ...radialGradient
} as AppCircleStyle;