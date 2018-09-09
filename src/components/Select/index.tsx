import React from 'react';
import { View } from 'react-native';
import {default as defaultStyle, SelectStyle } from '../../styles/defaults/select'
import { Picker } from 'native-base';
import LevelEnum from '../../enumerations/level';

import { destructureStyles } from '../../utilis/destructure';

export interface SelectProps {
  selectedValue: any;
  values: any[];
  onChange: Function;
  style?: SelectStyle;
}

export interface SelectState {
  selectedValue: any;
}

export default class Select extends React.Component<
  SelectProps,
  SelectState
  > {
  private style: SelectStyle;
  private defaultStyle: SelectStyle = defaultStyle;
  
  constructor(props: SelectProps) {
    super(props);

    this.style = destructureStyles(this.props.style, this.defaultStyle);

    this.state = {
      selectedValue: this.props.selectedValue
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(value: LevelEnum.Level) {
    this.setState(() => {
      return {
        selectedValue: value
      };
    }, () => this.props.onChange(value));
  }

  render() {
    return (
      <View style={this.style.container}>
        <Picker
          mode="dropdown"
          style={this.style.picker}
          selectedValue={this.state.selectedValue}
          onValueChange={this.onChange}
        >
          {this.props.values.map((value) => {
            return (
              <Picker.Item
                label={value[0] || ''}
                key={value[1] || ''}
                value={value[1] || ''}
              />
            );
          })}
        </Picker>
      </View>
    );
  }
}