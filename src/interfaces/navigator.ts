import {
  NavigationScreenOptionsGetter,
  NavigationRoute,
  NavigationParams,
  NavigationScreenProps,
  NavigationScreenProp,
  NavigationScreenOptions,
} from 'react-navigation';

interface RouteParams
extends NavigationScreenProp<NavigationRoute, NavigationParams> {
  route: NavigationRoute<any>;
  params: NavigationParams;
};

interface Routes {
  [name: string]: {
    routeParams: RouteParams;
    navigationOptions?: NavigationScreenOptions;
  };
};

export {
  NavigationScreenOptionsGetter,
  NavigationRoute,
  NavigationParams,
  NavigationScreenProps,
  NavigationScreenProp,
  NavigationScreenOptions,
  RouteParams,
  Routes
};