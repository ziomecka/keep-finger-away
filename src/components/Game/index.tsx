import React, { Component } from 'react';
import { View } from 'react-native';
import AppText from '../AppText/';

import ScenarioEnum from '../../enumerations/sceanario';
import GameStateEnum from '../../enumerations/game.state';

import GameContext from '../../contexts/game';

import getScenario from '../Scenarios/';
import { destructureStyles } from '../../utilis/destructure';
import { default as defaultStyle, GameStyle } from '../../styles/defaults/game';
import { default as settings } from '../../settings';

export interface GameProps {
  gameState: GameStateEnum.GameState;
  prevGameState: GameStateEnum.GameState | undefined;
  level: string;
  scenario: ScenarioEnum.Scenario;
  style?: GameStyle;
  cutFinger: () => void;
  resultAlreadySet: () => boolean; // gameState === won || lost || falstart
  gameEnded: () => boolean;
  messages: any;
  states: any;
};

export interface GameState {
  scenario: Component;
};

export default class Game extends Component<
  GameProps,
  GameState
  > {

  private basicTime: number = settings.randomTime;
  private timeout: NodeJS.Timer | number | undefined;
  private style: GameStyle;
  private defaultStyle: GameStyle = defaultStyle;

  constructor(props: GameProps) {
    super(props);

    this.state = {
      scenario: this.scenario
    };

    // this.count, this.started etc;
    Object.assign(this, this.props.states);

    this.style = destructureStyles(this.props.style, this.defaultStyle);
  }

  componentDidUpdate(prevProps: GameProps) {
    const { gameState } = this.props;
    const prevGameState = prevProps.gameState;

    if (gameState !== prevGameState) {
      // @ts-ignore
      if (gameState === this.started) {
        this.reset();
      }

      // @ts-ignore
      if (gameState === this.count) {
        this.countDown();
      }
    }
  }

  reset() {
    this.clearTimeout();
  }

  componentWillUnmount() {
    this.reset();
  }

  getRandom() {
    return Math.random() * this.basicTime;
  }

  /** After random time cut the finger */
  countDown() {
    const time = this.getRandom();
    this.timeout = setTimeout(() => {
      if (!this.props.gameEnded()) {
        this.props.cutFinger();
      }
      this.clearTimeout();
    }, time);
  }

  clearTimeout(): void {
    clearTimeout(this.timeout as number);
    this.timeout = undefined;
  }

  get scenario(): Component {
    return getScenario(this.props.scenario);
  }

  render() {
    let { game } = this.props.messages;
    const message = game
      ? game[this.props.gameState] || ''
      : '';
    game = null;

    return (
      <View style={this.style.gameContainer}>
        <View style={this.style.gameMessageContainer}>
          <AppText textStyle='gameState'>
            {message}
          </AppText>
        </View>
        <View style={this.style.gameScenarioContainer}>
          <GameContext.Consumer>{game => (
            // @ts-ignore
            <this.state.scenario
              level={this.props.level}
              {...game}
            />
          )}</GameContext.Consumer>
        </View>
      </View>
    );
  }
};