import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Share from "react-native-share";

class ShareComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          //alignSelf: "stertch",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <TouchableOpacity
          style={{ width: 200, height: 50, borderWidth: 1, borderColor: "red" }}
          onPress={() => {
            let shareOptions = {
              title: "a",
              message: "b"
            };

            Share.open(shareOptions)
              .then(response => console.warn(JSON.stringify(response, null, 2)))
              .catch(error => console.warn(error));
          }}
        ></TouchableOpacity>
      </View>
    );
  }
}
export { ShareComponent };
