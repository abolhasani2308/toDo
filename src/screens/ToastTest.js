import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import toast from "react-native-root-toast";

class ToastTest extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  ToastVisible() {
    toast.show("This is a message", {
      duration: toast.durations.LONG,
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

  render() {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          alignSelf: "stretch",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#5c4a72"
        }}
        activeOpacity={1}
        onPress={() => {
          this.ToastVisible();
        }}
      ></TouchableOpacity>
    );
  }
}
export { ToastTest };
