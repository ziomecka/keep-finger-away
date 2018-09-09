import React, {Component} from 'react';

import Game from '../../components/Game/';
import Screen from '../Screen/';
import buttons, { ButtonsSet } from './buttons';

import ScenarioEnum from '../../enumerations/sceanario';
import PositionEnum from '../../enumerations/position'; // navigation positon
import GameStateEnum from '../../enumerations/game.state';

import enumObject, { EnumObject } from '../../utilis/enum.object';

import { NavigationComponent } from 'react-navigation';
import { ScreenProps, ScreenState } from '../../interfaces/screen';
import { AppScreenProps } from '../../../App';
import { AppButtonProps } from '../../components/Button';

import { default as defaultStyle, ScreenStyle } from '../../styles/defaults/screen';
import { destructureStyles } from '../../utilis/destructure';

import GameContext from '../../contexts/game';

const { bottom } = PositionEnum.Position;

export interface GameScreenProps extends ScreenProps {
  navigation: NavigationComponent;
  screenProps: AppScreenProps;
}

export interface GameScreenState extends ScreenState {
  scenario: ScenarioEnum.Scenario;
  gameState: GameStateEnum.GameState;
  prevGameState: GameStateEnum.GameState | undefined;
  buttons: AppButtonProps[];
  messages: any;
}

export default class GameScreen extends Component<
  GameScreenProps,
  GameScreenState
  > {
  private heading = '';
  private buttons: ButtonsSet;
  private style: ScreenStyle;
  private defaultStyle: ScreenStyle = defaultStyle;
  private customStyle: ScreenStyle = require('./styles').default;
  private states: EnumObject = enumObject(GameStateEnum.GameState);
  private bottom: PositionEnum.Position = bottom;
  private allMessages = require('./messages').default;

  constructor(props: GameScreenProps) {
    super(props);

    const { Guillotine } = ScenarioEnum.Scenario;
    
    this.buttons = buttons(this.props.screenProps.language);

    this.state = {
      scenario: Guillotine,
      gameState: this.states.started,
      prevGameState: undefined,
      buttons: this.buttons.buttonsGameStart(),
      messages: this.messages
    };

    this.style = destructureStyles(this.customStyle, this.defaultStyle);
    this.startGame = this.startGame.bind(this);
    this.startCount = this.startCount.bind(this);
    this.cutFinger = this.cutFinger.bind(this);
    this.endGame = this.endGame.bind(this);
    this.won = this.won.bind(this);
    this.lost = this.lost.bind(this);
    this.falstart = this.falstart.bind(this);
    this.reset = this.reset.bind(this);
  }

  get messages(): string {
    return this.allMessages[this.props.screenProps.language];
  }

  componentWillUnmount() {
    this.reset();
  }

  componentDidUpdate(prevProps: GameScreenProps, prevState: GameScreenState) {
    let { gameState, prevGameState } = this.state;
    if (gameState !== prevGameState) {
      switch (true) {
        case this.resultAlreadySet: // gameState === won || lost || falstart
          this.setState({
            buttons: this.buttons.buttonsGameEnd(this.startGame),
          });
          break;
        default:
          this.setState({
            buttons: this.buttons.buttonsGameStart()
          });
          break;
      }

      this.setState({
        prevGameState: gameState
      });
    }
  }

  setGameState(newState: GameStateEnum.GameState) {
    const prevGameState = this.state.gameState;
    this.setState((state) => {
      return {
        prevGameState,
        gameState: newState,
      };
    });
  }

  get gameState() {
    return this.state.gameState;
  }

  get prevGameState() {
    return this.state.prevGameState;
  }

  startGame() {
    this.setGameState(this.states.started);
  }

  startCount() {
    this.setGameState(this.states.count);
  }

  cutFinger() {
    this.setGameState(this.states.cutFinger);
  }

  endGame() {
    this.setGameState(this.states.ended);
  }

  won() {
    this.setGameState(this.states.won);
  }

  lost() {
    if (!this.resultAlreadySet) { // gameState === won || lost || falstart
      this.setGameState(this.states.lost);
    }
  }

  falstart() {
    if (!this.resultAlreadySet) { // gameState === won || lost || falstart
      this.setGameState(this.states.falstart);
    }
  }

  reset() {
    if (!this.resultAlreadySet) { // gameState === won || lost || falstart
      this.setGameState(this.states.started);
    }
  }

  get gameEnded(): boolean {
    const { gameState } = this.state;

    return (
      this.resultAlreadySet ||
      (gameState === this.states.ended)
    );
  }

  get resultAlreadySet(): boolean {
    const { gameState } = this.state;
    const { won, lost, falstart } = this.states;

    return (
      (gameState === won) ||
      (gameState === lost) ||
      (gameState === falstart)
    );
  }

  render() {
    return (
      <Screen
        navigation={this.props.navigation} // passed by router
        navigationDetails={{
          buttons: this.state.buttons
        }}
        navigationPosition={this.bottom}
        heading={this.heading}
        style={this.style}
        level={this.props.screenProps.level}
      >
        <GameContext.Provider value={{
          gameState: this.state.gameState,
          prevGameState: this.state.prevGameState,
          endGame: this.endGame,
          won: this.won,
          lost: this.lost,
          startCount: this.startCount,
          falstart: this.falstart,
          resultAlreadySet: () => this.resultAlreadySet, // gameState === won || lost || falstart
          gameEnded: () => this.gameEnded,
          messages: this.state.messages,
          states: this.states,
          language: this.props.screenProps.language
        }}>
          <Game
            level={this.props.screenProps.level}
            scenario={this.state.scenario}
            gameState={this.state.gameState}
            prevGameState={this.state.prevGameState}
            cutFinger={this.cutFinger}
            resultAlreadySet={() => this.resultAlreadySet}
            gameEnded={() => this.gameEnded}
            messages={this.state.messages}
            states={this.states}
            />
        </GameContext.Provider>
      </Screen>
    );
  }
}