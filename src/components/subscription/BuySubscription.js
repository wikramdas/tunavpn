import React, { useEffect, useRef, useState } from 'react';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FIcons from "react-native-vector-icons/Feather";
import { connect } from 'react-redux';
import Config from '../../utils/Config';
import { boldTextFont, mediumTextFont, textFont } from '../../utils/Style';
import Utils from '../../utils/Utils';
import AppHeader from '../reuseable/AppHeader';
import Button from '../reuseable/Button';
import Wrapper from '../reuseable/Wrapper';
const astronautIcon = require("../../assets/images/icons/astronaut.png")

const subscriptionArray = [
    { id: 1, validity: "month", cost: "12.99", text: "After trial ends", validityText: "MONTHLY", isSelected: true },
    { id: 2, validity: "year", cost: "79.99", text: "After trial ends", validityText: "YEARLY", isSelected: false },
]
const BuySubscription = (props) => {
    const passwordRef = useRef(null)
    const { navigation, theme } = props
    const [isLoading, setLoading] = useState(false)

    const [subscriptionList, setSubsriptionList] = useState(subscriptionArray)
    const [renderView, setRender] = useState(0)

    useEffect(() => {

    }, [renderView])

    const handleOnSubscription = (item) => {
        var tempArr = []
        subscriptionList.map((i, index) => {
            if (i.id == item.id) {
                i.isSelected = true
            } else {
                i.isSelected = false
            }
            tempArr.push(i)
        })
        setRender(prev => prev + 1)
        setSubsriptionList(tempArr)
    }
    return (
        <Wrapper>
            <AppHeader
                title={Config.appName}
                navigation={navigation}
                isShare={true}
                isBell={true}
                onSharePress={() => {
                    return
                    alert("share something")
                }}
            />
            <View style={{
                flex: 1
            }}>
                <ScrollView>
                    <View style={{
                        flex: 1
                    }}>
                        <ImageBackground
                            source={astronautIcon}
                            style={{
                                // flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                                height: "88%", opacity: .9
                            }}
                            resizeMode={"cover"}
                        >
                            <View style={{
                                position: "absolute", top: 0, left: 0,
                                paddingHorizontal: 15, marginVertical: 10
                            }}>
                                <Text style={{
                                    ...boldTextFont, color: theme.textBold,
                                    fontSize: 19
                                }}>Your First 7 days free</Text>
                                <Text style={{
                                    ...textFont, color: theme.text,
                                    fontSize: 14
                                }}>No commitment, cancel anytime</Text>
                            </View>
                        </ImageBackground>

                        <View style={{
                            flex: 1,
                        }}>
                            <View>
                                {!Utils.isEmptyArray(subscriptionList) && subscriptionList.map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            key={index.toString()}
                                            activeOpacity={.8}
                                            onPress={() => handleOnSubscription(item)}
                                            style={[styles.flexRow, {
                                                padding: 14, marginHorizontal: 15, borderRadius: 10,
                                                backgroundColor: theme.inputBG, marginVertical: 8, paddingHorizontal: 20,
                                                borderWidth: 1, borderColor: item.isSelected ? theme.primaryColor : theme.background
                                            }]}
                                        >
                                            <View style={{
                                                flex: 1
                                            }}>
                                                <Text style={[textFont, { fontSize: 15, color: theme.textLight }]}>{item.validityText} </Text>
                                                <Text style={[boldTextFont, { fontSize: 17, color: theme.textBold, marginVertical: 3 }]}>${item.cost}<Text style={[mediumTextFont, { fontSize: 18, color: theme.text }]}>{`/${item.validity}`} </Text></Text>
                                                <Text style={[mediumTextFont, { fontSize: 15, color: theme.text }]}>{item.text} </Text>
                                            </View>
                                            <View>
                                                {item.isSelected ?
                                                    <Image
                                                        source={require("../../assets/images/icons/check-mark.png")}
                                                        style={{
                                                            width: 30, height: 30
                                                        }}
                                                    />
                                                    :
                                                    <FIcons name={"circle"} color={theme.iconColor} size={30} />
                                                }
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>

                            <View style={[{
                                alignItems: "center", justifyContent: "center",
                                marginVertical: 20
                            }]}>
                                <Text style={[mediumTextFont, { fontSize: 18, color: theme.primaryColor }]}> {"Deliver more faster server & No ads"} </Text>
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    style={{
                                        // marginBottom: Height(2),
                                    }}
                                    disabled={true}
                                    onPress={() => { navigation.navigate("SignUp") }}>
                                    <Text style={[mediumTextFont, { fontSize: 16, color: theme.textLight }]}> {"Plan auto renews monthly"} </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={{
                    justifyContent: "flex-end",
                    marginHorizontal: 15,
                }}>
                    <Button
                        label={"Start Subscription"}
                        onPress={() => { handleOnSignup() }}
                        loader={isLoading}
                        disabled={isLoading}
                        loaderSize={25}
                        txtStyle={{}}
                        bgStyle={{
                            // marginVertical: Height(4)
                        }}
                    />
                </View>
            </View>
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