import React, { Component } from 'react';
import { Text, TextStyle } from 'react-native';
import { AppTextStyle } from '../../styles/defaults/apptext';
import { default as defaultStyle } from '../../styles/defaults/apptext';
import FontContext from '../../contexts/font';
import { destructureStyles } from '../../utilis/destructure';

export interface AppTextProps {
  textStyle: string; // basic || accent || button || h1 || h1FontFamily
  allLowerCase?: boolean;
  style?: AppTextStyle;
  animatedStyle?: TextStyle
}

export default class AppText extends Component<AppTextProps> {
  private style: AppTextStyle;
  private allLowerCase: boolean;
  private defaultStyle: AppTextStyle = defaultStyle;

  constructor(props: AppTextProps) {
    super(props);

    this.allLowerCase = (this.props.allLowerCase !== undefined)
      ? this.props.allLowerCase
      : true;

    this.style = destructureStyles(this.props.style, this.defaultStyle);
  }

  render() {
    const regexp = new RegExp(
      `\.*${this.props.textStyle}\.*family\.*`, 'gi'
    );

    const customFontFamilyName: string | undefined =
    Object.keys(this.style).find(item => {
      return regexp.test(item);
    });

    const customFont: AppTextStyle | undefined =
    customFontFamilyName
    ? {
      // @ts-ignore
      ...this.style[customFontFamilyName],
      // @ts-ignore
      ...this.style[this.props.textStyle || 'basic']
    }
    : {
      // @ts-ignore
      ...this.style[this.props.textStyle || 'basic']
    };

    return <FontContext.Consumer>
      {font => (
        // @ts-ignore
        <Text style={font
          ? { ...customFont, ...this.props.animatedStyle }
          : { ...this.style.basic, ...this.props.animatedStyle }}>
          {
            (this.allLowerCase)
            ? String(this.props.children).toLowerCase()
            : this.props.children
          }
        </Text>
      )}
    </FontContext.Consumer>;
  }
}