import React, { Component} from 'react';
import { View } from 'react-native';

import Button from '../Button/';
import { AppButtonProps } from '../Button/';

import { default as defaultStyle, ButtonsStyle } from '../../styles/defaults/buttons';
import { PressEventOptions } from '../Button/';

import { destructureStyles } from '../../utilis/destructure';
export interface ButtonsProps {
  buttons: AppButtonProps[];
  onPress: (options: PressEventOptions) => void
  style?: ButtonsStyle
};

export default class Buttons extends Component<ButtonsProps> {
  private style: ButtonsStyle;
  private defaultStyle: ButtonsStyle = defaultStyle;

  constructor(props: ButtonsProps) {
    super(props);
    this.style = destructureStyles(this.props.style, this.defaultStyle);
    this.onPress = this.onPress.bind(this);
  }

  onPress(options: PressEventOptions): void {
    this.props.onPress(options);
  }

  render() {
    return (
      <View style={this.style.buttonsContainerStyle}>
        {this.props.buttons.map((button, ind) => {
          return (
            <Button
              key={ind}
              onPress={
                (typeof button.onPress === 'function')
                  ? button.onPress
                  : () => { }
              }
              navigateOnPress={
                button.route
                  ? () => this.onPress({ route: button.route })
                  : undefined
              }
              title={button.title}
              style={this.style.buttonStyle}
            />
          )
        })}
      </View>
    );
  }
};