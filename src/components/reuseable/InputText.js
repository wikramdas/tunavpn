import React, { useState, useEffect } from 'react'
import { Platform, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import AntDesignIcons from 'react-native-vector-icons/AntDesign'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import FIcons from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import { textFont } from '../../utils/Style'
import Utils from '../../utils/Utils'
const rightIconSize = 16
const leftIconSize = 16
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
            marginVertical: 12
        }}>
            {label != "" &&
                <Text style={[textFont, { fontSize: 16, color: theme.text, marginBottom: 10 }]}> {label} </Text>
            }
            <View style={[{
                flexDirection: "row", alignItems: "center", justifyContent: "center",
                backgroundColor: theme.inputBG,
                borderRadius: 100,
                padding: 5,
                marginBottom: 5
            }, bgStyle]}>
                {!Utils.isEmptyString(leftIcon) &&
                    <TouchableOpacity activeOpacity={0.7} onPress={() => {
                        leftIconPress()
                    }}
                        style={{ marginLeft: 10 }}
                    >
                        {leftIconType == "image" ?
                            <Image
                                source={leftIcon}
                                style={{
                                    height: 20, width: 20
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
                        flex: 1, fontSize: 16,
                        paddingLeft: 12, padding: 10,
                        paddingTop: (Platform.OS == "ios" && multiline) ? 15 : 10,
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
                            style={{ marginRight: 20 }}
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
