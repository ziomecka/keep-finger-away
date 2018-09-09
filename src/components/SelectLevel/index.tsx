import React from 'react';

import Select from '../Select/';
import LevelToast from '../LevelToast';

import LevelEnum from '../../enumerations/level';
import LanguageEnum from '../../enumerations/language';
import { default as levelLanguages } from '../../enumerations/level.languages';
import enumArray from '../../utilis/enum.array';

import { SelectStyle, default as defaultStyle } from '../../styles/defaults/select';
import { destructureStyles } from '../../utilis/destructure';

export interface SelectLevelProps {
  onChange: Function;
  selectedValue?: string;
  style?: SelectStyle;
  toastMessage: string;
  language: LanguageEnum.Language;
}

export interface SelectLevelState {
  showLevelToast: boolean;
}

const { level, easy } = LevelEnum.Level;

export default class SelectLevel extends React.Component<SelectLevelProps, SelectLevelState> {
  private levels: any[];
  private showLevelToast: string = String(level);
  private initialLevel: string = String(easy);
  private style: SelectStyle;
  private defaultStyle: SelectStyle = defaultStyle;

  constructor(props: SelectLevelProps) {
    super(props);
    this.state = {
      showLevelToast: false
    };

    // @ts-ignore
    this.levels = enumArray(LevelEnum.Level, levelLanguages[LanguageEnum.Language[this.props.language]]) || [];
    this.style = destructureStyles(this.props.style, this.defaultStyle);

    this.onChange = this.onChange.bind(this);
  }

  onChange(level: string) {
    if (level === this.showLevelToast) {
      this.setState({
        showLevelToast: true
      });
    } else {
      this.setState({
        showLevelToast: false
      });

    }
    this.props.onChange(level);
  }

  render() {
    return (
      <React.Fragment>
        <LevelToast show={this.state.showLevelToast} message={this.props.toastMessage} />
        <Select
          selectedValue={this.props.selectedValue || this.initialLevel}
          values={this.levels}
          onChange={this.onChange}
          style={this.style}
        />
      </React.Fragment>
    );
  }
}
