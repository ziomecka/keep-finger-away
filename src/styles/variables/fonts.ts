const headings = {
  textH1FontSize: 35,
  textH1Bold: 'normal', // DoubleFeature does not work with bold
  textH1LetterSpacing: 1,
  textH1FontFamily: 'DoubleFeature',
  textH1Elevation: 0
};

const basic = {
  textBasic: 12,
};

const accent = {
  textAccent: 12,
};

const button = {
  textButtonFontSize: 16,
  textButtonBold: 'bold',
  textButtonLetterSpacing: 1,
};

const gameState = {
  textGameStateBold: 'bold',
  textGameStateFontSize: 22
};

const additionalMessage = {
  textAdditionalMessageFontSize: 24,
  textAdditionalMessageFontFamily: 'LeiraLite',
};

export default {
  ...headings,
  ...basic,
  ...accent,
  ...button,
  ...gameState,
  ...additionalMessage
};