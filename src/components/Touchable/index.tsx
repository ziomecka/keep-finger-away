import React, { Component } from 'react';
import {
  View,
  PanResponder,
  PanResponderInstance,
  Animated,
  TouchableHighlight
} from 'react-native';

import { default as defaultStyle } from '../../styles/defaults/touchable';
import { TouchableStyle } from '../../styles/defaults/touchable';
import { default as settings } from '../../settings';

import AppText from '../AppText';
import AppCircle from '../AppCircle/';

import { destructureStyles } from '../../utilis/destructure';

import GameStateEnum from '../../enumerations/game.state';

export interface TouchableProps {
  style?: TouchableStyle;
  startCount: () => void;
  endGame: () => void;
  gameState: GameStateEnum.GameState;
  prevGameState: GameStateEnum.GameState | undefined;
  messages: any;
  setRef: (element: any) => void;
  states: any;
}

export interface TouchableState {
  scaleAnim: any; // resizing the button
  opacityAnim: any; // fading out the text
  opacity: number;
  stopAnimate: boolean;
}

export default class Touchable extends Component<
  TouchableProps,
  TouchableState
  > {
    private panResponder: PanResponderInstance;
    private duration: number = settings.touchableAnimationDuration;
    private scaleAnim: number[] = settings.touchableAnimationScale;
    private style: TouchableStyle;
    private defaultStyle: TouchableStyle = defaultStyle;
    // private started: GameStateEnum.GameState = started;
    private listener: null | Function = () => { }

    constructor(props: TouchableProps) {
      super(props);

      this.state = {
        scaleAnim: new Animated.Value(this.scaleAnim[0]), // Initial value for transform scale
        opacityAnim: new Animated.Value(1), // Initial value for text opacity
        stopAnimate: false,
        opacity: 1
      };

      // this.count, this.started etc;
      Object.assign(this, this.props.states);

      this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => true,
      onStartShouldSetPanResponderCapture: (e, gestureState) => true,
      onPanResponderStart: () => {
        this.props.startCount();
      },
      onPanResponderRelease: (e, gestureState) => {
        this.props.endGame();
      },
    });

    this.eventListener = this.eventListener.bind(this);
    this.style = destructureStyles(this.props.style, this.defaultStyle);
    this.listener = this.state.opacityAnim.addListener(this.eventListener);
  }

  eventListener(obj: { value: number }) {
    this.setState({
      opacity: obj.value
    });
  }

  animateButton(value: boolean) {
    this.setState(() => {
      return {
        stopAnimate: !value
      };
    }, () => {
      if (value) {
        this.animateButtonIncrease();
      }
    });
  }

  componentDidUpdate(prevProps: TouchableProps) {
    const { gameState, prevGameState } = this.props;

    if (gameState !== prevGameState) {
      switch (gameState) {
        // @ts-ignore
        case this.started:
          this.animateButton(true);
          this.animateTextShow();
          break;
        // @ts-ignore
        case this.count:
          this.animateButton(false);
          this.animateTextShow();
          break;
        default:
          this.animateButton(false);
          this.animateTextHide();
          break;
      }
    }
  }

  componentWillUnmount() {
    this.reset();
  }

  reset() {
    this.setState({
      stopAnimate: false
    });
    this.state.scaleAnim.setValue(0);
    this.state.opacityAnim.removeListener(this.listener);
    this.listener = null;
    this.state.opacityAnim.stopAnimation();
    this.state.opacityAnim.setValue(1);
  }

  animateButtonDecrease(): void {
    let value = this.scaleAnim[0];

    Animated.timing(
      this.state.scaleAnim, {
        toValue: value,
        duration: this.duration,
      }
    ).start(
      () => {
        if (!this.state.stopAnimate) {
          this.animateButtonIncrease();
        }
      }
    );
  }

  animateTextShow(): void {
    Animated.timing(
      this.state.opacityAnim, {
        toValue: 1,
        duration: 100,
      }
    ).start();
  }

  animateTextHide(): void {
    Animated.timing(
      this.state.opacityAnim, {
        toValue: 0,
        duration: 90,
      }
    ).start();
  }

  animateButtonIncrease(): void {
    let value = this.scaleAnim[1];

    Animated.timing(
      this.state.scaleAnim, {
        delay: 300, // So the touchable is measured before
        toValue: value,
        duration: this.duration,
      }
    ).start(
      () => {
        if (!this.state.stopAnimate) {
          this.animateButtonDecrease();
        }
      }
    );
  }

  render() {
    let {touchable} = this.props.messages;
    const message = touchable
      ? touchable[this.props.gameState] || ''
      : '';
    touchable = null;

    return (
      <View style={this.style.container}>
        <Animated.View>
          <AppText
            textStyle="additionalMessage"
            animatedStyle={{
              opacity: this.state.opacity
            }}
          >
            {message}
          </AppText>
        </Animated.View>

        <Animated.View
          {...this.panResponder.panHandlers}
          style={{
            ...this.style.animatedContainer,
            transform: [{ scale: this.state.scaleAnim }]
          }}
          ref={(ref: Component) => this.props.setRef(ref)}
          >
          <TouchableHighlight>
            <AppCircle></AppCircle>
          </TouchableHighlight>
        </Animated.View>
      </View>
    );
  }
}