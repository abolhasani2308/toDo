import { createStackNavigator, createSwitchNavigator } from "react-navigation";
import {
  Home,
  Settings,
  IntroSlider,
  Regex,
  NetInfoTest,
  ShareComponent,
  SwipeTest,
  ToastTest,
  PressBackAgain,
  PullToRefreshTest,
  WhiteBoard,
  Landing,
  Splash
} from "./screens";
import Count from "./screens/Count";

const IntroStack = createStackNavigator(
  { _IntroSlider: IntroSlider },
  {
    initialRouteName: "_IntroSlider",
    navigationOptions: {
      header: null
    }
  }
);

const RootStack = createStackNavigator(
  {
    _Home: Home,
    _Settings: Settings,
    _IntroSlider: IntroSlider,
    _Regex: Regex,
    _NetInfoTest: NetInfoTest,
    _ShareComponent: ShareComponent,
    _SwipeTest: SwipeTest,
    _ToastTest: ToastTest,
    _PressBackAgain: PressBackAgain,
    _PullToRefreshTest: PullToRefreshTest,
    _Count: Count,
    _WhiteBoard: WhiteBoard,
    _Landing: Landing
  },
  {
    initialRouteName: "_Landing",
    navigationOptions: {
      header: null
    }
  }
);

const SwitchNavigator = createSwitchNavigator(
  {
    _Splash: Splash,
    _IntroStack: IntroStack,
    _RootStack: RootStack
  },
  {
    initialRouteName: "_Splash"
  }
);

export default SwitchNavigator;
