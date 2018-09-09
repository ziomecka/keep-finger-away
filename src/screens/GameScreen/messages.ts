import Messages from "../../interfaces/messages";
import LanguageEnum from "../../enumerations/language";
import GameStateEnum from '../../enumerations/game.state';

const { pl_PL, en_EN, en_US } = LanguageEnum.Language;
const { won, lost, falstart, started, count } = GameStateEnum.GameState;

export default {
  [pl_PL]: {
    buttons: {
      stop: 'Wystarczy',
      repeat: 'Jeszcze raz',
    },
    touchable: {
      [started]: 'Połóż swój palec tutaj',
      [count]: 'Uważaj...'
    },
    game: {
      [won]: 'Brawo!',
      [lost]: 'Może następnym razem...',
      [falstart]: 'Za szybko...',
    }
  },
  [en_EN]: {
    buttons: {
      stop: 'Enough',
      repeat: 'Try again',
    },
    touchable: {
      [started]: 'Put your finger here',
      [count]: 'Watch out...'
    },
    game: {
      [won]: 'Bravo!',
      [lost]: 'Maybe next time...',
      [falstart]: 'Too fast...',
    }
  },
  [en_US]: {
    buttons: {
      stop: 'Enough',
      repeat: 'Try again',
    },
    touchable: {
      [started]: 'Put your finger here',
      [count]: 'Watch out...'
    },
    game: {
      [won]: 'Bravo!',
      [lost]: 'Maybe next time...',
      [falstart]: 'Too fast...',
    }
  }
} as Messages;