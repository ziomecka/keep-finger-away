import React from 'react';
import GameStateEnum from '../enumerations/game.state';
import { default as messages } from '../screens/GameScreen/messages';
import LanguageEnum from '../enumerations/language';

const { en_US } = LanguageEnum.Language;

export interface GameContext {
  gameState: GameStateEnum.GameState;
  prevGameState: GameStateEnum.GameState | undefined;
  endGame: () => void;
  won: () => void;
  lost: () => void;
  falstart: () => void;
  startCount: () => void;
  resultAlreadySet: () => void; // gameState === won || lost || falstart
  gameEnded: () => void;
  messages: string;
  states: any;
  language: LanguageEnum.Language;
}

const GameContext = React.createContext({
  gameState: GameStateEnum.GameState.started,
  prevGameState: undefined,
  endGame: () => {},
  won: () => {},
  lost: () => {},
  falstart: () => {},
  startCount: () => {},
  resultAlreadySet: () => { }, // gameState === won || lost || falstart
  gameEnded: () => { },
  // @ts-ignore
  messages: messages[en_US],
  states: {},
  language: LanguageEnum.Language.en_US
  } as GameContext
);

export default GameContext;
