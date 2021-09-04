import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from "react-native-modal";
import FIcons from 'react-native-vector-icons/Feather';
import { connect } from "react-redux";
import PrefsManager from '../../common/storage/LocalStorage';
import { SHOW_OPTIONS_MENU } from '../../redux/actions/types';
import { store } from '../../redux/create';
import { defaultColor, defFont, lightTextColor } from '../../utils/Style';
import { FontSize, Height, Width } from '../../utils/Dimensions';
import MyUtils from '../../utils/Utils';
const prefs = new PrefsManager()
const OptionsModal = (props) => {
    // { sample modal option array
    //     title: "Group Rules",
    //     leftIcon: "info",
    //     rightIcon: "",
    //     textColor: "red",
    //     leftIconColor: "blue",
    //     rightIconColor: "green",
    //     onPress: () => alert(""),
    // }
    const [optionsArr, setModalOptions] = useState(props.optionsArr);

    useEffect(() => {
        setModalOptions(props.optionsArr)
    }, [props.optionsArr])

    const handleOnPress = (isOptionsModalOpen) => {
        store.dispatch({ type: SHOW_OPTIONS_MENU, data: !isOptionsModalOpen })
    }
    return (
        <Modal
            isVisible={props.isOptionsModalOpen}
            onBackButtonPress={() => handleOnPress(props.isOptionsModalOpen)}
            onBackdropPress={() => handleOnPress(props.isOptionsModalOpen)} // Android back press
            onSwipeComplete={() => handleOnPress(props.isOptionsModalOpen)} // Swipe to discard
            animationIn="slideInUp" // Has others, we want slide in from the left
            animationOut="slideOutDown" // When discarding the drawer
            swipeDirection="down" // Discard the drawer with swipe to left
            useNativeDriver // Faster animation
            hideModalContentWhileAnimating
            propagateSwipe
            style={styles.sideMenuStyle}
        >
            <SafeAreaView style={styles.safeAreaView}>
                {!MyUtils.isEmptyArray(optionsArr) &&
                    <FlatList
                        data={optionsArr}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={{ flex: 1 }}>
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        style={[styles.optionStyle, { marginTop: index == 0 ? Height(1.5) : 0 }]}
                                        onPress={() => {
                                            handleOnPress(props.isOptionsModalOpen);
                                            item.onPress()
                                        }}
                                    >
                                        {!MyUtils.isEmptyString(item.leftIcon) &&
                                            <FIcons style={{ fontWeight: "bold" }} name={item.leftIcon} size={FontSize(16)} color={!MyUtils.isEmptyString(item.leftIconColor) ? item.leftIconColor : defaultColor} />
                                        }
                                        <Text style={[styles.optionTextStyle, {
                                            color: !MyUtils.isEmptyString(item.textColor) ? item.textColor : defaultColor
                                        }]}>{item.title}</Text>
                                        {!MyUtils.isEmptyString(item.rightIcon) &&
                                            <View style={{ alignItems: "flex-end", marginRight: Width(2) }}>
                                                <FIcons style={{ fontWeight: "bold" }} name={item.rightIcon} size={FontSize(16)} color={!MyUtils.isEmptyString(item.rightIconColor) ? item.rightIconColor : defaultColor} />
                                            </View>
                                        }
                                    </TouchableOpacity>
                                    {MyUtils.renderEmptyLine(lightTextColor)}
                                </View>
                            )
                        }}
                        keyExtractor={(item, index) => index.toString()}
                    />
                }
            </SafeAreaView>
        </Modal>
    )
}

const mapStateToProps = (state) => {
    return {
        isOptionsModalOpen: state.init.isOptionsModalOpen,
        optionsArr: state.init.modalOptions,
    }
}
export default connect(mapStateToProps, null)(OptionsModal)
const styles = StyleSheet.create({
    safeAreaView: {
        // padding: Width(2),
        backgroundColor: '#FFF',
    },
    container: {
        margin: 12,
        flex: 1
    },
    sideMenuStyle: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    optionStyle: {
        flexDirection: "row",
        alignItems: "center",
        padding: Width(.7),
        paddingHorizontal: Width(4)
    },
    optionTextStyle: {
        ...defFont,
        fontSize: FontSize(13),
        marginLeft: Width(3),
        flex: 1,
    }
})