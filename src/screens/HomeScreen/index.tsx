import React, { Component } from 'react';

import Screen from '../Screen/';
import { default as defaultStyle, ScreenStyle } from '../../styles/defaults/screen/';
import { NavigationDetails } from '../../components/Navigation/';
import { NavigationComponent } from 'react-navigation';

import SelectLevel from '../../components/SelectLevel/';
import LevelEnum from '../../enumerations/level';

import { AppScreenProps } from '../../../App';

export interface HomeScreenProps {
  navigation: NavigationComponent
  screenProps: AppScreenProps
}

export interface HomeScreenState {
  level: string
}

export default class HomeScreen extends Component<
  HomeScreenProps,
  HomeScreenState
> {

  private selectNavigationDetails: Function = require('./navigation/').default;
  private navigationDetails: NavigationDetails;
  private messages = require('./messages').default;

  private style: ScreenStyle;
  private defaultStyle: ScreenStyle = defaultStyle;

  constructor(props: HomeScreenProps) {
    super(props);

    this.state = {
      level: this.props.screenProps.level
    };

    this.style = this.defaultStyle;

    this.navigationDetails =
      this.selectNavigationDetails(this.props.screenProps.language);
    this.onLevelChange = this.onLevelChange.bind(this);
  }

  onLevelChange(level: LevelEnum.Level) {
    this.props.navigation.setParams({ level });
  }

  render() {
    const language = this.props.screenProps.language || 'en_US';

    return (
      <Screen
        navigation={this.props.navigation}
        navigationDetails={this.navigationDetails}
        style={this.style}
        heading={
          this.messages[language]
            ? this.messages[language].heading
            : ''
        }
        level={this.props.screenProps.level}
        >
        <SelectLevel
          onChange={this.onLevelChange}
          selectedValue={this.props.screenProps.level}
          toastMessage={
            this.messages[this.props.screenProps.language]
              ? this.messages[this.props.screenProps.language].levelToast
              : ''
          }
          language={this.props.screenProps.language}
        />
      </Screen>
    );
  }
}