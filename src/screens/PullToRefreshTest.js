import React, { Component } from "react";
import { View, Text, FlatList, RefreshControl } from "react-native";

class PullToRefreshTest extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      data: ["a", "b", "c", "d"],
      isLoading: false
    };
  }

  reload() {
    this.setState({ isLoading: true }, () =>
      setTimeout(() => this.setState({ isLoading: false }), 5000)
    );
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignSelf: "stretch",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#5c4a72"
        }}
      >
        <FlatList
          style={{ flex: 1, alignSelf: "stretch" }}
          data={this.state.data}
          renderItem={({ item }) => (
            <View
              style={{
                height: 100,
                alignSelf: "stretch",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f46a4e",
                margin: 10
              }}
            >
              <Text>{item}</Text>
            </View>
          )}
          keyExtractor={item => item}
          refreshControl={
            <RefreshControl
              colors={["red", "blue"]}
              refreshing={this.state.isLoading}
              onRefresh={() => {
                this.reload();
              }}
            ></RefreshControl>
          }
        ></FlatList>
      </View>
    );
  }
}
export { PullToRefreshTest };
