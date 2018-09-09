import { default as buttons } from './buttons';
import LanguageEnum from '../../../enumerations/language';
import { NavigationDetails } from '../../../components/Navigation/';
import { default as messages } from '../../../screens/HomeScreen/messages';

const { pl_PL } = LanguageEnum.Language;

const navigationDetails = (
  language: LanguageEnum.Language = pl_PL
) => {
  return {
    buttons: buttons(language),
    messages: {
      // @ts-ignore
      levelToast: messages[language].levelToast
    }
  } as NavigationDetails;
};

export default navigationDetails;