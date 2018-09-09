import React, { Component } from 'react';

import {
  default as defaultStyle, AppRadialGradientStyle
} from '../../styles/defaults/appradialgradient/';

import { destructureStyles } from '../../utilis/destructure';

import {
  RadialGradient,
  Stop,
  Units,
  StopProps,
} from 'react-native-svg';

export interface AppRadialGradientProps {
  style?: AppRadialGradientStyle;
}

export interface AppRadialGradientState {}

export default class AppRadialGradient extends Component<
  AppRadialGradientProps,
  AppRadialGradientState
> {
  private style: AppRadialGradientStyle;
  private defaultStyle: AppRadialGradientStyle = defaultStyle;
  private gradientId: string = 'grad';
  private gradientUnits: Units = 'userSpaceOnUse';

  constructor(props: AppRadialGradientProps) {
    super(props);

    if (this.props.style) {
      this.style = destructureStyles(this.props.style, this.defaultStyle);
    } else {
      this.style = this.defaultStyle;
    }
  }

  render() {
    return (
      <RadialGradient
          id={this.gradientId}
          gradientUnits={this.gradientUnits}
          {...this.style}
        >
        {this.style && this.style.stops
          ? this.style.stops.map((stop: StopProps, ind) => {
            return <Stop key={ind} {...stop} />;
          })
          : ''}
      </RadialGradient>
    );
  }
}
