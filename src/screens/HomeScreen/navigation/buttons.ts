import { AppButtonProps } from '../../../components/Button/';
import RoutesEnum from '../../../enumerations/routes';
import messages from './messages';
import LanguageEnum from '../../../enumerations/language';

const routes = RoutesEnum.Routes;

const buttons = (language: LanguageEnum.Language) => {
  return [
    { 
      // @ts-ignore
      title: messages[language]
        // @ts-ignore
        ? messages[language].game
        : '',
      route: routes.Game,
    }
  ] as AppButtonProps[];
};


export default buttons;