import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { ButtonStyle, EmptyState } from '../../utils/Style';
const EmptyView = (props) => {
    const { theme, color, size, image, text, onAction } = props
    return (
        <View style={EmptyState.cover}>
            <Image
                style={EmptyState.image}
                resizeMode="stretch"
                source={image ? image : require('../../assets/images/empty/hang.png')}
            />
            <Text style={EmptyState.text}>{text}</Text>
            {onAction &&
                <TouchableOpacity activeOpacity={0.9} style={[ButtonStyle.buttonContainer, { width: 200 }]} onPress={() => onAction()}>
                    <Text style={ButtonStyle.buttonText}>Retry</Text>
                </TouchableOpacity>
            }
        </View>
    )
}
const mapStateToProps = (state) => {
    return {
        theme: state.reducer.theme
    }
}
export default connect(mapStateToProps, null)(EmptyView)