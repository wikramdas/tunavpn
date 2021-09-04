import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import { boldTextFont, secondaryColor, textFont } from '../../utils/Style'
import Icon from 'react-native-vector-icons/Feather'
import { FontSize, Height, Width } from '../../utils/Dimensions';
import { connect } from 'react-redux';
const AppHeader = (props) => {
    const { theme, title, navigation, style } = props
    const handleOnToggle = () => {
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
            paddingVertical: Height(2.4),
            paddingHorizontal: Width(3),
            width: '100%',
            // borderBottomWidth: .3,
            // borderBottomColor: secondaryColor
        }, style]}>
            <View style={{ flexDirection: "row", flex: .3, alignItems: "center", justifyContent: "flex-start" }}>
                <TouchableOpacity style={{ marginRight: Width(1.5) }} activeOpacity={0.7} onPress={() => { handleOnToggle() }}>
                    <Icon name={"align-left"} size={FontSize(25)} color={theme.headerTextColor} />
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row", flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text numberOfLines={1} style={[textFont, { flex: 1, fontSize: FontSize(16), ...boldTextFont, textAlign: "center", color: theme.headerTextColor }]}>
                    {title}
                </Text>
            </View>

            <View style={{ flexDirection: "row", flex: .3, alignItems: "center", justifyContent: "flex-end" }}>
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