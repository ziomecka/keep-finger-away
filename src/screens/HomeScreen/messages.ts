import Messages from '../../interfaces/messages';
import LanguageEnum from '../../enumerations/language';

const { pl_PL, en_EN, en_US } = LanguageEnum.Language;

export default {
  [pl_PL]: {
    heading: 'Palec z daleka',
    levelToast: 'Wybierz poziom',
  },
  [en_EN]: {
    heading: 'Keep finger away',
    levelToast: 'Select a level',
  },
  [en_US]: {
    heading: 'Keep finger away',
    levelToast: 'Select a level',
  }
} as Messages;