import React, { Component } from "react";
import { View, Text } from "react-native";
import NetInfo from "@react-native-community/netinfo";

class NetInfoTest extends Component {
  constructor(props) {
    super(props);
    this.state = { isConnected: undefined };
  }
  componentDidMount() {
    NetInfo.isConnected
      .fetch()
      .done(isConnected => this.setState({ isConnected }));

    this.netInfoListener = NetInfo.isConnected.addEventListener(
      "connectionChange",
      isConnected => this.setState({ isConnected })
    );
  }

  componentWillUnmount() {
    this.netInfoListener();
  }
  render() {
    return (
      <View>
        <Text style={{ fontSize: 20, color: "red" }}>
          {this.state.isConnected ? "online" : "offline"}
        </Text>
      </View>
    );
  }
}
export { NetInfoTest };
