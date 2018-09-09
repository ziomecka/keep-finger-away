import LanguageEnum from '../enumerations/language';

export default interface Messages {
  // @ts-ignore
  [name: LanguageEnum.Language]: string
};
