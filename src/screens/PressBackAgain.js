import React, { Component } from "react";
import { View, BackHandler } from "react-native";
import toast from "react-native-root-toast";

class PressBackAgain extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {};
    this.timer = {
      ref: null,
      isTimerRunning: false
    };
  }

  ToastVisible() {
    toast.show("Press back again to exit", {
      duration: 2000, //=backInterval
      position: toast.positions.BOTTOM,
      backgroundColor: "#f46a4e",
      textColor: "#f3b05a",
      opacity: 0.7,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      onShow: () => {
        // calls on toast\`s appear animation start
      },
      onShown: () => {
        // calls on toast\`s appear animation end.
      },
      onHide: () => {
        // calls on toast\`s hide animation start.
      },
      onHidden: () => {
        // calls on toast\`s hide animation end.
      }
    });
  }

  PressAgain() {
    BackHandler.addEventListener("hardwareBackPress", () => {
      if (this.timer.isTimerRunning) {
        BackHandler.exitApp();
      } else {
        this.ToastVisible();
        this.timer.isTimerRunning = true;
        let backInterval = 2000;
        clearTimeout(this.timer.ref);
        this.timer.ref = setTimeout(
          () => (this.timer.isTimerRunning = false),
          backInterval
        );
        return true;
      }
    });
  }

  render() {
    this.PressAgain();
    return (
      <View
        style={{
          flex: 1,
          alignSelf: "stretch",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#5c4a72"
        }}
      ></View>
    );
  }
}
export { PressBackAgain };
