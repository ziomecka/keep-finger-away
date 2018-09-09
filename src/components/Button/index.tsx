import React, { Component } from 'react';
import {
  View,
  TouchableNativeFeedback,
  NativeSyntheticEvent,
  NativeTouchEvent,
  ButtonProps,
} from 'react-native';

import AppText from '../AppText/';

import RoutesEnums from '../../enumerations/routes';

import { ButtonStyle } from '../../styles/defaults/button';
import { default as defaultStyle } from '../../styles/defaults/button';
import { destructureStyles } from '../../utilis/destructure';

export interface PressEventOptions {
  route: RoutesEnums.Routes | undefined;
  callback?: Function | undefined;
};
export interface AppButtonProps extends ButtonProps {
  title: string;
  onPress: () => void;
  navigateOnPress?: (options: PressEventOptions) => void;
  color?: string;
  style?: ButtonStyle;
  route?: RoutesEnums.Routes;
};

export default class Button extends Component<AppButtonProps> {
  private style: ButtonStyle;
  private defaultStyle: ButtonStyle = defaultStyle;

  constructor(props: AppButtonProps) {
    super(props);
    this.style = destructureStyles(this.props.style, this.defaultStyle);
    this.onPress = this.onPress.bind(this);
  }

  // @ts-ignore
  onPress(e: NativeSyntheticEvent<NativeTouchEvent>) {
    const options: PressEventOptions = {
      route: this.props.route,
    };

    if (typeof this.props.navigateOnPress === 'function') {
      this.props.navigateOnPress(options);
    } else {
      this.props.onPress()
    }
  }

  render() {
    let {
      buttonContainer = this.style.buttonContainer,
      buttonStyle = this.style.buttonStyle
    } = Object(this.props.style);

    return (
      <View style={...buttonContainer}>
        <TouchableNativeFeedback onPress={this.onPress}>
          <View style={...buttonStyle}>
            <AppText textStyle='button'>
              {this.props.title? this.props.title.toLowerCase() : ''}
            </AppText>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
};