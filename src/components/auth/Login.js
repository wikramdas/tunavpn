import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import { boldTextFont, textFont } from '../../utils/Style';
import InputText from "../reuseable/InputText"
import Wrapper from '../reuseable/Wrapper';
import Utils from '../../utils/Utils';
const appLogo = require("../../assets/images/icons/title-logo.png")

const Login = (props) => {
    const passwordRef = useRef(null)
    const { navigation } = props
    const [isLoading, setLoading] = useState(false)
    const [email, setUserEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {

    }, [])

    const handleOnLogin = () => {
        if (Utils.isEmptyString(email)) { Utils.displayToastBar("Please enter an email address"); return }
        if (!Utils.isValidEmail(email)) { Utils.displayToastBar("Please enter a valid email address"); return }
        if (Utils.isEmptyString(password)) { Utils.displayToastBar("Password can't be empty"); return }
        navigation.navigate("BuySubscription")
        // alert("logged in")
    }
    return (
        <Wrapper style={{
            // flex: 1,
        }}>
            <KeyboardAwareScrollView
                contentContainerStyle={{ flex: 1 }}
                style={styles.innerMainView}
                keyboardShouldPersistTaps={"always"}
                showsVerticalScrollIndicator={false}>
                <View style={{ flex: .7, alignItems: "center", justifyContent: "center" }}>
                    <Image
                        source={appLogo}
                        style={{
                            width: "45%",
                        }}
                        resizeMode={"contain"}
                    />
                    <View style={{ justifyContent: "center" }}>
                        {/* <Text style={[{ color: "#fff", ...boldTextFont, fontSize: 30 }]}>{`Your Logo`}</Text> */}
                    </View>
                </View>
                <View style={{ justifyContent: "flex-start", marginVertical: 30 }}>
                    <Text style={[{ color: "#fff", ...boldTextFont, fontSize: 23 }]}>{`Sign In`}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <InputText
                        // label={"First Name"}
                        placeholder={"Email Address"}
                        value={email}
                        onChangeText={(email) => { setUserEmail(email) }}
                        returnKeyType={"next"}
                        leftIcon={require("../../assets/images/icons/user.png")}
                        leftIconType={"image"}
                        leftIconPress={() => { }}
                        onSubmit={() => { passwordRef.current.focus() }}
                    />
                    <InputText
                        onRef={passwordRef}
                        // label={"First Name"}
                        placeholder={"Password"}
                        value={password}
                        onChangeText={(password) => { setPassword(password) }}
                        returnKeyType={"done"}
                        isPassword={true}
                        leftIcon={require("../../assets/images/icons/lock.png")}
                        leftIconType={"image"}
                        leftIconPress={() => { }}
                        onSubmit={() => { handleOnLogin() }}
                    />

                    {/* <View style={[styles.flexRow, styles.textInputContainer]}>
                        <AntDesign name={"user"} color={"#FFF"} size={18} />
                        <TextInput
                            style={styles.textInputStyle}
                            placeholder={"Email Address"}
                            placeholderTextColor={"#999"}
                            value={email}
                            onChangeText={(text) => { setUserEmail(text) }}
                            underlineColorAndroid={"rgba(0,0,0,0)"}
                            keyboardType={"email-address"} //email-address,number-pad,phone-pad
                            autoCapitalize={"none"}
                            returnKeyType={"next"}
                        />
                    </View>
                    <View style={[styles.flexRow, styles.textInputContainer]}>
                        <AntDesign name={"lock"} color={"#FFF"} size={18} />
                        <TextInput
                            style={styles.textInputStyle}
                            placeholder={"Password"}
                            placeholderTextColor={"#999"}
                            value={password}
                            onChangeText={(text) => { setPassword(text) }}
                            underlineColorAndroid={"rgba(0,0,0,0)"}
                            // keyboardType={"email-address"} //email-address,number-pad,phone-pad
                            autoCapitalize={"none"}
                            returnKeyType={"next"}
                        />
                    </View> */}
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
export default Login