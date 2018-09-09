import React, { Component } from 'react';
import Svg, {
  Defs, LinearGradient, Polygon, Stop
} from 'react-native-svg';
import variables from '../../../../styles/variables';

export interface BladeProps {
  width: number;
  height: number;
}

import { default as bladePoints } from './polygon.points';
const {
  bladeFirstColor,
  bladeSecondColor,
  bladeShadowFirstColor,
  bladeShadowSecondColor,
  bladeStrokeColor
} = variables.colors;

export interface BladeState { }

export default class Blade extends Component<BladeProps, BladeState> {
  constructor(props: BladeProps) {
    super(props);
  }

  render() {
    return (
      <Svg height={this.props.height} width={this.props.width}>
        <Defs>
          <LinearGradient id="gradBlade" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor={bladeFirstColor} stopOpacity="1" />
            <Stop offset="100%" stopColor={bladeSecondColor} stopOpacity="1" />
          </LinearGradient>
          <LinearGradient id="gradShadow" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor={bladeShadowFirstColor} stopOpacity="1" />
            <Stop offset="99.8%" stopColor={bladeShadowFirstColor} stopOpacity="1" />
            <Stop offset="100%" stopColor={bladeShadowSecondColor} stopOpacity="0.9" />
          </LinearGradient>
        </Defs>
        <Polygon
          x="2"
          y="2"
          points={bladePoints}
          fill="url(#gradShadow)"
          scale="0.9"
          />
        <Polygon
          points={bladePoints}
          fill="url(#gradBlade)"
          stroke={bladeStrokeColor}
          strokeWidth="1"
          scale="0.9"
        />
      </Svg>
    );
  }
}
