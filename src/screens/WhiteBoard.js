import React, { Component } from "react";
import { View, Text, AsyncStorage, TouchableOpacity } from "react-native";

class WhiteBoard extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      dots: [],
      savedDots: []
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("dots")
      .then(dots => {
        if (dots) {
          this.setState({ savedDots: JSON.parse(dots) });
        } else {
          this.setState({ dots: [] });
        }
      })
      .catch(error => console.warn(error));
  }

  showDots() {
    var i = 0,
      howManyTimes = this.state.savedDots.length;

    let f = () => {
      let newDots = [...this.state.dots];
      newDots.push(this.state.savedDots[i]);
      this.setState({ dots: newDots });
      i++;

      if (i < howManyTimes) {
        setTimeout(f, 1000);
      }
    };
    f();
  }

  render() {
    return (
      <View style={{ flex: 1, alignSelf: "stretch" }}>
        <View
          style={{
            flex: 1,
            alignSelf: "stretch",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#a79c93"
          }}
          onStartShouldSetResponder={e => {
            let newDots = [...this.state.dots];
            newDots.push({
              top: e.nativeEvent.pageY,
              left: e.nativeEvent.pageX
            });
            this.setState({ dots: newDots });
          }}
        >
          {this.state.dots.map(item => (
            <View
              style={{
                width: 10,
                height: 10,
                backgroundColor: "#0294a5",
                borderRadius: 100,
                position: "absolute",
                top: item.top,
                left: item.left
              }}
              key={String(item.top) + String(item.left)}
            ></View>
          ))}
        </View>
        <View
          style={{
            flex: 0.2,
            alignSelf: "stretch",
            justifyContent: "space-evenly",
            alignItems: "center",
            flexDirection: "row"
          }}
        >
          <TouchableOpacity
            style={{
              width: 100,
              height: 50,
              backgroundColor: "#0294a5",
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center"
            }}
            onPress={() => {
              this.showDots();
            }}
          >
            <Text style={{ fontSize: 16, textAlign: "center" }}>Auto Play</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 100,
              height: 50,
              backgroundColor: "#0294a5",
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center"
            }}
            onPress={() => {
              AsyncStorage.setItem("dots", JSON.stringify(this.state.dots))
                .then(() => {})
                .catch(error => console.warn(error));
            }}
          >
            <Text style={{ fontSize: 16, textAlign: "center" }}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 100,
              height: 50,
              backgroundColor: "#0294a5",
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center"
            }}
            onPress={() => {
              this.setState({ dots: [] });

              AsyncStorage.removeItem("dots")
                .then(() => {})
                .catch(error => console.warn(error));
            }}
          >
            <Text style={{ fontSize: 16, textAlign: "center" }}>Clear</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export { WhiteBoard };
