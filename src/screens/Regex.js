import React, { Component } from "react";
import { View, Text, TextInput } from "react-native";
import { NetInfo } from "@react-native-community/netinfo";

type Props = {
  /**
   * Width of component
   */
  width: Number,

  /**
   * Height of component
   */
  height: Number,

  /**
   * Text input value
   */
  value: string,

  /**
   * onChangeText
   */
  onChangeText: Function,

  /**
   * Placeholder
   */
  placeholder: "Username" | "Password",

  /**
   * Color of border if it Valid
   */

  correctColor: String,

  /**
   * Color of border if it Not Valid
   */

  wrongColor: String
};

class Regex extends Component<props> {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: undefined
    };
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
  check(input, type: "Username" | "Password") {
    let name_re = /^[A-Za-z ]+$/;
    let email_re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let iranianPhone_re = /^09[0-9]{9}$/; //regex101.com

    switch (type) {
      case "Phone":
        return input == "" ? undefined : iranianPhone_re.test(input);

      case "Email":
        return input == "" ? undefined : email_re.test(input);

      default:
        return undefined;
    }
  }

  render() {
    return (
      <View
        style={{
          height: 100,
          alignSelf: "stretch",
          borderWidth: 1,
          borderColor: this.check() ? "green" : "red"
        }}
      >
        <View
          style={{
            flex: 1,
            alignSelf: "stretch",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text style={{ fontSize: 20, color: "red" }}>
            {this.state.isConnected ? "online" : "offline"}
          </Text>
        </View>
        <TextInput
          ref={input => {
            this.input = input;
          }}
          style={{
            flex: 1,
            textAlignVertical: "center",
            textAlign: "center",
            alignSelf: "stretch",
            color: "rgb(42,42,42)",
            fontSize: 20,
            fontFamily: "Yekan",
            paddingLeft: 10,
            fontSize: 20
          }}
          placeholder="email"
          value={this.state.text}
          onChangeText={text =>
            this.setState({ text }, () => {
              this.check(this.state.text);
            })
          }
          underlineColorAndroid="transparent"
        />
      </View>
    );
  }
}
export { Regex };
