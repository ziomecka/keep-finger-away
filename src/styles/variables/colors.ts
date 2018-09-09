export const defs = {
  red: '#a30b37',
  darkRed: '#660000',
  black: '#0a0908',
  almostBlack: '#111112',
  grey: '#d8ddef',
  darkGrey: '#b1b5c4',
  white: '#ffffff',
  lightGrey: '#e8e8e8',
  blade: {
    bladeFirstColor: '#111112',
    bladeSecondColor: '#828386',
    bladeShadowFirstColor: '#2b2d31',
    bladeShadowSecondColor: '#212224',
    bladeStrokeColor: '#3b3d42'
  }
};

const backgroundColors = {
  backgroundBasic: '#d8ddef',
};

/** Button background color */
const buttonsContainerColors = {
  buttonsContainerBackgroundBasic: defs.grey,
};

const buttonContainerColors = {
  buttonContainerBackgroundBasic: defs.almostBlack,
  borderButtonContainerBasic: defs.almostBlack,
};

const screenColors = {
  screenBackgroundBasic: defs.grey,
};

const navigationContainerColors = {
  navigationContainerBackgroundBasic: 'transparent',
  navigationContainerBackgroundAccent: defs.darkGrey
}

const textColors = {
  textBasic: defs.black,
  textAccent: defs.red,
  textButtonBasic: defs.white,
  textButtonAccent: defs.red,
  textH1: defs.red,
  textGameState: defs.white,
  textH1ShadowBasic: defs.darkRed,
  textSelect: defs.black,
  textAdditionalMessageBasic: defs.black
};

const select = {
  selectBackgroundBasic: defs.white
};

const blade = {
  ...defs.blade
};

const touchable = {
  touchableOutside: defs.lightGrey,
  touchableInside: defs.white
};

export default {
  ...defs,
  ...backgroundColors,
  ...buttonsContainerColors,
  ...buttonContainerColors,
  ...screenColors,
  ...navigationContainerColors,
  ...textColors,
  ...select,
  ...blade,
  ...touchable
};