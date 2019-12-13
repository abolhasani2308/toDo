import React, { Component } from "reactn";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage,
  Dimensions
} from "react-native";
import { colors, strings } from "../globals";

class Settings extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      locale: undefined,
      theme: undefined
    };
  }

  render() {
    return (
      <View
        style={{
          width: Dimensions.get("window").width,
          //height: Dimensions.get("window").height,
          alignSelf: "stretch",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors(this.global.theme).secondary
        }}
      >
        {/*--------------------Language--------------------*/}
        <View
          style={{
            flex: 2,
            alignSelf: "stretch",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View
            style={{
              flex: 2,
              alignSelf: "stretch",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                fontSize: 25,
                fontFamily: "Yekan",
                color: colors(this.global.theme).text_color
              }}
            >
              {strings(this.global.locale).settings_locale}
            </Text>
          </View>
          <View
            style={{
              flex: 2,
              alignSelf: "stretch",
              justifyContent: "space-evenly",
              alignItems: "center",
              flexDirection: "row-reverse"
            }}
          >
            <TouchableOpacity
              style={{
                height: "50%",
                width: "40%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor:
                  this.state.locale == "fa"
                    ? colors(this.global.theme).primary
                    : colors(this.global.theme).text_color,
                borderRadius: 10
              }}
              onPress={() => {
                this.setState({ locale: "fa" });
                this.setGlobal({ locale: "fa" });
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "Yekan",
                  color:
                    this.state.locale == "fa"
                      ? colors(this.global.theme).text_color
                      : colors(this.global.theme).primary
                }}
              >
                فارسی{" "}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: "50%",
                width: "40%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor:
                  this.state.locale == "en"
                    ? colors(this.global.theme).primary
                    : colors(this.global.theme).text_color,
                borderRadius: 10
              }}
              onPress={() => {
                this.setState({ locale: "en" });
                this.setGlobal({ locale: "en" });
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "Yekan",
                  color:
                    this.state.locale == "en"
                      ? colors(this.global.theme).text_color
                      : colors(this.global.theme).primary
                }}
              >
                English
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/*--------------------Colors--------------------*/}
        <View
          style={{
            flex: 2,
            alignSelf: "stretch",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View
            style={{
              flex: 2,
              alignSelf: "stretch",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                fontSize: 25,
                fontFamily: "Yekan",
                color: colors(this.global.theme).text_color
              }}
            >
              {strings(this.global.locale).settings_theme}
            </Text>
          </View>
          <View
            style={{
              flex: 2,
              alignSelf: "stretch",
              justifyContent: "space-evenly",
              alignItems: "center",
              flexDirection: "row-reverse"
            }}
          >
            <TouchableOpacity
              style={{
                height: "50%",
                width: "25%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor:
                  this.state.theme == "blue"
                    ? colors(this.global.theme).primary
                    : colors(this.global.theme).text_color,
                borderRadius: 10
              }}
              onPress={() => {
                this.setState({ theme: "blue" });
                this.setGlobal({ theme: "blue" });
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "Yekan",
                  color:
                    this.state.theme == "blue"
                      ? colors(this.global.theme).text_color
                      : colors(this.global.theme).primary
                }}
              >
                {strings(this.global.locale).blue}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: "50%",
                width: "25%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor:
                  this.state.theme == "green"
                    ? colors(this.global.theme).primary
                    : colors(this.global.theme).text_color,
                borderRadius: 10
              }}
              onPress={() => {
                this.setState({ theme: "green" });
                this.setGlobal({ theme: "green" });
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "Yekan",
                  color:
                    this.state.theme == "green"
                      ? colors(this.global.theme).text_color
                      : colors(this.global.theme).primary
                }}
              >
                {strings(this.global.locale).green}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: "50%",
                width: "25%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor:
                  this.state.theme == "red"
                    ? colors(this.global.theme).primary
                    : colors(this.global.theme).text_color,
                borderRadius: 10
              }}
              onPress={() => {
                this.setState({ theme: "red" });
                this.setGlobal({ theme: "red" });
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "Yekan",
                  color:
                    this.state.theme == "red"
                      ? colors(this.global.theme).text_color
                      : colors(this.global.theme).primary
                }}
              >
                {strings(this.global.locale).red}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/*--------------------Save--------------------*/}
        <View
          style={{
            flex: 1,
            alignSelf: "stretch",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <TouchableOpacity
            style={{
              height: "50%",
              width: "80%",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: colors(this.global.theme).primary,
              borderRadius: 10
            }}
            onPress={() => {
              this.setState({ isLoading: true });
              let data = {
                locale: this.state.locale,
                theme: this.state.theme
              };

              this.setGlobal({
                locale: this.state.locale,
                theme: this.state.theme
              });

              AsyncStorage.setItem("preferences", JSON.stringify(data))
                .then(() => {
                  this.props.scrollToNext(),
                    this.setState({ isLoading: false });
                })
                .catch(error => console.warn(error));
            }}
          >
            {this.state.isLoading ? (
              <ActivityIndicator
                size="large"
                color={colors(this.global.theme).text_color}
              ></ActivityIndicator>
            ) : (
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "Yekan",
                  color: colors(this.global.theme).text_color
                }}
              >
                {strings(this.global.locale).confirm}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export { Settings };
