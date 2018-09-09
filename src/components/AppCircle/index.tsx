import React, { Component } from 'react';

import {
  default as defaultStyle, AppCircleStyle
} from '../../styles/defaults/appcircle/'

import AppRadialGradient from '../AppRadialGradient/';

import { destructureStyles } from '../../utilis/destructure';

import Svg, {
  Defs, RadialGradient, Circle, Stop, Units, StopProps
} from 'react-native-svg';

export interface AppCircleProps {
  style?: AppCircleStyle;
}

export interface AppCircleState {
}

export default class AppCircle extends Component<
  AppCircleProps,
  AppCircleState
  > {
  private style: AppCircleStyle;
  private defaultStyle: AppCircleStyle = defaultStyle;
  private gradientId: string = 'grad';
  private gradientUnits: Units = 'userSpaceOnUse';
  private color: string = require('../../styles/variables/colors').default.red;

  constructor(props: AppCircleProps) {
    super(props);

    if (this.props.style) {
      this.style = destructureStyles(this.props.style, this.defaultStyle);
    } else {
      this.style = this.defaultStyle;
    }
  }

  get radialGradient() {
    if (this.style.gradient && this.style.stops) {
      return (
        <AppRadialGradient></AppRadialGradient>
      );
    }
  }

  get circle() {
    let fill: string;

    if (this.style.gradient && this.style.stops) {
      fill = `url(#${this.gradientId})`;
    } else {
      fill = this.color;
    }

    return (
      <Circle
        {...this.style.circle}
        fill={fill}
      />
    );
  }

  render() {
    return (
      <Svg
        height={this.style.height}
        width={this.style.width}
      >
        <Defs>
          {this.radialGradient}
        </Defs>
        {this.circle}
      </Svg>
    );
  }
}