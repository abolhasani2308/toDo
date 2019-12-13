import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard
} from "react-native";
import { connect } from "react-redux";
import * as Action from "./Action";

class Count extends Component {
  constructor() {
    super();
    this.state = { step: "" };
  }

  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignSelf: "stretch",
          justifyContent: "space-evenly",
          alignItems: "center",
          backgroundColor: "#990099",
          padding: 60
        }}
      >
        <TouchableOpacity
          style={{
            height: "15%",
            alignSelf: "stretch",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#e6ffff",
            borderRadius: 10
          }}
          onPress={() =>
            this.props.dispatch({
              type: Action.INCREASE,
              step: +this.state.step
            })
          }
        >
          <Text style={{ fontSize: 40, fontWeight: "bold", color: "#ff6666" }}>
            +
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
            alignSelf: "stretch",
            justifyContent: "center",
            alignItems: "center"
            // backgroundColor: "#e6ffff"
          }}
        >
          <Text style={{ fontSize: 40, fontWeight: "bold", color: "#ff6666" }}>
            {this.props.count}
          </Text>
        </View>

        <TouchableOpacity
          style={{
            height: "15%",
            alignSelf: "stretch",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#e6ffff",
            borderRadius: 10
          }}
          onPress={() =>
            this.props.dispatch({
              type: Action.DECREASE,
              step: +this.state.step
            })
          }
        >
          <Text style={{ fontSize: 40, fontWeight: "bold", color: "#ff6666" }}>
            -
          </Text>
        </TouchableOpacity>
        <TextInput
          style={{
            width: 200,
            height: 100,
            backgroundColor: "#ff6666",
            textAlign: "center",
            marginTop: 30
          }}
          value={this.state.step}
          onChangeText={step => {
            this.setState({ step });
          }}
          defaultValue={String(1)}
          keyboardType="number-pad"
        ></TextInput>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    count: state.count
  };
};

export default connect(mapStateToProps)(Count);
