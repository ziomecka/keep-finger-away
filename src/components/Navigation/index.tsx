import React, { Component } from 'react';
import { View } from 'react-native';
import { AppButtonProps, PressEventOptions } from '../Button/';

import Buttons from '../Buttons/';

import {
  default as defaultStyle,
  NavigationStyle,
} from '../../styles/defaults/navigation';

import RoutesEnum from '../../enumerations/routes';

const routes = RoutesEnum.Routes;

import LevelEnum from '../../enumerations/level';
import { NavigationComponent } from '../../../node_modules/@types/react-navigation';
import LevelToast from '../LevelToast';

import { destructureStyles } from '../../utilis/destructure';
export interface NavigationDetails {
  buttons: AppButtonProps[];
  messages?: {levelToast?: string}
}

export interface NavigationProps {
  navigation?: NavigationComponent;
  style?: NavigationStyle;
  navigationDetails: NavigationDetails;
  navigationOptions: any;
  level: string | undefined;
}

export interface NavigationState {
  routeName: RoutesEnum.Routes
  showLevelToast: boolean;
}
export default class Navigation extends Component<NavigationProps, NavigationState> {
  private style: NavigationStyle;
  private defaultStyle: NavigationStyle = defaultStyle;
  constructor(props: NavigationProps) {
    super(props);

    this.state = {
      routeName: routes.Home,
      showLevelToast: false
    };

    this.style = destructureStyles(this.props.style, this.defaultStyle);

    this.onPress = this.onPress.bind(this);
  }

  navigate(route: RoutesEnum.Routes) {
    // @ts-ignore
    this.setState(() => {
      return {
        routeName: route
      };
    }, () => {
      // @ts-ignore
      this.props.navigation.navigate(
        this.state.routeName, this.props.navigationOptions
      );
    });
  }

  onPress(options: PressEventOptions): void {
    let selected = !this.levelNotSelected(this.props.level);

    /** Level selected.
     *  Change state showLevelToast to false and navigate.
     * */
    if (selected) {
      this.setState(() => {
        return {
          showLevelToast: false
        };
      }, () => {
        let { route } = options;
        if (route) {
          this.navigate(route);
        }
      })
    } else {
      /** Level not selected. */
      this.setState({
        showLevelToast: true
      });
    }
  }

  levelNotSelected(level: string | undefined): boolean {
    if (level === undefined) {
      throw new Error('Level is undefined');
    }
    return level === String(LevelEnum.Level.level);
  }

  render() {
    return (
      <View style={this.style.container}>
        <LevelToast
          show={this.state.showLevelToast}
          message={this.props.navigationDetails.messages ?
            this.props.navigationDetails.messages.levelToast :
            ''
          } />
        <Buttons
          buttons={this.props.navigationDetails.buttons}
          onPress={(options) => {
            this.onPress(options);
          }}
          style={this.style.buttons}
        />
      </View>
    );
  }
}
