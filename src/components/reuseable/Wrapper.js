import React from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import { connect } from 'react-redux';
const Wrapper = (props) => {
    return (
        <>
            {props.notSafeArea ?
                <View style={[{
                    flex: 1,
                    backgroundColor: props.theme.background,
                }, props.style]}>
                    <StatusBar backgroundColor={"transparent"} translucent={true} />
                    {props.children}
                </View>
                :
                <SafeAreaView style={[{
                    flex: 1,
                    backgroundColor: props.theme.background,
                    paddingTop: 20
                }, props.style]}>
                    <StatusBar backgroundColor={"transparent"} translucent={true} />
                    {props.children}
                </SafeAreaView>
            }
        </>
    )
}
mapStateToProps = (state) => {
    return {
        userInfo: state.reducer.userInfo,
        isLoggedIn: state.reducer.isLoggedIn,
        theme: state.reducer.theme
    }
}
export default connect(mapStateToProps, null)(Wrapper)
