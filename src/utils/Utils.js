import { CommonActions } from '@react-navigation/native';
import React from 'react';
import { Alert, Image, Linking, TouchableOpacity } from 'react-native';
// import Snackbarr from 'react-native-snackbar';
import { showSnackBar } from '@prince8verma/react-native-snackbar';
import { secondryColor, textFont } from './Style';

export default {
    displaySnackBar(message, background, color) {
        showSnackBar({
            fontFamily: textFont,
            message: "Your custom message",
            textColor: '#FFF',      // message text color
            position: 'top',  // enum(top/bottom).
            confirmText: 'OK', // button text.
            buttonColor: '#03a9f4', // default button text color
            duration: 4000,   // (in ms), duartion for which snackbar is visible.
            animationTime: 250, // time duration in which snackbar will complete its open/close animation.
            backgroundColor: background ? background : secondryColor, //background color for snackbar
            onConfirm: () => { },    //  perform some task here on snackbar button press.
        });
    },
    // showSnackbar(message, background, color) {
    //     Snackbarr.show({
    //         text: message,
    //         duration: Snackbarr.LENGTH_LONG,
    //         backgroundColor: background ? background : secondryColor,
    //         textColor: color ? color : 'white',
    //         action: {
    //             text: 'Ok',
    //             textColor: 'white',
    //         },
    //     });
    // },

    isEmptyArray(array) {
        if (array == undefined || array == "" || array.length == 0) {
            return true
        } else {
            return false
        }
    },

    isEmptyString(str) {
        return (str == "" || !str)
    },

    renderCircledImage(imgPath, width, height) {
        return <TouchableOpacity
            style={{
                overflow: 'hidden',
                height: height,
                width: width,
                borderRadius: 100,
            }}>
            <Image
                style={{
                    height: height,
                    width: width,
                    borderRadius: 100,
                    backgroundColor: 'rgba(0,0,0,0.1)'
                }}
                source={imgPath}
            />
        </TouchableOpacity>
    },

    getRandomcolor() {
        var x = Math.floor(Math.random() * 256);
        var y = Math.floor(Math.random() * 256);
        var z = Math.floor(Math.random() * 256);
        var bgColor = "rgba(" + x + "," + y + "," + z + ",0.2)";
        return bgColor
    },

    isValidMobileNo(num) {
        var isvalid = false
        if (num != undefined && num != null && num != "" && !isNaN(num)) {
            if (num.startsWith("0") && num.length == 11) {
                isvalid = true
            }
        }
        return isvalid
    },

    isValidEmail(num) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(num);
    },

    hasSpecialChar(str) {
        var iChars = "~`!#$%^&*+=-@[]\\\';,/{}|\":<>?";
        for (var i = 0; i < str.length; i++) {
            if (iChars.indexOf(str.charAt(i)) > -1) {
                return true;
            }
        }
        return false;
    },

    resetAndGo(navigation, routeName) {
        if (navigation && !this.isEmptyString(routeName)) {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        { name: routeName },
                    ],
                })
            );
        }
    },

    openLink(url) {
        if (url) {
            Linking.canOpenURL(url).then(supported => {
                if (!supported) {
                    console.log('Can\'t handle url: ' + url);
                } else {
                    return Linking.openURL(url);
                }
            }).catch(err => console.error('An error occurred', err));
        }
    },
    alert(title, description, confirmText, cancelText, onConfirmPress) {
        Alert.alert(title, description, [
            {
                text: cancelText,
            },
            !this.isEmptyString(confirmText) && (
                {
                    text: confirmText, onPress: () => {
                        onConfirmPress()
                    }
                })
        ])
    },
}