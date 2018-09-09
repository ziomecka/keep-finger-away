const standard = {
  standardPadding: 10,
  standardMargin: 10
}

const touchable = {
  touchableBottom: standard.standardMargin
};

const buttons = {
  buttonsBottom: standard.standardMargin,
  buttonsTop: standard.standardMargin
};

const buttonContainer = {
  buttonContainerMargin: standard.standardMargin,
  buttonContainerPadding: standard.standardPadding
};

const headings = {
  headingBottom: standard.standardMargin * 2
};

const content = {
  contentMargin: standard.standardMargin
};

const navigation = {
  navigationMargin: content.contentMargin
};

export default {
  ...standard,
  ...touchable,
  ...buttons,
  ...buttonContainer,
  ...headings,
  ...navigation,
  ...content
};