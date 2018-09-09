import { ViewStyle } from 'react-native';
import { default as bloodContainer } from './blood.container'

export interface BloodStyle {
  bloodContainer?: ViewStyle;
}
export default {
  bloodContainer: bloodContainer
} as BloodStyle;