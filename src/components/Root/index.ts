import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../../screens/HomeScreen/';
import GameScreen from '../../screens/GameScreen/';

import RoutesEnum from '../../enumerations/routes';
import LevelEnum from '../../enumerations/level';

const routes = RoutesEnum.Routes;

const Root = createStackNavigator(
  {
    [routes.Home]: {
      screen: HomeScreen,
    },
    [routes.Game]: {
      screen: GameScreen,
    },
  },
  // @ts-ignore
  {
    headerMode: 'none',
    initialRouteName: routes.Home,
    initialRouteParams: {
      level: LevelEnum.Level[LevelEnum.Level.easy],
    },
  }
);

export default Root;