import React, { Component } from "react";
import { View, Text, TouchableHighlight } from "react-native";
import Swipeable from "react-native-swipeable";

class SwipeTest extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const leftContent = <Text>Pull to activate</Text>;

    const rightButtons = [
      <TouchableHighlight>
        <Text>Button 1</Text>
      </TouchableHighlight>,
      <TouchableHighlight>
        <Text>Button 2</Text>
      </TouchableHighlight>
    ];

    return (
      <Swipeable leftContent={leftContent} rightButtons={rightButtons}>
        <Text>My swipeable content</Text>
      </Swipeable>
    );
  }
}
export { SwipeTest };
