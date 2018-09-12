import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';

import { default as timeFunctions } from '../../utilis/check.dates';
const isSameDay = timeFunctions.isSameDay;

export interface StatsProps { }

export interface StatsState {
  rawData: any | null;
  data: any | null;
  stats: any | null;
  isRawDataLoaded: boolean;
  isDataLoaded: boolean;
  isStatsLoaded: boolean;
}

export default class Stats extends Component<
  StatsProps,
  StatsState
  > {
  private isSameDay: (date1: Date | number, date2: Date | number, checkMonth: boolean, checkYear: boolean) => boolean = isSameDay;

  constructor(props: StatsProps) {
    super(props);
    this.state = {
      rawData: null,
      data: null,
      stats: null,
      isRawDataLoaded: false,
      isDataLoaded: false,
      isStatsLoaded: false
    };
  }

  componentDidMount() {
    this.loadData();
  }

  get today() {
    return Date.now();
  }

  async loadData() {
    let keys = ['rawData', 'data', 'stats'];
    let asyncData: [string, string][] | undefined = await AsyncStorage.multiGet(keys);

    let findData = (str: string) => {
      if (asyncData !== undefined) {
        return asyncData.find((item) => item[0] === str);
      } else {
        return undefined;
      }
    };

    let parseData = (data: any) => {
      if (typeof data === 'string') {
        return JSON.parse(data);
      } else {
        return rawData;
      }
    };

    let getItem = data => {
      if (Array.isArray(data)) {
        return data[1];
      } 
      return data;
    }

    let rawData = getItem(findData('rawData'));
    let stats = getItem(findData('stats'));
    let data = getItem(findData('data'));

    if (asyncData) {
      this.setState(() => {
        return {
          rawData: parseData(rawData),
          stats: parseData(stats),
          data: parseData(data),
          isDataLoaded: true
        };
      }, () => {
        asyncData = undefined;
      });
    }
  }

  render() {
    return null;
  }
}