import { default as margins } from './margins';

const standard = {
  standardWidthSmall: 150,
  standardHeightSmall: 50,
};

const buttons = {
  widthButtonsBasic: '100%', // ButtonContainer
  heightButtonsBasic: standard.standardHeightSmall
};

const buttonContainer = {
  widthButtonContainerBasic: standard.standardWidthSmall,
  heightButtonContainerBasic: standard.standardHeightSmall
};

const navigationContainer = {
  heightNavigationContainer: 80
};

const navigation = {
  totalHeightNavigation: navigationContainer.heightNavigationContainer +
    margins.navigationMargin + 10 + 10
};

const select = {
  heightSelect: standard.standardHeightSmall,
  widthSelect: standard.standardWidthSmall,
};

const touchable = {
  heightTouchable: 50,
  widthTouchable: 50
};

const game = {
  gameMessageHeight: 100
};

export default {
  ...standard,
  ...buttons,
  ...buttonContainer,
  ...navigationContainer,
  ...navigation,
  ...select,
  ...touchable,
  ...game
};
