import React from 'react';
import { NativeModules, View, Image } from 'react-native';

import { Root, Container } from 'native-base';

import Route from './src/components/Root/';

import LevelEnum from './src/enumerations/level';
import LanguageEnum from './src/enumerations/language';

import FontContext from './src/contexts/font';
import { Font, Asset, AppLoading } from 'expo';

const doubleFeature = require('./src/assets/fonts/DoubleFeature.ttf'); // heading
const robotoMedium = require('native-base/Fonts/Roboto_medium.ttf'); // used by Toast
const leiraLite = require('./src/assets/fonts/LeiraLite.ttf'); // 'put your finger' message

const icon = require('./assets/images/icon.png');
export interface AppScreenProps {
  level: string;
  language: LanguageEnum.Language;
}

interface AppProps { }

interface AppState {
  level: string;
  fontsLoaded: boolean;
  imageLoaded: boolean;
}

export default class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      level: String(LevelEnum.Level.easy),
      fontsLoaded: false,
      imageLoaded: false
    };

    this.navigationChange = this.navigationChange.bind(this);
  }

  async componentDidMount() {
    // try {
    //   await Font.loadAsync({
    //     DoubleFeature: doubleFeature, // heading
    //     Roboto_medium: robotoMedium, // used by Toast
    //     LeiraLite: leiraLite // 'put your finger' message
    //   });

    //   this.setState({
    //     fontsLoaded: true,
    //   });
    // } catch (err) {
    //   console.warn('Font not loaded');
    // }
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

  async _cacheImageAsync() {
    return Asset.fromModule(icon).downloadAsync();
  }

  async _cacheFontsAsync() {
    const fonts = [doubleFeature, leiraLite, robotoMedium].map(font => {
      return Font.loadAsync(font)
    });
    await Promise.all(fonts);
    this.setState({ fontsLoaded: true });
  }

  render() {
    if (!this.state.imageLoaded) {
      return <AppLoading
        startAsync={this._cacheImageAsync}
        onFinish={() => { this.setState({ imageLoaded: true }) }}
        onError={console.warn}
      />
    }

    if (!this.state.fontsLoaded) {
      return (
        <View style={{ flex: 1 }}>
          <Image
            source={icon}
          />
        </View>
      )
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
