import React, { Component } from 'react';
import { Animated } from 'react-native';
import { default as settings } from '../../settings';
import { default as defaultStyle, AnimFallStyle } from '../../styles/defaults/animfall';
import { destructureStyles } from '../../utilis/destructure';
import GameStateEnum from '../../enumerations/game.state';

export interface AnimFallProps {
  top: [number, number]; // top, down position of the falling item
  duration: number;
  // measure: Function;
  gameState: GameStateEnum.GameState;
  prevGameState: GameStateEnum.GameState | undefined;
  endGame?: () => void;
  lost: () => void;
  style?: AnimFallStyle;
  touchablePageY: number | undefined;
  touchableHeight: number;
  bladeHeight: number;
  bladeTop: number;
  resultAlreadySet?: () => boolean; // gameState === won || lost || falstart
  gameEnded: () => boolean;
  states: any;
};

export interface AnimFallState {
  anim: any;
  pageY: number | undefined;
  bladePageY: number | undefined;
};

export default class AnimFall extends Component<
  AnimFallProps,
  AnimFallState
  > {
  private resetDuration: number = settings.animFallResetDuration;
  private defaultStyle: AnimFallStyle = defaultStyle;
  private style: AnimFallStyle;
  private listener: null | Function = () => { };
  // private timeout: NodeJS.Timer | number | null = null;

  constructor(props: AnimFallProps) {
    super(props);

    this.state = {
      anim: new Animated.Value(this.props.top[0]),
      pageY: undefined,
      bladePageY: undefined
    };

    // this.count, this.started etc;
    Object.assign(this, this.props.states);

    this.style = destructureStyles(this.props.style, this.defaultStyle);

    this.eventListener = this.eventListener.bind(this);
    this.listener = this.state.anim.addListener(this.eventListener);
  }

  // componentDidMount() {
  //   this.timeout = setTimeout(async() => {
  //     let result = await this.props.measure();
  //     this.setState({
  //       bladePageY: result
  //     });
  //   }, 50);
  // }

  componentWillUnmount() {
    this.reset();
  }

  eventListener (obj: { value: number }) {
    let {
      touchablePageY,
      touchableHeight,
      bladeHeight,
      bladeTop,
      gameState
    } = this.props;

    let { bladePageY } = this.state;
    let { cutFinger } = GameStateEnum.GameState;

    if (gameState === cutFinger && touchablePageY && bladePageY) {
      let bladeY = obj.value + bladePageY + bladeHeight - bladeTop;
      let touchableY = touchablePageY + touchableHeight / 2;
      if (bladeY >= touchableY) {
        this.props.lost();
      }
    }
  }

  reset() {
    this.state.anim.removeListener(this.listener);
    this.listener = null;
    this.setState({
      pageY: undefined,
      bladePageY: undefined
    });
    // this.clearTimeout();
  }

  // clearTimeout() {
  //   clearTimeout(this.timeout as number);
  //   this.timeout = null;
  // }

  componentDidUpdate(prevProps: AnimFallProps) {
    const { gameState, prevGameState } = this.props;

    if (gameState !== prevGameState) {
      switch (true) {
        // @ts-ignore
        case (gameState === this.cutFinger):
        this.animate(true);
        break;
        case (this.props.gameEnded()):
          this.state.anim.stopAnimation();
          break;
        // @ts-ignore
        case (gameState === this.started):
          this.animate(false, this.resetDuration);
          break;
        default:
          break;
      }
    }
  }

  /** True fall down, false go up */
  animate(down: boolean, duration: number = this.props.duration) {
    Animated.timing(
      this.state.anim, {
        toValue: this.props.top[Number(down)],
        duration: duration
      }
    ).start();
  }

  render() {
    return (
      <Animated.View
        style={{
          top: this.state.anim,
          ...this.style.animFallContainer
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
};