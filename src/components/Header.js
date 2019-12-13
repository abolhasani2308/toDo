import React, { Component } from "reactn";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
  AsyncStorage
} from "react-native";
import { colors, strings } from "../globals";
import {
  responsiveFontSize,
  responsiveWidth
} from "react-native-responsive-dimensions";
import Modal from "react-native-modalbox";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearchModalVisible: false,
      isAddModalVisible: false
    };

    this.setGlobal({
      query: ""
    });
  }

  renderSearchModal() {
    return (
      <Modal
        style={{
          width: 300,
          height: 400,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10
        }}
        position={"center"}
        isOpen={this.state.isSearchModalVisible}
        onClosed={() => this.setState({ isSearchModalVisible: false })}
        coverScreen
        backdropPressToClose
        backButtonClose
        swipeToClose={false}
        backdropColor="#222222"
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "stretch",
            backdropColor: "white",
            borderRadius: 10
          }}
        >
          <View
            style={{
              width: 250,
              height: 50,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              //alignSelf: "stretch",
              backdropColor: "white",
              borderRadius: 10,
              borderWidth: 1
            }}
          >
            <TextInput
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center"
              }}
              value={this.global.query}
              onChangeText={query => this.setGlobal({ query })}
              placeholder="..."
            />
          </View>
          <TouchableOpacity
            style={{
              width: 200,
              height: 50,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              backgroundColor: "red",
              borderRadius: 10,
              borderWidth: 1,
              elevation: 5,
              marginVertical: 15
            }}
            onPress={() => this.setState({ isSearchModalVisible: false })}
          >
            <Text style={{ color: "white", fontSize: 20, fontFamily: "Yekan" }}>
              جستجو
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 200,
              height: 50,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              backgroundColor: "red",
              borderRadius: 10,
              borderWidth: 1,
              elevation: 5,
              marginVertical: 15
            }}
            onPress={() => {
              this.setState({ isSearchModalVisible: false });
              this.setGlobal({ query: "" });
            }}
          >
            <Text style={{ color: "white", fontSize: 20, fontFamily: "Yekan" }}>
              نمایش همه
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

  renderAddModal() {
    <Modal
      style={{
        width: 300,
        height: 400,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10
      }}
      position={"center"}
      isOpen={this.state.isAddModalVisible}
      onClosed={() => this.setState({ isAddModalVisible: false })}
      coverScreen
      backdropPressToClose
      backButtonClose
      swipeToClose={false}
      backdropColor="#222222"
    >
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "stretch",
          backdropColor: "white",
          borderRadius: 10
        }}
      >
        <TouchableOpacity
          style={{
            width: 200,
            height: 50,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            backdropColor: "red",
            borderRadius: 10,
            borderWidth: 1,
            elevation: 5,
            marginVertical: 15
          }}
          onPress={() => {
            let newData = [...this.global.sections];
            newData.push({
              key: Math.random() + "abc",
              icon: require("../Image/11.png"),
              headerTitle: Math.random().toFixed(2),
              headerTextColor: "white",
              headerBackColor: colors(this.global.theme).text_color,
              dotsColor: "black",
              todoBackColor: "white",
              todoTextColor: "black",
              checkedLineColor: "red"
            });

            this.setGlobal({ sections: newData });
            this.setState({ isAddModalVisible: false });
          }}
        >
          <Text style={{ color: "white", fontSize: 20, fontFamily: "Yekan" }}>
            اضافه کن
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>;
  }

  render() {
    return (
      <SafeAreaView
        style={{
          height: "12%",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "stretch",
          backgroundColor: colors(this.global.theme).primary,

          flexDirection:
            strings(this.global.locale).DIRECTION == "ltr"
              ? "row"
              : "row-reverse"
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "stretch",
            backgroundColor: colors(this.global.theme).secondary,
            marginVertical: 10
          }}
        >
          {this.renderSearchModal()}
          {this.renderAddModal()}
          <TouchableOpacity
            onPress={() => {
              let newData = [...this.global.sections];
              newData.push({
                key: Math.random() + "abc",
                icon: require("../Image/11.png"),
                headerTitle: Math.random().toFixed(2),
                headerTextColor: "white",
                headerBackColor: colors(this.global.theme).text_color,
                dotsColor: "black",
                todoBackColor: "white",
                todoTextColor: "black",
                checkedLineColor: "red"
              });

              this.setGlobal({ sections: newData });
              AsyncStorage.setItem(`data`, JSON.stringify(newData))
                .then(() => {
                  this.setState({
                    isAddModalVisible: false
                  });
                })
                .catch(error => alert(error));
            }}
          >
            <Image
              source={require("../Image/06.png")}
              style={{
                width: 35,
                height: 35,
                resizeMode: "center",
                tintColor: colors(this.global.theme).text_color,
                marginRight: 10
              }}
            ></Image>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 4,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "stretch",
            backgroundColor: colors(this.global.theme).secondary,
            marginVertical: 10
          }}
        >
          <Text
            style={{
              fontSize: 28,
              color: colors(this.global.theme).text_color,
              fontFamily: "Yekan"
            }}
          >
            {strings(this.global.locale).header_text}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "flex-end",
            alignSelf: "stretch",
            backgroundColor: colors(this.global.theme).secondary,
            marginVertical: 10
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.setState({ isSearchModalVisible: true });
            }}
          >
            <Image
              source={require("../Image/10.png")}
              style={{
                width: 35,
                height: 35,
                resizeMode: "center",
                tintColor: colors(this.global.theme).text_color,
                marginRight: 10
              }}
            ></Image>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

export { Header };
