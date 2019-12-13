import React, { Component } from "reactn";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  Keyboard,
  AsyncStorage,
  ActivityIndicator,
  Dimensions
} from "react-native";
import { Header, Card } from "../components";
import { colors, strings } from "../globals";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth
} from "react-native-responsive-dimensions";
import ImagePicker from "react-native-image-picker";

class Home extends Component {
  static navigationOptions = {
    header: ({ navigation }) => <Header navigation={navigation}></Header>
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      text: "",
      whichEditing: undefined,
      todos: [],
      avatarSource: null
    };
    this.icons = {
      delete: require("../Image/09.png")
    };
  }

  componentDidMount() {
    AsyncStorage.getItem(`todos-${this.props.ID}`)
      .then(todos => {
        let parsed = JSON.parse(todos);
        if (parsed) {
          this.setState({ todos: parsed });
        }
      })
      .catch(error => console.warn(error))
      .finally(() => this.setState({ isLoading: false }));
  }

  renderHeaderLeft() {
    if (this.global.sections.length > 1) {
      return (
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "stretch",
            opacity: this.global.sections.length == 1 ? 0.5 : 1
          }}
          disabled={this.global.sections.length == 1}
          onPress={() => {
            let newData = [...this.global.sections];
            newData.splice(this.props.index, 1);

            this.setGlobal({ sections: newData });
          }}
        >
          <View
            style={{
              width: responsiveWidth(7),
              aspectRatio: 1 / 1
            }}
          >
            <Image
              source={this.icons.delete}
              style={{
                flex: 1,
                width: undefined,
                height: undefined,
                tintColor: colors(this.global.theme).secondary
              }}
            ></Image>
          </View>
        </TouchableOpacity>
      );
    } else {
      return <View style={{ flex: 1 }}></View>;
    }
  }

  renderHeaderRight() {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "stretch"
        }}
        onPress={() => {
          const options = {
            title: "انتخاب تصویر",
            maxWidth: responsiveWidth(6),
            maxHeight: responsiveWidth(6),
            storageOptions: {
              skipBackup: true,
              path: "images",
              cameraRoll: false
            }
          };

          ImagePicker.showImagePicker(options, response => {
            if (response.didCancel) {
              () => {};
            } else if (response.error) {
              console.warn("ImagePicker Error: ", response.error);
            } else {
              const source = { uri: response.uri };
              this.setState({
                avatarSource: source
              });

              this.props.setIcon(response.uri, this.props.index);

              let newData = [...this.global.sections];
              newData[this.props.ID].icon = this.state.avatarSource;
              this.setGlobal({ sections: newData }, () => {
                AsyncStorage.setItem("todos", JSON.stringify(newData))
                  .then(() => {})
                  .catch(error => console.warn(error));
              });
            }
          });
        }}
      >
        <View
          style={{
            width: responsiveWidth(6),
            aspectRatio: 1 / 1
          }}
        >
          <Image
            style={{
              width: 30,
              height: 30,
              tintColor: this.state.avatarSource
                ? null
                : colors(this.global.theme).secondary,

              borderRadius: this.state.avatarSource ? 100 : 0,
              transform: [
                {
                  rotateY: this.global.locale == "fa" ? "0deg" : "180deg"
                }
              ]
            }}
            source={
              this.state.avatarSource
                ? this.state.avatarSource
                : this.props.icon
            }
          />
        </View>
      </TouchableOpacity>
    );
  }

  renderHeader() {
    const { headerTitle, headerTextColor, headerBackColor, icon } = this.props;

    return (
      <View
        style={{
          flex: 1,
          flexDirection:
            strings(this.global.locale).DIRECTION == "ltr"
              ? "row"
              : "row-reverse",
          justifyContent: "center",
          alignSelf: "stretch",
          alignItems: "center",
          backgroundColor: colors(this.global.theme).text_color
        }}
      >
        {this.renderHeaderLeft()}
        <View
          style={{
            flex: 5,
            justifyContent: "center",
            alignSelf: "stretch",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              color: headerTextColor,
              fontSize: responsiveFontSize(2.5)
            }}
          >
            {headerTitle}
          </Text>
        </View>
        {this.renderHeaderRight()}
      </View>
    );
  }

  search(query) {
    return this.state.todos.filter(item => item.title.includes(query));
  }

  render() {
    if (this.state.isLoading == "true") {
      return <ActivityIndicator size={"large"}></ActivityIndicator>;
    } else {
      return (
        <View
          style={{
            width: Dimensions.get("window").width,
            //height: Dimensions.get("window").height,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "stretch",
            backgroundColor: "rgb(33,33,33)"
          }}
        >
          {this.renderHeader()}
          {/*list*/}
          <View
            style={{
              flex: 8,
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "stretch",
              backgroundColor: "snow"
            }}
          >
            <FlatList
              ref={flatList => {
                this.flatList = flatList;
              }}
              style={{ flex: 1, alignSelf: "stretch" }}
              data={
                this.global.query
                  ? this.search(this.global.query)
                  : this.state.todos
              }
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    style={{
                      height: responsiveHeight(10),
                      alignSelf: "stretch",
                      justifyContent: "center",
                      alignItems: "center",
                      marginHorizontal: 10,
                      marginVertical: 10,
                      flexDirection:
                        strings(this.global.locale).DIRECTION == "ltr"
                          ? "row"
                          : "row-reverse",
                      borderRadius: 10,
                      elevation: 5,
                      backgroundColor: colors(this.global.theme).secondary
                    }}
                    activeOpacity={1}
                    onPress={() => {
                      let newData = [...this.state.todos];
                      newData[index].isChecked = !newData[index].isChecked;
                      this.setState({ todos: newData });

                      AsyncStorage.setItem("todos", JSON.stringify(newData))
                        .then(() => {})
                        .catch(error => console.warn(error));
                    }}
                    onLongPress={() => {
                      Alert.alert(
                        strings(this.global.locale).deleteTitle,
                        strings(this.global.locale).deleteMessage,
                        [
                          {
                            text: strings(this.global.locale).deleteYes,
                            onPress: () => {
                              let newData = [...this.state.todos];
                              newData.splice(index, 1);
                              this.setState({ todos: newData });
                            }
                          },
                          {
                            text: strings(this.global.locale).deleteNo,
                            onPress: () => {}
                          }
                        ],
                        {
                          cancelable: false
                        }
                      );
                    }}
                  >
                    {item.isChecked ? (
                      <View
                        style={{
                          width: item.textWidth,
                          borderBottomWidth: 1,
                          borderBottomColor: "red",
                          position: "absolute",
                          zIndex: 1
                        }}
                      ></View>
                    ) : null}
                    <Text
                      onLayout={e => {
                        let newData = [...this.state.todos];
                        newData[index].textWidth = e.nativeEvent.layout.width;
                        this.setState({ todos: newData });
                      }}
                      style={{
                        fontSize: responsiveFontSize(2.5),
                        fontFamily: "Yekan",
                        color: colors(this.global.theme).text_color
                      }}
                    >
                      {item.title}
                    </Text>
                    {/*Edit*/}
                    <TouchableOpacity
                      style={{
                        flex: 0.1,
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                      onPress={() => {
                        this.input.focus();
                        this.setState({
                          text: item.title,
                          whichEditing: index
                        });
                      }}
                    >
                      <Image
                        source={require("../Image/08.png")}
                        style={{
                          width: 20,
                          height: 20,
                          //justifyContent: "center",
                          //alignItems: "center",
                          resizeMode: "center",
                          tintColor: colors(this.global.theme).primary,
                          opacity: this.state.message == "" ? 0 : 1
                        }}
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item, index) => item.title + index}
              showsVerticalScrollIndicator={false}
              onContentSizeChange={() => this.flatList.scrollToEnd()}
            ></FlatList>
          </View>
          {/*Text Input*/}
          <View
            style={{
              flex: 1,
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
              placeholder={strings(this.global.locale).inputPlaceHolder}
              placeholderTextColor={colors(this.global.theme).text_color}
              value={this.state.text}
              onChangeText={text => this.setState({ text })}
              underlineColorAndroid="transparent"
            />
            <TouchableOpacity
              style={{
                height: 45,
                width: 45,
                alignItems: "center",
                justifyContent: "center"
              }}
              onPress={() => {
                if (this.state.whichEditing !== undefined) {
                  var newData = [...this.state.todos];
                  newData[this.state.whichEditing].title = this.state.text;
                } else {
                  var newData = [...this.state.todos];
                  newData.push({
                    title: this.state.text,
                    isChecked: false
                  });
                }

                this.setState({
                  todos: newData,
                  text: "",
                  whichEditing: undefined
                });
                this.input.clear();
                Keyboard.dismiss();

                AsyncStorage.setItem(
                  `todos-${this.props.ID}`,
                  JSON.stringify(newData)
                )
                  .then(() => {})
                  .catch(error => console.warn(error));
              }}
              disabled={this.state.text == "" ? true : false}
            >
              <Image
                source={
                  this.state.whichEditing !== undefined
                    ? require("../Image/07.png")
                    : require("../Image/06.png")
                }
                style={{
                  width: 20,
                  height: 20,
                  //justifyContent: "center",
                  //alignItems: "center",
                  resizeMode: "center",
                  tintColor: colors(this.global.theme).text_color,
                  opacity: this.state.message == "" ? 0 : 1
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}

export { Home };
