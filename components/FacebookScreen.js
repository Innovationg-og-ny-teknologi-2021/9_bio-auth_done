import React, {useState} from "react";
import {Alert, Button, StyleSheet, Text, View} from "react-native";
import * as Facebook from "expo-facebook";

const FacebookScreen = () => {

    const FacebookID = '2633284050312146';
    const FacebookAppId = 'App_login';
    const [facebookUser,setFacebookUser] = useState(null)

     const logIn = async () => {
        try {
            await Facebook.initializeAsync({
                appId: FacebookID,
                appName:FacebookAppId
            });
            const { type, token, permissions} = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile','name'],
            });
            console.log(permissions,"permisson")
            if (type === 'success') {
                // Get the user's name using Facebook's Graph API
                const response = await fetch(`https://graph.facebook.com/me/?fields=id,name&access_token=${token}`);
                setFacebookUser(response.json());

            } else {
                // type === 'cancel'
            }
        } catch (e) {
            console.log(`Facebook Login Error: ${e}`);
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.paragraph}>
                { facebookUser ? `Hej ${facebookUser.name}` : "Login into your facebook account"}
            </Text>
            {!facebookUser && <Button title="Login" onPress={logIn} />}

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});


export default FacebookScreen
