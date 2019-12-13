import React, { Component } from "reactn";
import Router from "./Router";
import { View, AsyncStorage, ActivityIndicator, YellowBox } from "react-native";
import { Provider } from "react-redux";
import Store from "./screens/Reducer/Store";

YellowBox.ignoreWarnings([
  "Failed child context",
  "Unable to symbolicate stack",
  "React.createElement:",
  "Failed prop type:",
  "Require cycle:"
]);

//AsyncStorage.clear();
class App extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true
    };

    this.initiate();
  }

  initiate() {
    AsyncStorage.getItem("preferences")
      .then(preferences => {
        let parsed = JSON.parse(preferences);
        if (parsed) {
          this.setGlobal({
            locale: parsed.locale,
            theme: parsed.theme
          });
        } else {
          this.setGlobal({
            locale: "fa",
            theme: "blue"
          });
        }
      })
      .catch(error => {
        Console.warn(error);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    if (this.state.isLoading == true) {
      return (
        <View
          style={{
            flex: 1,
            alignSelf: "stretch",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <ActivityIndicator size="large"></ActivityIndicator>
        </View>
      );
    } else {
      return (
        <Provider store={Store}>
          <Router />
        </Provider>
      );
    }
  }
}

export default App;
