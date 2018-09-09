import { default as sizes } from './sizes';

const navigation = {
  navigationBottom: 10
};

const touchable = {
  touchableBottom: sizes.totalHeightNavigation,
  touchableContainerBottom: '50%'
};

const gameMessage = {
  gameMessageTop: 50
};

const blood = {
  bloodTop: gameMessage.gameMessageTop + sizes.gameMessageHeight
};

export default {
  ...navigation,
  ...touchable,
  ...gameMessage,
  ...blood
};