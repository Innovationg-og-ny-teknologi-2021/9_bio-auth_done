import React, {useEffect, useState} from "react";
import {Alert, Button, Platform, StyleSheet, Text, View} from "react-native";
import * as LocalAuthentication from 'expo-local-authentication';

const BioScreen = () => {

    // Vi har et par flags i state som bruges
    const [bio,setBio] = useState({
        hasBiometricHardware: false,
        hasBiometricData: false,
        isRequestingBiometricLogin: false,
        isLoggedInBiometic:false
    })

    // Vi checker om det er muligt at bruge biometrics
    useEffect( () => {
        if(!bio.hasBiometricHardware || !bio.hasBiometricData){
            checkBiometricAvailability()
        }
    },[]);

    const checkBiometricAvailability = async () => {
        const hasBiometricHardware = await LocalAuthentication.hasHardwareAsync();
        const hasBiometricData = await LocalAuthentication.isEnrolledAsync();
        setBio({...bio,hasBiometricHardware,hasBiometricData})
    };

    console.log(bio)

    // Vi foretager en biometrisk scanning
    const requestBiometricLogin = async () => {
        try {
            // For at kunne vise en besked på android, sætter vi dette flag i staten
            setBio({...bio,isRequestingBiometricLogin:true})
            const response = await LocalAuthentication.authenticateAsync({
                promptMessage: 'log in with faceID/touchID?',
                fallbackLabel: 'use your passcode',
            });
            console.log(response,"respose")

            if (response.success) {
                setBio({...bio,isLoggedInBiometic:true})
            } else {
                Alert.alert('Failure');
            }

            // Vi viser en evt fejl som kommer tilbage
            if (response.error) {
                Alert.alert(response.error);
            }
        } catch (error) {
            // Vi viser en fejl hvis kaldets promise rejecter
            Alert.alert(error.message);
        }
    };

    // For at kunne annullere på Android har vi denne
    const cancelBiometricLogin = () => {
        LocalAuthentication.cancelAuthenticate();
    };

    const logout =() =>{
        setBio({...bio,isLoggedInBiometic:false})
    }


    if(!bio.isLoggedInBiometic){
        return (
            <View style={styles.container}>
                <Text style={styles.paragraph}>
                    Login ind med biometrics!
                </Text>
                {/*   Vi viser knappen hvis brugerens device understøtter biometrics*/}
                {bio.hasBiometricData && bio.hasBiometricHardware && (
                    <Button
                        title="Biometric login"
                        onPress={requestBiometricLogin}
                    />
                )}
                {/*   På Android viser vi denne besked når brugeren skal scanne sin finger*/}
                {bio.isRequestingBiometricLogin && Platform.OS === 'android' && (
                    <View>
                        <Text>Put your finger on fingerprint scanner now.</Text>
                        <Button title="Cancel" onPress={cancelBiometricLogin} />
                    </View>
                )}
            </View>
        );
    }else {
        return (
            <View style={styles.container}>
                <Text style={styles.paragraph}>
                    Du er logget ind med biometrics!!
                    <Button onPress={logout} title="Log ud"/>
                </Text>
            </View>
        )
    }

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

export default BioScreen
