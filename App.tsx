import React from 'react';
import { NativeModules } from 'react-native';

import { Root, Container } from 'native-base';

import Route from './src/components/Root/';

import LevelEnum from './src/enumerations/level';
import LanguageEnum from './src/enumerations/language';

import FontContext from './src/contexts/font';
import { Font, AppLoading } from 'expo';

const DoubleFeature = require('./src/assets/fonts/DoubleFeature.ttf'); // heading
const Roboto_medium = require('native-base/Fonts/Roboto_medium.ttf'); // used by Toast
const LeiraLite = require('./src/assets/fonts/LeiraLite.ttf'); // 'put your finger' message

export interface AppScreenProps {
  level: string;
  language: LanguageEnum.Language;
}
interface AppProps { }
interface AppState {
  level: string;
  fontsLoaded: boolean;
}
export default class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      level: String(LevelEnum.Level.easy),
      fontsLoaded: false,
    };

    this.navigationChange = this.navigationChange.bind(this);
  }

  get locale(): LanguageEnum.Language {
    let native = NativeModules.I18nManager.localeIdentifier; // 'pl_PL'
    return (
      LanguageEnum.Language[native]
        ? LanguageEnum.Language[native]
        : LanguageEnum.Language.en_US
    ) as LanguageEnum.Language;
  }

  navigationChange(prevState: any, currentState: any) {
    if (currentState.routes[0].params.level !== undefined) {
      this.setState({
        level: currentState.routes[0].params.level,
      });
    }
  }

  async _cacheFontsAsync() {
    return Font.loadAsync({ DoubleFeature, LeiraLite, Roboto_medium });
  }

  render() {
    if (!this.state.fontsLoaded) {
      return (
        <AppLoading
          startAsync={this._cacheFontsAsync}
          onFinish={() => {
            this.setState({ fontsLoaded: true });
          }}
          onError={console.warn}
        />
      );
    }

    return (
      // Root is needed to display Toasts in application
      <Root>
        {/* Container is needed to display Toasts in application */}
        <Container>
          <FontContext.Provider value={this.state.fontsLoaded}>
            <Route
              screenProps={{
                level: this.state.level,
                language: this.locale
              }}
              onNavigationStateChange={this.navigationChange}
            />
          </FontContext.Provider>
        </Container>
      </Root>
    );
  }
}
