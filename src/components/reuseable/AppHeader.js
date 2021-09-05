import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import { boldTextFont, secondaryColor, textFont } from '../../utils/Style'
import Icon from 'react-native-vector-icons/Feather'
import { connect } from 'react-redux';
const AppHeader = (props) => {
    const { theme, title, navigation, style, isBell, isShare, onSharePress } = props
    const handleOnToggle = () => {
        return
        if (navigation) {
            navigation.toggleDrawer();
        }
    }

    return (
        <View style={[{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.headerBGColor,
            paddingVertical: 22,
            paddingHorizontal: 15,
            width: '100%',
            // borderBottomWidth: .3,
            // borderBottomColor: secondaryColor
        }, style]}>
            <View style={{ flexDirection: "row", flex: .25, alignItems: "center", justifyContent: "flex-start" }}>
                <TouchableOpacity style={{ marginRight: 10 }} activeOpacity={0.7} onPress={() => { handleOnToggle() }}>
                    <Image
                        source={require("../../assets/images/icons/menu-icon.png")}
                        style={{
                            width: 18, height: 18
                        }}
                    />
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row", flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text numberOfLines={1} style={[textFont, { flex: 1, fontSize: 20, ...boldTextFont, textAlign: "center", color: theme.headerTextColor }]}>
                    {title}
                </Text>
            </View>

            <View style={{ flexDirection: "row", flex: .25, alignItems: "center", justifyContent: "flex-end" }}>
                {isBell &&
                    <TouchableOpacity
                        activeOpacity={.8}
                        onPress={() => { }}
                        style={{
                            marginRight: 15
                        }}>
                        <Image
                            source={require("../../assets/images/icons/bell.png")}
                            style={{
                                width: 22, height: 22,
                                tintColor: theme.iconColor
                            }}
                        />
                    </TouchableOpacity>
                }
                {isShare &&
                    <TouchableOpacity
                        activeOpacity={.8}
                        onPress={() => onSharePress && onSharePress()}
                        style={{
                            // flex: 1
                        }}>
                        <Icon name={"share-2"} size={22} color={theme.iconColor} />
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}
mapStateToProps = (state) => {
    return {
        userInfo: state.reducer.userInfo,
        theme: state.reducer.theme
    }
}
export default connect(mapStateToProps, null)(AppHeader)