import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import { boldTextFont, textFont } from '../../utils/Style';
import InputText from "../reuseable/InputText"
import Wrapper from '../reuseable/Wrapper';
import Button from "../reuseable/Button"
const appLogo = require("../../assets/images/icons/logo.png")

const SignUp = (props) => {
    const passwordRef = useRef(null)
    const confirmPasswordRef = useRef(null)
    const { navigation } = props
    const [isLoading, setLoading] = useState(false)
    const [email, setUserEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)

    useEffect(() => {

    }, [])

    const handleOnSignup = () => {
        alert("signed up")
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
                <View style={{ flex: .2, alignItems: "flex-start", justifyContent: "center" }}>
                    <Image
                        source={appLogo}
                        style={{
                            width: "40%",
                        }}
                        resizeMode={"contain"}
                    />
                    <View style={{ justifyContent: "center" }}>
                        {/* <Text style={[{ color: "#fff", ...boldTextFont, fontSize: 30 }]}>{`Your Logo`}</Text> */}
                    </View>
                </View>
                <View style={{ justifyContent: "flex-start", marginVertical: 30 }}>
                    <Text style={[{ color: "#fff", ...boldTextFont, fontSize: 23 }]}>{`Sign Up`}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <InputText
                        placeholder={"Email Address"}
                        value={email}
                        onChangeText={(email) => { setUsername(email) }}
                        returnKeyType={"next"}
                        leftIcon={require("../../assets/images/icons/user.png")}
                        leftIconType={"image"}
                        leftIconPress={() => { }}
                        onSubmit={() => { passwordRef.current.focus() }}
                    />
                    <InputText
                        onRef={passwordRef}
                        placeholder={"Password"}
                        value={password}
                        onChangeText={(password) => { setPassword(password) }}
                        returnKeyType={"next"}
                        isPassword={true}
                        leftIcon={require("../../assets/images/icons/lock.png")}
                        leftIconType={"image"}
                        leftIconPress={() => { }}
                        onSubmit={() => { confirmPasswordRef.current.focus() }}
                    />
                    <InputText
                        onRef={confirmPasswordRef}
                        placeholder={"Confirm Password"}
                        value={confirmPassword}
                        onChangeText={(confirmPassword) => { setConfirmPassword(confirmPassword) }}
                        returnKeyType={"done"}
                        isPassword={true}
                        leftIcon={require("../../assets/images/icons/lock.png")}
                        leftIconType={"image"}
                        leftIconPress={() => { }}
                        onSubmit={() => { handleOnSignup() }}
                    />
                    <Button
                        label={"Sign Up"}
                        onPress={() => { handleOnSignup() }}
                        loader={isLoading}
                        disabled={isLoading}
                        loaderSize={20}
                        txtStyle={{}}
                        bgStyle={{
                            marginVertical: 20
                        }}
                    />
                </View>
                <View style={[{
                    alignItems: "center", justifyContent: "center",
                }]}>
                    <Text style={[textFont, { fontSize: 16, color: "#fff" }]}> {"Already have an account?"} </Text>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={{
                        }}
                        onPress={() => { navigation.navigate("Login") }}>
                        <Text style={[boldTextFont, { fontSize: 16, color: "#2E8ADB" }]}> {"Sign In"} </Text>
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
export default SignUp