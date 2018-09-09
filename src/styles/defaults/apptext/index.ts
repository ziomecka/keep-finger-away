import { TextStyle } from 'react-native';
import { default as variables } from '../../variables/';

import { default as settings } from '../../../settings';
let color = settings.debugLayout ? 'pink' : 'transparent';

export interface AppTextStyle {
  basic?: TextStyle;
  accent?: TextStyle;
  button?: TextStyle;
  h1?: TextStyle;
  h1FontFamily?: TextStyle;
  gameState?: TextStyle;
  additionalMessage?: TextStyle;
};

let { colors, fonts } = variables;

const styles = {
  basic: {
    color: colors.textBasic,
  },
  accent: {
    color: colors.textAccent,
  },
  button: {
    color: colors.textButtonBasic,
    fontSize: fonts.textButtonFontSize,
    fontWeight: fonts.textButtonBold,
    letterSpacing: fonts.textButtonLetterSpacing,
  },
  h1FontFamily: {
    fontFamily: fonts.textH1FontFamily,
  },
  gameState: {
    color: colors.textGameState,
    fontWeight: fonts.textGameStateBold,
    fontSize: fonts.textGameStateFontSize,
    textAlign: 'center',
    margin: 0,
  },
  h1: {
    color: colors.textH1,
    fontSize: fonts.textH1FontSize,
    fontWeight: fonts.textH1Bold,
    textShadowColor: colors.textH1ShadowBasic,
    textShadowOffset: { width: 2, height: 2 },
    textAlign: 'center',
    letterSpacing: fonts.textH1LetterSpacing,
    elevation: fonts.textH1Elevation,
    margin: 0,
    backgroundColor: color,
  },
  additionalMessage: {
    color: colors.textAdditionalMessageBasic,
    fontFamily: fonts.textAdditionalMessageFontFamily,
    fontSize: fonts.textAdditionalMessageFontSize
  },
} as AppTextStyle;

export default styles;