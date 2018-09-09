import { Path } from 'react-native-svg';
import { Animated, Easing } from 'react-native';
import React, { Component } from 'react';
import { default as variables } from '../../styles/variables/';
// @ts-ignore
import {default as extractTransform} from 'react-native-svg/lib/extract/extractTransform';
import { default as dropPath } from './drop.path';
import { NativeProps } from '../../interfaces/native.props';

import destructure from '../../utilis/destructure';
import GameStateEnum from '../../enumerations/game.state';

const AnimatedPath = Animated.createAnimatedComponent(Path);
// const { lost, started } = GameStateEnum.GameState;

interface DropProps {
  rotation: number,
  scale: number,
  fill: any;
  originX: number;
  originY?: number;
  duration: number;
  gameState: GameStateEnum.GameState;
  prevGameState: GameStateEnum.GameState | undefined;
  states: any;
}

interface DropState {
  initAnim: any;
}

export default class Drop extends Component<DropProps, DropState> {
  // @ts-ignore
  private drop: any;
  private originY: number = 0;
  private randomX: number = 80; // how far left / right will move
  private randomY: number = 200; // how far down will move
  private x: number = 0;
  private y: number = 0;
  private defaultNativeProps: NativeProps;
  private listener: null | Function = () => { };
  private defaultColor: string = variables.colors.red;

  constructor(props: DropProps) {
    super(props);

    this.state = {
      initAnim: new Animated.ValueXY({ x: 0, y: 0 })
    };

    // this.count, this.started etc;
    Object.assign(this, this.props.states);

    this.defaultNativeProps = {
      rotation: props.rotation || 0,
      scaleX: props.scale,
      scaleY: props.scale,
      originX: props.originX,
      originY: props.originY || this.originY,
      skewX: 0,
      skewY: 0,
      x: this.x,
      y: this.y
    };

    this.eventListener = this.eventListener.bind(this);
    this.listener = this.state.initAnim.addListener(this.eventListener);
  }

  /** Gets default native props. */
  getNativeProps(value: NativeProps): NativeProps {
    return destructure(value, this.defaultNativeProps);
  }

  setNativeProps(value: { x: number, y: number }): void {
    this.drop.setNativeProps({
      matrix: extractTransform(this.getNativeProps(value))
    });
  }

  random(min: number, max: number, round: boolean = true): number {
    let random = Math.random() * max;
    if (round) {
      return (Math.round(random) + min);
    } else {
      return (random + min);
    }
  }

  componentWillUnmount() {
    this.state.initAnim.removeListener(this.listener);
    this.listener = null;
  }

  componentDidUpdate(prevProps: DropProps) {
    const { gameState } = this.props;
    const prevGameState = prevProps.gameState;

    if (gameState !== prevGameState) {
      // @ts-ignore
      if (gameState === this.lost) {
        this.animate();
      }
      // @ts-ignore
      if (gameState === this.started) {
        this.reset();
      }
    }
  }

  /** When initAnim change then native props are set. */
  eventListener (value: NativeProps): void {
    this.setNativeProps(value);
  }

  animate() {
    /** Randomly positive or negative. */
    const valueX = this.random(0, this.randomX) * (Math.round(Math.random()) * 2 - 1);
    const valueY = this.random(0, this.randomY);

    Animated.timing(this.state.initAnim, {
      toValue: {x: valueX, y: valueY},
      duration: this.props.duration,
      easing: Easing.out(Easing.linear)
    }).start();
  }

  reset() {
    this.state.initAnim.setValue({ x: 0, y: 0 });
    this.setNativeProps({
      x: this.x,
      y: this.y
    });
  }

  render() {
    let {
      scale,
      originX,
      originY,
      fill
    } = this.props;

    return (
      <React.Fragment>
        <AnimatedPath
          fill={fill || this.defaultColor}
          ref={(ref: any) => this.drop = ref}
          x={this.state.initAnim.x}
          y={this.state.initAnim.y}
          scaleX={scale}
          scaleY={scale}
          originX={originX}
          originY={originY || this.originY}
          d={dropPath}
        />
      </React.Fragment>
    );
  }
}