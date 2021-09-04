import React from 'react';
import { View } from 'react-native';
import { connect } from "react-redux";

class Home extends React.Component {
    render() {
        const { language, theme } = this.props
        return (
            <View style={{ paddingTop: 20, flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: theme.dimBackground, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}></View>
            </View>
        )
    }
}
mapStateToProps = (state) => {
    return {
        userInfo: state.reducer.userInfo,
        isLoggedIn: state.reducer.isLoggedIn,
        theme: state.reducer.theme,
    }
}
export default connect(mapStateToProps, null)(Home)