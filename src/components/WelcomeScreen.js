import React, { Component } from 'react';
import { View, Text, Image, ActivityIndicator, ImageBackground, StyleSheet } from 'react-native';
import { boldTextFont, Empty, primaryColor, textDefault, textFont } from '../utils/Style';
import FIcons from 'react-native-vector-icons/Feather'
import { connect } from "react-redux"
import { FontSize, Height, ScreenWidth, Width } from '../utils/Dimensions';
import Config from '../utils/Config';
import Button from "../components/reuseable/Button"

class WelcomeScreen extends React.Component {
    render() {
        const { language, theme } = this.props
        return (
            <View style={{ backgroundColor: theme.dimBackground, flex: 1 }}>
                <ImageBackground source={require("../images/welcome.png")} style={styles.backgroungImage}>
                    <View style={styles.innerMainView}>
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                            <Image
                                source={require("../images/logo-white.png")}
                                style={{
                                    width: Width(40), height: Width(40),
                                }}
                                resizeMode={"center"}
                            />
                            <Text style={styles.appNameCSS}>{Config.appName}</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }}>
                            <View>
                                <Button
                                    theme={theme}
                                    isFocused={true}
                                    label={"Login"}
                                    onPress={() => { this.props.navigation.navigate("Createfeed") }}
                                    txtStyle={{ paddingVertical: 0, paddingHorizontal: 0 }}
                                    bgStyle={{
                                        backgroundColor: primaryColor,
                                        width: ScreenWidth / 1.5, height: Height(6),
                                        borderRadius: Width(100)
                                    }}
                                />
                            </View>
                            <View>
                                <Button
                                    theme={theme}
                                    isFocused={true}
                                    label={"Sign Up"}
                                    onPress={() => { this.props.navigation.navigate("Createfeed") }}
                                    txtStyle={{ paddingVertical: 0, paddingHorizontal: 0 }}
                                    bgStyle={{
                                        backgroundColor: primaryColor,
                                        width: ScreenWidth / 1.5, height: Height(6),
                                        borderRadius: Width(100)
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    backgroungImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    innerMainView: {
        paddingVertical: Height(6),
        flex: 1, flexDirection: "column",
        alignItems: "center", justifyContent: "center"
    },
    appNameCSS: {
        fontSize: FontSize(24), ...boldTextFont,
        color: "#fff", textAlign: "center",
        // marginVertical: Height(3)
    }
})
mapStateToProps = (state) => {
    return {
        userInfo: state.reducer.userInfo,
        isLoggedIn: state.reducer.isLoggedIn,
        theme: state.reducer.theme,
    }
}
export default connect(mapStateToProps, null)(WelcomeScreen)