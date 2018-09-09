import { ViewStyle } from 'react-native';
import { default as gameContainer } from './game.container';
import { default as gameMessageContainer } from './game.message.container';
import { default as gameScenarioContainer } from './game.scenario.container';

export interface GameStyle {
  gameContainer?: ViewStyle;
  gameMessageContainer?: ViewStyle;
  gameScenarioContainer?: ViewStyle;
};

export default {
  gameContainer: gameContainer,
  gameScenarioContainer: gameScenarioContainer,
  gameMessageContainer: gameMessageContainer
} as GameStyle;
