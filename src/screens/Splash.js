import React, { Component } from "reactn";
import { AsyncStorage, ActivityIndicator, View } from "react-native";

class Splash extends Component {
  constructor(props) {
    super(props);
    this.initiate();
  }

  initiate() {
    const keys = ["token", "preferences"];

    AsyncStorage.multiGet(keys)
      .then(data => {
        let token = data[0][1];
        let preferences = data[1][1];

        let parsed = JSON.parse(preferences);

        if (parsed) {
          this.setGlobal({
            locale: parsed.locale,
            theme: parsed.theme
          });
        } else {
          this.setGlobal({
            locale: "en",
            theme: "red"
          });
        }

        if (token) {
          this.props.navigation.navigate("_RootStack");
        } else {
          this.props.navigation.navigate("_IntroStack");
        }
      })
      .catch(error => alert(error));
  }

  render() {
    return (
      <View>
        <ActivityIndicator></ActivityIndicator>
      </View>
    );
  }
}
export { Splash };
