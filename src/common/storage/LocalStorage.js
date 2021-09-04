import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_SESSION_DATA_KEY = "@Session:UserData"
const IS_LOGIN_KEY = "@Session:IsUserLogin"
const NOTIFICATIONS_KEY = "@Session:Notifications"
const APP_THEME_KEY = "@General:AppTheme"

export default class LocalStorage {

    async createUserSession(sessionData, isLogin, onAdded) {
        await AsyncStorage.setItem(USER_SESSION_DATA_KEY, JSON.stringify(sessionData));
        await AsyncStorage.setItem(IS_LOGIN_KEY, isLogin ? "true" : "false");
        onAdded()
    }

    async getUserSessionData(onLoaded) {
        let data = await AsyncStorage.getItem(USER_SESSION_DATA_KEY);
        if (data) {
            let jData = JSON.parse(data)
            onLoaded(jData)
        } else { onLoaded(null) }
    }

    async updateSessionToken(token) {
        let data = await AsyncStorage.getItem(USER_SESSION_DATA_KEY);
        if (data) {
            let jData = JSON.parse(data)
            jData.sessionToken = token
            await AsyncStorage.setItem(USER_SESSION_DATA_KEY, JSON.stringify(jData));
        }
    }

    async destroySession(onCompleted) {
        await AsyncStorage.multiRemove([USER_SESSION_DATA_KEY, IS_LOGIN_KEY])
        onCompleted()
    }

    async updateLoginStatus(isLogin, onUpdated) {
        await AsyncStorage.setItem(IS_LOGIN_KEY, isLogin ? "true" : "false");
        onUpdated()
    }

    async updateDisplayName(firstName, lastName, onUpdated) {
        try {
            let data = await AsyncStorage.getItem(USER_SESSION_DATA_KEY);
            if (data) {
                let jData = JSON.parse(data)
                jData.data.firstname = firstName
                jData.data.secondname = lastName
                await AsyncStorage.setItem(USER_SESSION_DATA_KEY, JSON.stringify(jData));
            }
            onUpdated()
        } catch (error) {
            onUpdated()
        }
    }

    async updateEmail(email, onUpdated) {
        try {
            let data = await AsyncStorage.getItem(USER_SESSION_DATA_KEY);
            if (data) {
                let jData = JSON.parse(data)
                jData.data.email = email
                await AsyncStorage.setItem(USER_SESSION_DATA_KEY, JSON.stringify(jData));
            }
            onUpdated()
        } catch (error) {
            onUpdated()
        }
    }

    async updatePhoneNo(phoneNo, onUpdated) {
        try {
            let data = await AsyncStorage.getItem(USER_SESSION_DATA_KEY);
            if (data) {
                let jData = JSON.parse(data)
                jData.data.phone = phoneNo
                await AsyncStorage.setItem(USER_SESSION_DATA_KEY, JSON.stringify(jData));
            }
            onUpdated()
        } catch (error) {
            onUpdated()
        }
    }

    async isUserLoggedIn(onResult) {
        try {
            const val = await AsyncStorage.getItem(IS_LOGIN_KEY);
            onResult(val && val == "true")
        } catch (ex) {
            onResult(false)
            console.warn(ex.message)
        }
    }

    async setNotifications(isEnabled, onUpdated) {
        try {
            await AsyncStorage.setItem(NOTIFICATIONS_KEY, String(isEnabled));
            onUpdated && onUpdated()
        } catch (error) {
            onUpdated && onUpdated()
        }
    }

    async isNotificationsEnabled(onResult) {
        try {
            const val = await AsyncStorage.getItem(NOTIFICATIONS_KEY);
            onResult(val ? (val == "true") : false)
        } catch (error) {
            console.warn(error.message)
            onResult(false)
        }
    }

    async setAppTheme(theme, onUpdated) {
        try {
            await AsyncStorage.setItem(APP_THEME_KEY, JSON.stringify(theme));
            onUpdated && onUpdated()
        } catch (error) {
            onUpdated && onUpdated()
        }
    }

    async loadActiveTheme(onResult) {
        try {
            const val = await AsyncStorage.getItem(APP_THEME_KEY);
            onResult(val ? JSON.parse(val) : null)
        } catch (error) {
            console.warn(error.message)
            onResult(null)
        }
    }

}