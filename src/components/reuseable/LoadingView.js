import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
const LoadingView = (props) => {
    const { theme, color, size } = props
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <ActivityIndicator size={size == undefined ? 'large' : size} color={color == undefined ? theme.primaryColor : color} />
        </View>
    )
}
const mapStateToProps = (state) => {
    return {
        theme: state.reducer.theme
    }
}
export default connect(mapStateToProps, null)(LoadingView)