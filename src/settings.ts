const debugLayout = false;

const touchable = {
  touchableAnimationDuration: 800,
  touchableAnimationScale: [1, 1.3],
};

const animFall = {
  randomTime: 2000,
  animFallDuration: 300,
  animFallResetDuration: 100
};

const blade = {
  bladeHeight: 70
};

const development = {
  layout: true
};

export default {
  debugLayout,
  ...touchable,
  ...animFall,
  ...blade,
  ...development
};