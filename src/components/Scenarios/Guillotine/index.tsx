import React, { Component } from 'react';
import {
  findNodeHandle, UIManager, Dimensions
} from 'react-native';

import Blade from './Blade/';
import Blood from '../../Blood/';
import AnimFall from '../../AnimFall/';
import Touchable from '../../Touchable';

import { Element } from './interfaces';

import { default as settings } from '../../../settings';
import { default as variables } from '../../../styles/variables/'
import GameStateEnum from '../../../enumerations/game.state';

const screenWidth = Dimensions.get('screen').width;

export interface GuillotineScenarioProps {
  level: string;
  gameState: GameStateEnum.GameState;
  prevGameState: GameStateEnum.GameState | undefined;
  won: () => void;
  lost: () => void;
  falstart: () => void;
  startCount: () => void;
  endGame: () => void;
  resultAlreadySet: () => boolean; // gameState === won || lost || falstart
  gameEnded: () => boolean;
  messages: any;
  states: any;
}

export interface GuillotineScenarioState {
  element: Element;
  bladeAnimation: [number, number];
}

export default class GuillotineScenario extends Component<
  GuillotineScenarioProps,
  GuillotineScenarioState
  > {
  private blade: Component | undefined;
  private bladeHeight: number = settings.bladeHeight;
  private touchable: Component | undefined;
  private touchableHeight: number = variables.sizes.heightTouchable;
  private bladeTop: [number, number];
  private bloodSize: [number, number]; // width, height
  private animFallDuration: number = settings.animFallDuration;
  private tops: any = require('./Blade/top').default;
  private timeoutTouchable: NodeJS.Timer | number | undefined;
  private timeoutBlade: NodeJS.Timer | number | undefined;

  constructor(props: GuillotineScenarioProps) {
    super(props);

    this.bladeTop = [this.tops[this.props.level], 300];
    this.bloodSize = [200, 300];

    this.state = this.initialState;

    // this.count, this.started etc;
    Object.assign(this, this.props.states);

    this.blade;
    this.touchable;

    this.measureBlade = this.measureBlade.bind(this);
    this.measureTouchable = this.measureTouchable.bind(this);
    this.endGame = this.endGame.bind(this);
    this.setRef = this.setRef.bind(this);
  }

  get initialState(): GuillotineScenarioState {
    return {
      bladeAnimation: this.bladeTop,
      element: {
        blade: { x: undefined, y: undefined },
        touchable: { x: undefined, y: undefined }
      }
    };
  }

  reset(keepTouchable: boolean = true) {
    let initialState: GuillotineScenarioState | null = this.initialState;
    if (keepTouchable) {
      initialState.element.touchable =
        { ...this.state.element.touchable };
    }
    this.setState(initialState);
    initialState = null;

    this.clearTimeoutTouchable();
    this.clearTimeoutBlade();
  }

  clearTimeout(timeout: NodeJS.Timer | number | undefined) {
    if (typeof timeout === 'number') {
      this.clearTimeout(timeout);
      timeout = undefined;
    }
  }

  clearTimeoutTouchable() {
    this.clearTimeout(this.timeoutTouchable as number);
  }

  clearTimeoutBlade() {
    this.clearTimeout(this.timeoutBlade as number);
  }

  /** To ensure measered correctly
   *  If not done it happens that
   *  different measures are given after reentering the Game screen.
   */
  async componentDidMount() {
    /** Measured after rendered */
    this.timeoutTouchable = setTimeout(() => {
      this.measureTouchable();
      this.clearTimeoutTouchable();
    }, 50);
  }

  componentDidUpdate(prevProps: GuillotineScenarioProps, prevState: GuillotineScenarioState) {
    const { gameState } = this.props;
    const prevGameState = prevProps.gameState;

    if (gameState !== prevGameState) {
      // @ts-ignore
      if (gameState === this.started) {
        this.reset();
      }
      // @ts-ignore
      if (gameState === this.ended) {
        this.checkResult();
      }
    }
  }

  componentWillUnmount() {
    this.reset(false);
  }

  /** Check position of blade */
  measure(element: any, key: string): Promise<number | undefined> {
    // @ts-ignore
    if (element) {
      return new Promise((res) => {
        UIManager.measure(element,
          (x, y, width, height, pageX, pageY) => {
            let result: number;
            let prevState = { ...this.state.element };
            this.setState(() => {
              // @ts-ignore
              result = prevState[key].pageY = pageY;
              // console.log("measuring " + key + JSON.stringify(prevState));
              return {element: prevState};
          }, () => res(result));
        });
      });
    } else {
      throw new Error('Element not found.');
    }
  }

  async measureElement(name: string): Promise<number | undefined> {
    // @ts-ignore
    const element = (this[name])
      // @ts-ignore
      ? findNodeHandle(this[name])
      : undefined;
    if (element) {
      return await this.measure(element, name);
    }
  }

  async measureBlade(): Promise<number | undefined> {
    return await this.measureElement("blade");
  }

  async measureTouchable(): Promise<number | undefined> {
    return await this.measureElement("touchable");
  }

  get touchableY(): number {
    return (
      Number(this.state.element.touchable.pageY) +
      this.touchableHeight / 2
    );
  }

  /** If bladeY below touchable then lost (false) else won (true) */
  async checkResult(): Promise<void> {
    const { gameState } = this.props;

    // @ts-ignore
    if (gameState !== this.cutFinger && gameState !== this.ended) {
      this.props.falstart();
    } else {
      let bladePageY = await this.measureBlade();
      let touchableY = this.touchableY;

      if (
        (bladePageY !== undefined) &&
        (bladePageY !== 0) &&
        (touchableY !== 0)
      ) {
        if (bladePageY + this.bladeHeight - this.bladeTop[0] < touchableY) {
          this.props.won();
        } else {
          this.props.lost();
        }
      } else {
        throw new Error('Blade or touchable not found.');
      }
    }
  }

  endGame() {
    if (!this.props.gameEnded()) {
      this.props.endGame();
      this.checkResult();
    }
  }

  setRef(element: any) {
    this.touchable = element;
  }

  render() {
    const width = screenWidth * 0.8;

    return (
      <React.Fragment>
        <AnimFall
          top={this.bladeTop}
          duration={this.animFallDuration}
          measure={this.measureBlade}
          gameState={this.props.gameState}
          prevGameState={this.props.prevGameState}
          lost={this.props.lost}
          touchablePageY={this.state.element.touchable.pageY}
          touchableHeight={this.touchableHeight}
          bladeHeight={this.bladeHeight}
          bladeTop={this.bladeTop[0]}
          resultAlreadySet={this.props.resultAlreadySet}
          gameEnded={this.props.gameEnded}
          states={this.props.states}
        >
          <Blade
            width={width}
            height={this.bladeHeight}
            // @ts-ignore
            ref={(ref: Component) => this.blade = ref}
            />
        </AnimFall>
        <Touchable
          gameState={this.props.gameState}
          prevGameState={this.props.prevGameState}
          startCount={this.props.startCount}
          endGame={this.endGame}
          messages={this.props.messages}
          // @ts-ignore
          setRef={this.setRef}
          states={this.props.states}
        />
        <Blood
          gameState={this.props.gameState}
          prevGameState={this.props.prevGameState}
          size={this.bloodSize}
          states={this.props.states}
        />
      </React.Fragment>
    );
  }
}