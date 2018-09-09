import Svg, { Defs, LinearGradient } from 'react-native-svg';
import { Animated } from 'react-native';
import React, { Component} from 'react';
import { default as variables } from '../../styles/variables/';
import Drop from './drop';
import { destructureStyles } from '../../utilis/destructure';
import { default as defaultStyle } from '../../styles/defaults/blood';
import { BloodStyle } from '../../styles/defaults/blood';
import GameStateEnum from '../../enumerations/game.state';

interface BloodProps {
  size: [number, number]; // width, height
  style?: BloodStyle;
  durationSize?: number;
  durationOpacity?: number;
  gameState: GameStateEnum.GameState;
  prevGameState: GameStateEnum.GameState | undefined;
  states: any;
}

interface BloodState {
  dropsNumber: number;
  opacity: any;
}

const firstColor = variables.colors.red;
const secondColor = variables.colors.darkRed;
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export default class Blood extends Component<BloodProps, BloodState> {
  private _width: number = 1;
  private _height: number = 1;
  private initialOpacity: number = 0;
  private rotationMax: number = 1;
  private scaleMin: number = 0.02;
  private scaleMax: number = 0.06;
  private durationOpacity: number = 4000;
  private dropsNumberMin: number = 10;
  private dropsNumberMax: number = 20;
  private style: BloodStyle;
  private defaultStyle: BloodStyle = defaultStyle;

  constructor(props: BloodProps) {
    super(props);

    this.state = {
      dropsNumber: this.random(this.dropsNumberMin, this.dropsNumberMax),
      opacity: new Animated.Value(this.initialOpacity),
    };

    // this.count, this.started etc;
    Object.assign(this, this.props.states);

    this.style = destructureStyles(this.props.style, this.defaultStyle);
  }

  get width() {
    return this.props.size[0] || this._width;
  }

  get height() {
    return this.props.size[1] || this._height;
  }

  get animateOpacityDuration() {
    return this.props.durationOpacity || this.durationOpacity;
  }

  componentDidUpdate(prevProps: BloodProps) {
    const { gameState } = this.props;
    const prevGameState = prevProps.gameState;

    // @ts-ignore
    if (gameState !== prevGameState && gameState === this.lost) {
      this.animateOpacity();
    }
  }

  componentWillUnmount() {
    this.resetAnimation();
  }

  resetAnimation() {
    this.state.opacity.setValue(this.initialOpacity);
  }

  animateOpacity() {
    /** Make blood visible */
    this.state.opacity.setValue(1);

    /** Fade out blade */
    Animated.timing(this.state.opacity, {
      toValue: 0,
      duration: this.animateOpacityDuration
    }).start(() => {
      this.resetAnimation();
    });
  }

  random(min: number, max: number, round: boolean = true): number {
    let random = Math.random() * max;
    if (round) {
      return Math.min((Math.round(random) + min), max);
    } else {
      return Math.min((random + min), max);
    }
  }

  generateDrop(i: number, fill?: any) {
    return (
      <Drop
        key={i}
        fill={fill}
        rotation={this.random(0, this.rotationMax)}
        scale={this.random(this.scaleMin, this.scaleMax, false)}
        originX={this.width * .5}
        duration={this.animateOpacityDuration}
        gameState={this.props.gameState}
        prevGameState={this.props.prevGameState}
        states={this.props.states}
      />
    );
  }

  generateDrops(fill: any) {
    const drops = [];
    for (let i = 0, len = this.state.dropsNumber; i < len; i++) {
      drops.push(this.generateDrop(i, fill));
    }
    return drops;
  }

  render() {
    return (
      <AnimatedSvg
        width={this.width}
        height={this.height}
        opacity={this.state.opacity}
        style={this.style.bloodContainer}
      >
        <Defs>
          <LinearGradient id="dropGradient">
            <stop offset="0" stopColor={firstColor} />
            <stop offset="1" stopColor={secondColor} />
          </LinearGradient>
        </Defs>
        {this.generateDrops("url(#dropGradient)")}
      </AnimatedSvg>
    );
  }
}