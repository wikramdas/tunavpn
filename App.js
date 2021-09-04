import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from "react-redux";
import store from "./src/redux/Reducers";

import SplashScreen from "./src/components/SplashScreen";
// AUTH SCREENS 
import Login from './src/components/auth/Login';
import SignUp from './src/components/auth/SignUp';

const Stack = createStackNavigator();
export default App = () => {
    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false
                        }}
                    >
                        <Stack.Screen name={"Splash"} component={SplashScreen} />
                        <Stack.Screen name={"Login"} component={Login} />
                        <Stack.Screen name={"SignUp"} component={SignUp} />
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaProvider>
        </Provider>
    )
}