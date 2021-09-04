import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { connect } from "react-redux";
import { textFont } from '../utils/Style';
import Utils from '../utils/Utils';
const SplashScreen = (props) => {
    const { theme, navigation } = props
    useEffect(() => {
        startAfterDelay(2000, "Login")
    })
    const startAfterDelay = (delay, routeName) => {
        setTimeout(() => {
            Utils.resetAndGo(navigation, routeName)
        }, delay)
        clearTimeout()
    }
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 20, ...textFont, }}>Splash Screen</Text>
        </View>
    )
}
mapStateToProps = (state) => {
    return {
        userInfo: state.reducer.userInfo,
        isLoggedIn: state.reducer.isLoggedIn,
        theme: state.reducer.theme,
    }
}
export default connect(mapStateToProps, null)(SplashScreen)