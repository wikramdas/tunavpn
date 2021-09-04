import Myutils from '../../utils/Utils'
import LocalStorage from '../storage/LocalStorage'

const myutils = new Myutils()
const prefs = new LocalStorage()
export default class ApiHandler {
    sendSimpleFetchRequest(url, _body, requestType, navigation, contentType, onResponse, onError) {
        prefs.getUserSessionData((sessionData) => {
            if (contentType == "json") {
                contentType = 'application/json'
            } else if (contentType == "multipart") {
                contentType = 'multipart/form-data'
            } else {
                contentType = 'application/x-www-form-urlencoded'
            }

            _body = _body
            console.log("=====================WEB REQUEST========================", contentType)
            console.log("URL==> ", url)
            console.log("BODYPARAMS==> ", JSON.stringify(_body))

            fetch(url, {
                method: requestType,
                headers: new Headers({
                    'Content-Type': contentType,
                    'authorization': "Bearer " + sessionData.accessToken,
                    'devicetype': "mobile",
                }),
                body: _body
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log("RESPONSE==>", JSON.stringify(responseJson, null, 3))
                    if (responseJson.header == "success") {
                        onResponse(responseJson)
                    } else if (responseJson.header == "failure" && responseJson.body == "Token is Expired") {
                        onError("Token has been expired")
                        prefs.destroyUserSession()
                        MyUtils.resetAndGo(navigation, "LogIn")
                    } else {
                        onError(responseJson.body)
                    }
                }).catch((error) => {
                    console.log("======error=====", error)
                    if (error == 'TypeError: Network request failed') {
                        onError("Please check your internet connection")
                    } else {
                        onError(error.message)
                    }
                    //JUST FOR DEBUGGING//
                    if (__DEV__) {
                        fetch(url, {
                            method: 'POST',
                            headers: new Headers({
                                'Content-Type': 'application/x-www-form-urlencoded',
                                'authorization': "Bearer " + sessionData.accessToken,
                                'devicetype': "mobile",
                            }),
                            body: _body
                        })
                            .then((response) => response.text())
                            .then((responseText) => {
                                console.log("RESPOSNE ERROR==> ", responseText)
                            }).catch((error2) => {
                                console.log("RESPOSNE==> ", error2.message)
                            });
                    }
                });
        })
    }
}