import React, { Component } from 'react';
import {
  View, Image, ImageURISource,
} from 'react-native';

import Navigation, { NavigationDetails } from '../../components/Navigation/';
import AppText from '../../components/AppText/';

import {
  NavigationScreenOptionsGetter,
  NavigationScreenProps,
} from '../../interfaces/navigator';

import PositionEnum from '../../enumerations/position';
import {
  default as defaultStyle, ScreenStyle
} from '../../styles/defaults/screen/';

import { NavigationStyle } from '../../styles/defaults/navigation';
import { default as variables } from '../../styles/variables/';

import {
  default as destructure, destructureStyles
} from '../../utilis/destructure';

const uri = require('../../assets/images/background.jpg');

export interface ScreenProps {
  navigation?: NavigationScreenOptionsGetter<NavigationScreenProps> | undefined;
  navigationDetails: NavigationDetails;
  navigationPosition?: PositionEnum.Position; // bottom | top
  style?: ScreenStyle | undefined;
  children?: any;
  heading?: string;
  uri?: ImageURISource;
  topComponents?: any[];
  navigationOptions?: Object;
  level: string;
}

export interface ScreenState {
}

export default class Screen extends Component<
  ScreenProps,
  ScreenState
  > {
  private style: ScreenStyle;
  private defaultStyle: ScreenStyle = defaultStyle;

  constructor(props: ScreenProps) {
    super(props);

    this.style = destructureStyles(this.props.style, this.defaultStyle);
  }

  renderHeading(styles: any) {
    if (this.props.heading && this.props.heading.length > 0) {
      return (
        <View style={styles.headingContainer}>
          <AppText textStyle='h1'>
            {this.props.heading}
          </AppText>
        </View>
      );
    }

    return null;
  }

  renderNavigation (styles: Object, navStyle: Object) {
    let nav = destructure(navStyle, styles) as NavigationStyle;

    if (this.props.navigation && this.props.navigationDetails) {
      return (
        <Navigation
          navigation={this.props.navigation}
          navigationDetails={this.props.navigationDetails}
          style={nav}
          navigationOptions={this.props.navigationOptions}
          level={this.props.level}
        />
      );
    }
  }

  get navigationPadding() {
    return {
      paddingTop: this.navigationTop
        ? variables.sizes.totalHeightNavigation
        : 0,
      paddingBottom: this.navigationBottom
        ? variables.sizes.totalHeightNavigation
        : 0
    };
  }

  renderContent(styles: ScreenStyle) {
    return (
      <React.Fragment>
        {this.navigationTop
          ? this.renderNavigation(styles.navigation || {}, {})
          : undefined
        }
        <View style={{
          ...styles.contentContainer,
          ...this.navigationPadding
        }}>
          {this.renderHeading(styles)}
          {this.navigationCenter
            ? this.renderNavigation(styles.navigation || {}, {})
            : undefined
          }
          {this.props.children}
        </View>
        {this.navigationBottom
          ? this.renderNavigation(styles.navigation || {}, {
            container: {
              position: 'absolute',
              bottom: variables.positions.navigationBottom,
              zIndex: 99
            },
            buttons: {}
          })
          : undefined
        }
      </React.Fragment>
    );
  }

  get navigationTop() {
    const { top } = PositionEnum.Position;
    return (this.props.navigationPosition === top);
  }
  
  get navigationBottom() {
    const { bottom } = PositionEnum.Position;
    return (this.props.navigationPosition === bottom);
  }

  get navigationCenter() {
    return (!this.navigationBottom && !this.navigationTop);
  }

  render() {
    return (
      <React.Fragment>
        <Image
        style={this.style.backgroundImage}
        source={uri}
        />
        <View style={this.style.mainContainer}>
          {this.renderContent(this.style)}
        </View>
      </React.Fragment>
    );
  }
}