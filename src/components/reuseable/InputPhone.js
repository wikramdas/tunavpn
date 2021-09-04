import React, { useState, useRef } from "react";
import {
    StyleSheet, View, StatusBar, TouchableOpacity, Text,
} from "react-native";
import FIcons from 'react-native-vector-icons/Feather'
import PhoneInput from "react-native-phone-number-input";
import { FontSize, Height, Width } from "../../utils/Dimensions";
import { textFont } from "../../utils/Style";

const InputPhone = (props) => {
    const [value, setValue] = useState(props.value ? props.value : "");
    const [defaultCode] = useState(props.defaultCode ? props.defaultCode : "PK");
    const [formattedValue, setFormattedValue] = useState("");
    const [selectedCountry, onChangeCountry] = useState({});
    const [showMessage, setShowMessage] = useState(false);
    const phoneInput = useRef < PhoneInput > (null);
    const { theme, placeholder, onCountryChange, onChangeText } = props

    const handleOnCountryChange = (value) => {
        if (onCountryChange) {
            onCountryChange(value)
        }
        onChangeCountry(value)
    }
    const handleOnTextChange = (text) => {
        if (onChangeText) {
            onChangeText(text)
        }
        setValue(text)
    }
    const borderBottom = {
        borderBottomColor: theme.borderColor, borderBottomWidth: 1
    }
    return (
        <View style={{
            borderRadius: Width(2),
            borderColor: theme.borderColor,
            borderWidth: .5, marginBottom: Height(1),
            flexDirection: "row",
            alignItems: "center", justifyContent: "center",
            backgroundColor: theme.inputBG
        }}>
            <View>
                <PhoneInput
                    // ref={phoneInput}
                    containerStyle={{
                        paddingHorizontal: Width(1), paddingVertical: Height(.8)
                    }}
                    textContainerStyle={[borderBottom, {
                        backgroundColor: theme.inputBG, paddingVertical: 0
                    }]}
                    textInputStyle={[{
                        color: theme.text, ...textFont, fontSize: FontSize(13)
                    }]}
                    codeTextStyle={[borderBottom, {
                        color: theme.textLightColor, ...textFont, fontSize: FontSize(12),
                        fontWeight: "normal"
                    }]}
                    flagButtonStyle={{
                        backgroundColor: theme.inputBG, width: Width(12),
                    }}
                    countryPickerButtonStyle={[borderBottom, {
                        backgroundColor: theme.inputBG, alignItems: "center",
                        justifyContent: "center", marginHorizontal: Width(2)
                    }]}
                    renderDropdownImage={() => {
                        return null
                    }}

                    defaultValue={value}
                    defaultCode={defaultCode}
                    layout="first"
                    placeholder={placeholder}
                    onChangeText={(text) => {
                        handleOnTextChange(text)
                    }}
                    onChangeFormattedText={(text) => {
                        setFormattedValue(text)
                    }}
                    onChangeCountry={(value) => {
                        handleOnCountryChange(value)
                    }}
                    onFocus={() => alert("")}
                    // withDarkTheme
                    // withShadow
                    autoFocus
                />
            </View>
            <TouchableOpacity activeOpacity={0.7} onPress={() => {
                alert("")
            }}
                style={{ marginRight: Width(4) }}
            >
                <FIcons name={"phone"} size={FontSize(15)} color={theme.iconColor} />
            </TouchableOpacity>
        </View>
    );
};

export default InputPhone;