import React, { Component } from 'react'
import { Text, TouchableOpacity, View, Image } from 'react-native'
import { connect } from 'react-redux'
import FIcons from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { textFont, mediumTextFont } from '../../utils/Style'
import { FontSize, Height, Width } from '../../utils/Dimensions';
import myUtils from '../../utils/Utils'
import LoadingView from '../reuseable/LoadingView'
const iconSize = FontSize(18)
const MyButton = (props) => {
    const { onPress, bgStyle, txtStyle, label, isFocused, badge,
        theme, disabled, loader, leftIcon, leftIconType, leftIconColor, leftIconSize,
        rightIcon, rightIconType, rightIconColor, rightIconSize, leftIconStyle,
        loaderSize
    } = props
    return (
        <TouchableOpacity
            // style={{ flex: 1 }}
            disabled={disabled}
            activeOpacity={0.9}
            onPress={() => onPress()}
            accessibilityRole="button"
        >
            <View
                style={[{
                    alignItems: "center", borderRadius: Width(100),
                    justifyContent: "center", marginVertical: Height(.5),
                    backgroundColor: disabled ? theme.disableBtnBGColor : theme.btnBGColor,
                    padding: Width(disabled ? 0 : 2), height: Height(6)
                },
                bgStyle && bgStyle
                ]}
            >
                {loader ?
                    <View style={[{
                        flex: 1,
                        // paddingHorizontal: Width(2),
                        // paddingVertical: Height(.5),
                    }]}>
                        <LoadingView size={loaderSize} />
                    </View>
                    :
                    <View style={{
                        alignItems: "center", flexDirection: "row"
                    }}>
                        {leftIcon &&
                            <>
                                {leftIconType == "fontawesome" ?
                                    <FontAwesome name={leftIcon} size={leftIconSize || iconSize} color={leftIconColor ? leftIconColor : theme.iconColor} />
                                    :
                                    leftIconType == "ant" ?
                                        <AntDesign name={leftIcon} size={leftIconSize || iconSize} color={leftIconColor ? leftIconColor : theme.iconColor} />
                                        :
                                        leftIconType == "image" ?
                                            <View style={{ flex: 1, alignItems: "center" }}>
                                                <Image
                                                    source={leftIcon}
                                                    style={[{ width: Width(8), height: Width(8), tintColor: theme.primaryColor }, leftIconStyle]}
                                                    resizeMode={"contain"}
                                                />
                                            </View>
                                            :
                                            <FIcons name={leftIcon} size={leftIconSize || iconSize} color={leftIconColor ? leftIconColor : theme.iconColor} />
                                }
                            </>
                        }
                        <Text style={[{
                            ...mediumTextFont, fontSize: FontSize(16),
                            // paddingHorizontal: Width(2),
                            // paddingVertical: Height(.5), 
                            color: theme.btnTextColor, textAlign: "center"
                        },
                        txtStyle && txtStyle
                        ]}>{label}</Text>
                        {rightIcon &&
                            <>
                                {rightIconType == "fontawesome" ?
                                    <FontAwesome name={rightIcon} size={rightIconSize || iconSize} color={rightIconColor ? rightIconColor : theme.iconColor} />
                                    :
                                    rightIconType == "ant" ?
                                        <AntDesign name={rightIcon} size={rightIconSize || iconSize} color={rightIconColor ? rightIconColor : theme.iconColor} />
                                        :
                                        <FIcons name={rightIcon} size={rightIconSize || iconSize} color={rightIconColor ? rightIconColor : theme.iconColor} />
                                }
                            </>
                        }
                    </View>
                }
            </View>
        </TouchableOpacity>
    )
}
mapStateToProps = (state) => {
    return {
        userInfo: state.reducer.userInfo,
        isLoggedIn: state.reducer.isLoggedIn,
        theme: state.reducer.theme
    }
}
export default connect(mapStateToProps, null)(MyButton)