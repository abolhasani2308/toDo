import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
  Dimensions,
  ActivityIndicator,
  StatusBar
} from "react-native";

class IntroSlider extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      slides: [
        {
          title: "تیتر صفحه اول",
          written: "متن صفحه اول",
          icon: require("../Image/01.png"),
          backColor: "#A7414A"
        },
        {
          title: "تیتر صفحه دوم",
          written: "متن صفحه دوم",
          icon: require("../Image/02.png"),
          backColor: "#282726"
        },
        {
          title: "تیتر صفحه سوم",
          written: "متن صفحه سوم",
          icon: require("../Image/03.png"),
          backColor: "#6A8A82"
        },
        {
          title: "تیتر صفحه چهارم",
          written: "متن صفحه چهارم",
          icon: require("../Image/04.png"),
          backColor: "#A37C27"
        },
        {
          title: "تیتر صفحه پنجم",
          written: "متن صفحه پنجم",
          icon: require("../Image/05.png"),
          backColor: "#563838"
        }
      ],
      isLoading: true,
      whichSlide: ""
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("whichSlide")
      .then(whichSlide => {
        if (whichSlide) {
          this.setState({ whichSlide: Number(whichSlide) });
        }
      })
      .catch(error => {
        console.warn(error);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={{
            flex: 1,
            alignSelf: "stretch",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <StatusBar hidden></StatusBar>
          <ActivityIndicator size="large" color={"#A7414A"}></ActivityIndicator>
        </View>
      );
    }
    return (
      <View
        style={{
          flex: 1,
          alignSelf: "stretch",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <StatusBar hidden></StatusBar>
        <FlatList
          ref={flatList => {
            this.flatList = flatList;
          }}
          style={{
            flex: 1,
            alignSelf: "stretch"
          }}
          data={this.state.slides}
          renderItem={({ item }) => {
            return (
              //--------------------Page--------------------
              <View
                style={{
                  width: Dimensions.get("window").width,
                  height: Dimensions.get("window").height,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: item.backColor
                }}
              >
                {/*--------------------Icon--------------------*/}
                <View
                  style={{
                    flex: 3,
                    alignSelf: "stretch",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Image
                    style={{
                      width: 250,
                      height: 250,
                      resizeMode: "center",
                      tintColor: "white"
                    }}
                    source={item.icon}
                  ></Image>
                </View>
                {/*--------------------Title--------------------*/}
                <View
                  style={{
                    flex: 0.5,
                    alignSelf: "stretch",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      fontSize: 32,
                      color: "white",
                      fontFamily: "Yekan"
                    }}
                  >
                    {item.title}
                  </Text>
                </View>
                {/*--------------------Written--------------------*/}
                <View
                  style={{
                    flex: 0.8,
                    alignSelf: "stretch",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: "white",
                      fontFamily: "Yekan"
                    }}
                  >
                    {item.written}
                  </Text>
                </View>
                {/*--------------------Touchable & Circles--------------------*/}
                <View
                  style={{
                    flex: 0.6,
                    alignSelf: "stretch",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row"
                  }}
                >
                  {/*--------------------Touchable1--------------------*/}
                  <View
                    style={{
                      flex: 1,
                      alignSelf: "stretch",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <TouchableOpacity
                      style={{ alignItems: "center", justifyContent: "center" }}
                      onPress={() => {
                        this.props.navigation.navigate("_Settings");
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          color: "white",
                          fontFamily: "Yekan"
                        }}
                      >
                        پرش
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {/*--------------------Circles--------------------*/}
                  <View
                    style={{
                      flex: 2,
                      alignSelf: "stretch",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      flexDirection: "row"
                    }}
                  >
                    {this.state.slides.map((_, index) => {
                      return (
                        <View
                          key={index}
                          style={{
                            width: 15,
                            height: 15,
                            borderRadius: 100,
                            borderWidth: 1,
                            borderColor: "white",
                            backgroundColor:
                              this.state.whichSlide == index
                                ? "white"
                                : item.backColor
                          }}
                        ></View>
                      );
                    })}
                  </View>
                  {/*--------------------Touchable2--------------------*/}
                  <View
                    style={{
                      flex: 1,
                      alignSelf: "stretch",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <TouchableOpacity
                      style={{ alignItems: "center", justifyContent: "center" }}
                      onPress={() => {
                        if (
                          this.state.whichSlide !=
                          this.state.slides.length - 1
                        ) {
                          this.setState(
                            {
                              whichSlide: Number(this.state.whichSlide) + 1
                            },
                            () => {
                              try {
                                AsyncStorage.setItem(
                                  "whichSlide",
                                  String(this.state.whichSlide)
                                )
                                  .then(() => {})
                                  .catch(error => console.warn(error));

                                this.flatList.scrollToIndex({
                                  index: this.state.whichSlide
                                });
                              } catch (error) {
                                console.warn(error);
                              }
                            }
                          );
                        } else {
                          this.props.navigation.navigate("_Landing");
                        }
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          color: "white",
                          fontFamily: "Yekan"
                        }}
                      >
                        {this.state.whichSlide != this.state.slides.length - 1
                          ? "بعدی"
                          : "ورود"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
          keyExtractor={item => item.title}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          initialScrollIndex={this.state.whichSlide}
          onMomentumScrollEnd={e => {
            const contentOffset = e.nativeEvent.contentOffset;
            const viewSize = e.nativeEvent.layoutMeasurement;

            const witchSlide = (contentOffset.x / viewSize.width).toFixed();

            this.setState({ whichSlide: witchSlide }, () => {
              AsyncStorage.setItem("whichSlide", String(this.state.whichSlide))
                .then(() => {})
                .catch(error => {
                  console.warn(error);
                });
            });
          }}
        ></FlatList>
      </View>
    );
  }
}
export { IntroSlider };
