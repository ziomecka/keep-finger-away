import GameStateEnum from '../enumerations/game.state';

export interface GameStateManager {
  gameState: GameStateEnum.GameState;
  prevGameState: GameStateEnum.GameState;
  startGame: () => void;
  startCount: () => void;
  cutFinger: () => void;
  endGame: () => void;
  won: () => void;
  lost: () => void;
  reset: () => void;
};
