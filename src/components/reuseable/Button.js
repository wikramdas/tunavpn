import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FIcons from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import { mediumTextFont } from '../../utils/Style'
import LoadingView from '../reuseable/LoadingView'
const iconSize = 20
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
                    alignItems: "center", borderRadius: 100,
                    justifyContent: "center", marginVertical: 5,
                    backgroundColor: disabled ? theme.disableBtnBGColor : theme.btnBGColor,
                    padding: disabled ? 0 : 13,
                },
                bgStyle && bgStyle
                ]}
            >
                {loader ?
                    <View style={[{
                        flex: 1,
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
                                                    style={[{ width: 20, height: 20, tintColor: theme.primaryColor }, leftIconStyle]}
                                                    resizeMode={"contain"}
                                                />
                                            </View>
                                            :
                                            <FIcons name={leftIcon} size={leftIconSize || iconSize} color={leftIconColor ? leftIconColor : theme.iconColor} />
                                }
                            </>
                        }
                        <Text style={[{
                            ...mediumTextFont, fontSize: 18,
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