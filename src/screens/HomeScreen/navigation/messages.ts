import Messages from "../../../interfaces/messages";
import LanguageEnum from "../../../enumerations/language";

const { pl_PL, en_EN, en_US } = LanguageEnum.Language

export default {
  [pl_PL]: {
    game: 'Start'
  },
  [en_EN]: {
    game: 'Start'
  },
  [en_US]: {
    game: 'Start'
  }
} as Messages;