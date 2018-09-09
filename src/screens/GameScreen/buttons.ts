import { AppButtonProps } from '../../components/Button/';
import RouteEnums from '../../enumerations/routes';
import messages from './messages';
import LanguageEnum from '../../enumerations/language';

const { en_US } = LanguageEnum.Language;
const routes = RouteEnums.Routes;

export interface ButtonsSet {
  buttonsGameStart: () => AppButtonProps[],
  buttonsGameEnd: (callback: Function) => AppButtonProps[]
};

const buttons = (language: LanguageEnum.Language = en_US): ButtonsSet => {
  return {
    buttonsGameStart: () => {
      return [
        {
          // @ts-ignore
          title: messages[language].buttons.stop,
          route: routes.Home,
        },
      ];
    },
    buttonsGameEnd: (callback: Function) => {
      return [
        {
          // @ts-ignore
          title: messages[language].buttons.stop,
          route: routes.Home,
        },
        {
          // @ts-ignore
          title: messages[language].buttons.repeat,
          onPress: callback,
        },
      ];
    },
  } as ButtonsSet;
};

export default buttons;