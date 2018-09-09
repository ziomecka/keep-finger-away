import React, { Component } from 'react';
import { Toast } from 'native-base';

import { default as variables } from '../../styles/variables/';

export interface LevelToastProps {
  show: boolean;
  message?: string | undefined;
}

export interface LevelToastState {
}

export default class LevelToast extends Component<
  LevelToastProps,
  LevelToastState
  > {
  private duration: number = 1000;
  private color: string = variables.colors.red;
  
  constructor(props: LevelToastProps) {
    super(props);
  }

  componentDidUpdate(prevProps: LevelToastProps) {
    let { show } = this.props;
    let prevShow = prevProps.show;

    if (show !== prevShow && show) {
      Toast.show({
        text: this.props.message ? this.props.message : 'Select a level',
        buttonText: 'Ok',
        duration: this.duration,
        textStyle: {color: this.color}
      });
    }
  }

  render() {
    return null;
  }
}