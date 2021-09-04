import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView, ImageBackground } from 'react-native';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import { boldTextFont, textFont } from '../../utils/Style';
import Wrapper from '../reuseable/Wrapper';
import { connect } from 'react-redux';
import AppHeader from '../reuseable/AppHeader';
import Config from '../../utils/Config';
import { FontSize, ScreenHeight, ScreenWidth, Width } from '../../utils/Dimensions';
const astronautIcon = require("../../assets/images/icons/astronaut.png")

const BuySubscription = (props) => {
    const passwordRef = useRef(null)
    const { navigation, theme } = props
    const [isLoading, setLoading] = useState(false)
    const [email, setUserEmail] = useState("johndoe@gmail.com")
    const [password, setPassword] = useState("")

    useEffect(() => {

    }, [])

    const handleOnLogin = () => {
        alert("logged in")
    }
    return (
        <Wrapper>
            <AppHeader
                title={Config.appName}
                navigation={navigation}
            />
            <View style={{
                flex: 1
            }}>
                <ScrollView
                    contentContainerStyle={{
                        flex: 1
                    }}
                >
                    <ImageBackground
                        source={astronautIcon}
                        style={{
                            // flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            height: "85%",
                        }}
                        resizeMode={"cover"}
                    >
                        <View style={{
                            position: "absolute", top: 0, left: 0,
                            paddingHorizontal: Width(4)
                        }}>
                            <Text style={{
                                ...boldTextFont, color: theme.textBold,
                                fontSize: FontSize(16)
                            }}>Your First 7 days free</Text>
                            <Text style={{
                                ...textFont, color: theme.text,
                                fontSize: FontSize(12)
                            }}>No commitment, cancel anytime</Text>
                        </View>
                    </ImageBackground>
                </ScrollView>
            </View>
            <KeyboardAwareScrollView
                contentContainerStyle={{ flex: 1 }}
                style={styles.innerMainView}
                keyboardShouldPersistTaps={"always"}
                showsVerticalScrollIndicator={false}>

                <View style={{ justifyContent: "flex-start", marginVertical: 30 }}>
                    <Text style={[{ color: "#fff", ...boldTextFont, fontSize: 23 }]}>{`Sign In`}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <View style={{
                        alignItems: "flex-end",
                    }}>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={{
                                marginBottom: 20,
                            }}
                            onPress={() => { alert("Forgot Password") }}>
                            <Text style={[textFont, { fontSize: 17, color: "#fff" }]}> {"Forgot Password?"} </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        activeOpacity={.8}
                        onPress={() => handleOnLogin()}
                        style={{
                            backgroundColor: "#2E8ADB", borderRadius: 100,
                            alignItems: "center", padding: 12, marginVertical: 20
                        }}
                    >
                        <Text style={{
                            ...textFont, fontSize: 18, color: "#fff"
                        }}>Sign In</Text>
                    </TouchableOpacity>
                </View>
                <View style={[{
                    flex: .2,
                    alignItems: "center", justifyContent: "center",
                    marginVertical: 10
                }]}>
                    <Text style={[textFont, { fontSize: 16, color: "#fff" }]}> {"Don’t have an account?"} </Text>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={{
                            // marginBottom: Height(2),
                        }}
                        onPress={() => { navigation.navigate("SignUp") }}>
                        <Text style={[boldTextFont, { fontSize: 16, color: "#2E8ADB" }]}> {"Sign Up"} </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </Wrapper>
    )
}
const styles = StyleSheet.create({
    flexRow: {
        flexDirection: "row", alignItems: "center"
    },
    innerMainView: {
        // paddingVertical: Height(4),
        flex: 1, flexDirection: "column",
        paddingHorizontal: 20
    },
    textInputContainer: {
        backgroundColor: "#1C1C1E",
        borderRadius: 100, padding: 12,
        paddingHorizontal: 15, marginBottom: 20
    },
    textInputStyle: {
        ...textFont, flex: 1,
        fontSize: 16,
        color: "#FFF", paddingLeft: 10,
    }
})

mapStateToProps = (state) => {
    return {
        userInfo: state.reducer.userInfo,
        isLoggedIn: state.reducer.isLoggedIn,
        theme: state.reducer.theme,
    }
}
export default connect(mapStateToProps, null)(BuySubscription)