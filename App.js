import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from "./app/screens/Home";
import GameScreen from "./app/screens/Game";
import Game2Screen from "./app/screens/Game2";

const AppNavigator = createStackNavigator( // defined screen names to components
  {
    Home: HomeScreen,
    Game: GameScreen,
    Game2: Game2Screen
  },
  {
    initialRouteName: "Home"  // defined primary route
  }
);

const AppContainer = createAppContainer(AppNavigator); //defined app container for the app navigator variable that stores the function createStackNavigator()

export default class App extends React.Component {
  render() {
    return (
      <AppContainer/>
    )
  }
}