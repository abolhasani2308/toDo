import React, { Component } from "reactn";
import {
  View,
  FlatList,
  Dimensions,
  StatusBar,
  AsyncStorage,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator
} from "react-native";
import { Home, Settings } from "../screens";
import { Header } from "../components";
import { colors } from "../globals";

class Landing extends Component {
  static navigationOptions = {
    header: ({ navigation }) => <Header navigation={navigation} />
  };
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
      isLoading: false,
      //todoHeaderTitle: "",
      //headerColor: "",
      // backColorSection: "",
      // todoColor: "",
      //  refresh: false,
      defaultIcon: true
    };
    this.setGlobal({
      sections: [
        {
          key: "abc123",
          icon: require("../Image/11.png"),
          headerTitle: "a",
          headerTextColor: "white",
          headerBackColor: colors(this.global.theme).text_color,
          dotsColor: "black",
          todoBackColor: "white",
          todoTextColor: "black",
          checkedLineColor: "red"
        },
        {
          key: "efg456",
          icon: require("../Image/11.png"),
          headerTitle: "a",
          headerTextColor: "white",
          headerBackColor: colors(this.global.theme).text_color,
          dotsColor: "black",
          todoBackColor: "white",
          todoTextColor: "black",
          checkedLineColor: "red"
        },
        {
          key: "hij789",
          icon: require("../Image/11.png"),
          headerTitle: "b",
          headerTextColor: "white",
          headerBackColor: colors(this.global.theme).text_color,
          dotsColor: "black",
          todoBackColor: "white",
          todoTextColor: "black",
          checkedLineColor: "red"
        }
      ]
    });

    this.setToken();
  }

  setToken() {
    AsyncStorage.setItem("token", "123")
      .then(() => {})
      .catch(error => console.warn(error));
  }

  render() {
    return this.state.isLoading ? (
      <ActivityIndicator></ActivityIndicator>
    ) : (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "stretch",
          backgroundColor: "White"
        }}
      >
        <FlatList
          ref={todoFlatList => {
            this.todoFlatList = todoFlatList;
          }}
          style={{
            flex: 1,
            alignSelf: "stretch"
          }}
          data={this.global.sections}
          numColumns={1}
          initialNumToRender={1}
          initialScrollIndex={this.global.sections.length == 1 ? 0 : 1}
          renderItem={({ item, index }) => {
            if (index == 0) {
              return (
                <Settings
                  scrollToNext={() => {
                    this.todoFlatList.scrollToIndex({
                      index: 1
                    });
                  }}
                ></Settings>
              );
            } else {
              return (
                <Home
                  ID={index}
                  headerTitle={item.headerTitle}
                  icon={item.icon}
                  headerTextColor={item.headerTextColor}
                  headerBackColor={item.headerBackColor}
                  //dotsColor={item.dotsColor}
                  //todoBackColor={item.todoBackColor}
                  //todoTextColor={item.todoTextColor}
                  //checkedLineColor={item.checkedLineColor}
                  index={index - 1}
                  setIcon={(newIcon, index) => {
                    let newData = [...this.global.sections];
                    newData[index].icon = newIcon;
                    this.setGlobal({ sections: newData }, () =>
                      this.setState({ defaultIcon: false })
                    );
                  }}
                  defaultIcon={this.state.defaultIcon}
                ></Home>
              );
            }
          }}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          //initialScrollIndex={1}
          //onContentSizeChange={() => this.todoFlatList.scrollToEnd()}
        ></FlatList>
      </View>
    );
  }
}

export { Landing };
