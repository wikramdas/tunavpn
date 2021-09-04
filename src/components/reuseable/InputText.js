import React, { useState, useEffect } from 'react'
import { Platform, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import AntDesignIcons from 'react-native-vector-icons/AntDesign'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import FIcons from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import { FontSize, Height, Width } from '../../utils/Dimensions'
import { textFont } from '../../utils/Style'
import Utils from '../../utils/Utils'
const rightIconSize = FontSize(15)
const leftIconSize = FontSize(15)
const InputText = (props) => {
    const [blurOnSubmit, setBlurOnSubmit] = useState(props.blurOnSubmit ? props.blurOnSubmit : true)
    const [isPassword, setPassword] = useState(props.isPassword ? props.isPassword : false)
    const [editable, setEditable] = useState(props.editable ? props.editable : true)
    const [showPassword, setShowPassword] = useState(false)
    const [inputText, setInputText] = useState(props.value ? props.value : "")
    const [maxLength, setMaxLength] = useState(props.maxLength ? props.maxLength : undefined)
    const [label, setLabel] = useState(props.label ? props.label : "")
    const [keyboardType, setKeyboardType] = useState(props.keyboardType ? props.keyboardType : "default")
    const [returnKeyType, setReturnKeyType] = useState(props.returnKeyType ? props.returnKeyType : "done")
    const [placeholder, setPlaceholder] = useState(props.placeholder ? props.placeholder : "")
    const [autoFocus] = useState(props.autoFocus ? props.autoFocus : false)
    const [multiline] = useState(props.multiline ? props.multiline : false)
    const [numberOfLines] = useState(props.numberOfLines ? props.numberOfLines : 1)

    const [rightIcon, setRightIcon] = useState(props.rightIcon ? props.rightIcon : undefined)
    const [leftIcon, setLeftIcon] = useState(props.leftIcon ? props.leftIcon : undefined)

    const { theme, rightIconType, rightIconPress, leftIconType, leftIconPress, bgStyle } = props
    const [borderColor, setBorderColor] = useState(theme.borderColor)
    const [rightIconColor, setRightIconColor] = useState(theme.iconColor)

    useEffect(() => {
        setInputText(props.value)
        setPlaceholder(props.placeholder)
    }, [props])

    // functions
    const updateValue = (val) => {
        setInputText(val)
    }
    const updatePlaceholder = (val) => {
        setPlaceholder(val)
    }

    const handleOnInputRef = () => {
        if (props.onRef) {
            props.onRef()
        }
    }

    const handleOnSubmit = () => {
        if (props.onSubmit) {
            props.onSubmit()
        }
    }

    const handleOnTogglePass = () => {
        if (!showPassword && props.rightIcon2) {
            setRightIcon(props.rightIcon2)
        } else {
            setRightIcon(props.rightIcon)
        }
        setShowPassword(!showPassword)
    }

    const handleOnTextChange = (text) => {
        setInputText(text)
        if (props.onChangeText) {
            props.onChangeText(text)
        }
    }

    return (
        <View style={{
            marginVertical: Height(1.7)
        }}>
            {label != "" &&
                <Text style={[textFont, { fontSize: FontSize(12), color: theme.text, marginBottom: Height(.8) }]}> {label} </Text>
            }
            <View style={[{
                flexDirection: "row", alignItems: "center", justifyContent: "center",
                // marginBottom: (Platform.OS == "ios" ? 10 : 0),
                backgroundColor: theme.inputBG,
                borderRadius: Width(100),
                padding: Width(1.2),
                // borderColor: borderColor,
                // borderWidth: .5, 
                marginBottom: Height(1)
            }, bgStyle]}>
                {!Utils.isEmptyString(leftIcon) &&
                    <TouchableOpacity activeOpacity={0.7} onPress={() => {
                        leftIconPress()
                    }}
                        style={{ marginLeft: Width(2) }}
                    >
                        {leftIconType == "image" ?
                            <Image
                                source={leftIcon}
                                style={{
                                    height: Width(5), width: Width(5)
                                }}
                                resizeMode={"contain"}
                            />
                            :
                            leftIconType == "fontawesome" ?
                                <FontAwesome name={leftIcon} size={leftIconSize} color={theme.iconColor} />
                                :
                                leftIconType == "evil" ?
                                    <EvilIcons name={leftIcon} size={leftIconSize} color={theme.iconColor} />
                                    :
                                    leftIconType == "ant" ?
                                        <AntDesignIcons name={leftIcon} color={theme.iconColor} size={leftIconSize} />
                                        :
                                        <FIcons name={leftIcon} size={leftIconSize} color={theme.iconColor} />
                        }
                    </TouchableOpacity>
                }
                <TextInput
                    editable={editable == "false" ? false : true}
                    ref={props.onRef}
                    style={{
                        ...textFont,
                        flex: 1, fontSize: FontSize(12),
                        paddingLeft: Width(3), padding: Width(2.5),
                        paddingTop: (Platform.OS == "ios" && multiline) ? Height(1.5) : Height(1),
                        color: editable == "false" ? theme.textLight : theme.text
                    }}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    placeholderTextColor={theme.textLight}
                    value={inputText}
                    onChangeText={(text) => { handleOnTextChange(text) }}
                    // underlineColorAndroid={"rgba(0,0,0,0)"}
                    keyboardType={keyboardType} //email-address,number-pad,phone-pad
                    autoCapitalize={"none"}
                    returnKeyType={returnKeyType}
                    onSubmitEditing={() => { handleOnSubmit() }}
                    secureTextEntry={isPassword && !showPassword}
                    autoFocus={autoFocus}
                    multiline={multiline}
                    blurOnSubmit={blurOnSubmit}
                    numberOfLines={Platform.OS === 'ios' ? null : numberOfLines}
                    minHeight={(Platform.OS === 'ios' && numberOfLines) ? (20 * numberOfLines) : null}
                    onFocus={() => {
                        setBorderColor(theme.primaryColor)
                        setRightIconColor(theme.primaryColor)
                    }}
                    onBlur={() => {
                        setBorderColor(theme.borderColor)
                        setRightIconColor(theme.iconColor)
                    }}
                />
                {!Utils.isEmptyString(rightIcon) &&
                    <>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => {
                            if (isPassword) {
                                handleOnTogglePass()
                            } else {
                                rightIconPress()
                            }
                        }}
                            style={{ marginRight: Width(4) }}
                        >
                            {rightIconType == "fontawesome" ?
                                <FontAwesome name={rightIcon} size={rightIconSize} color={rightIconColor} />
                                :
                                rightIconType == "evil" ?
                                    <EvilIcons name={rightIcon} size={rightIconSize} color={rightIconColor} />
                                    :
                                    rightIconType == "ant" ?
                                        <AntDesignIcons name={rightIcon} color={rightIconColor} size={rightIconSize} />
                                        :
                                        <FIcons name={rightIcon} size={rightIconSize} color={rightIconColor} />
                            }
                        </TouchableOpacity>
                    </>
                }
            </View>
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
export default connect(mapStateToProps, null)(InputText)
