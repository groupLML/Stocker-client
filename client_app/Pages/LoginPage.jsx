import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Linking } from 'react-native';

import FCAnimatedLogo from '../FunctionalComps/FCAnimatedLogo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const phoneNumber = '04-3252532';

export default function LoginPage(props) {

    const apiUrlLogin = 'https://proj.ruppin.ac.il/cgroup36/prod/api/User/Login';

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //-----------------------------Phone Press Linking----------------------
    const handlePhonePress = () => {
        Linking.openURL(`tel:${phoneNumber}`);
    };

    //-------------------------------Login User-----------------------------
    const handleLogin = (e) => {

        e.preventDefault();//prevent submitting the form

        const LoginUser = { //יצירת אובייקט לפי השדות במחלקה
            Username: username,
            Password: password,
        };

        if (username && password) { // both fields are filled
            fetch(apiUrlLogin, {
                method: 'POST',
                body: JSON.stringify(LoginUser), //bodyשליחת אובייקט ב 
                headers: new Headers({
                    'Content-type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json; charset=UTF-8',
                })
            })
                .then(response => {
                    return response.json();
                })
                .then(
                    (result) => {//body
                        console.log(result);
                        if (result.username != null) {
                            if (result.jobType == 'N') {
                                try {//Inserting user information into AsyncStorage
                                    const userData = JSON.stringify(result)
                                    AsyncStorage.setItem('User', userData, () => { props.navigation.navigate('צפייה בבקשות המחלקה'); });
                                } catch (e) {
                                    // saving error
                                }
                            }
                            else { alert("שגיאה, משתמש הוא אינו אחות") };
                        }
                        else { alert("שגיאה, משתמש לא קיים"); props.navigation.navigate('יצירת בקשה'); };
                    },
                    (error) => {
                        console.log("error,", error);
                    });
        }
        else {
            alert("אנא מלא את כל השדות")// one or both fields are empty
        }
    }

/* 
    const getData = () => {
        try {//Retrieving AsyncStorage data
            AsyncStorage.getItem('User', (err, result) => {
                console.log(JSON.parse(result));
                //return result != null ? JSON.parse(result) : null;
            })
        } catch (e) {
            // error reading value
        }
    } */



    return (
        <View style={styles.container}>
            <FCAnimatedLogo></FCAnimatedLogo>
            <Text style={styles.title}>Stocker</Text>
            <TextInput
                style={styles.input}
                placeholder="שם משתמש"
                value={username}
                onChangeText={(text) => setUsername(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="סיסמה"
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>התחברות</Text>
            </TouchableOpacity>
            <Text style={styles.info}>לתקלות וליצירת משתמש חדש יש לפנות למחלקת מערכות מידע</Text>
            <TouchableOpacity onPress={handlePhonePress}>
                <Text style={styles.phoneNumber}>{phoneNumber}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 30,
        //fontFamily: 'Imbue',
        color: '#003D9A',
    },
    info: {
        fontSize: 12,
        marginTop: 30,
        color: '#003D9A',
    },
    phoneNumber: {
        fontSize: 12,
        color: '#001AFF',
        textDecorationLine: 'underline',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        width: '80%',
        marginBottom: 10,
        textAlign: 'right',
    },
    button: {
        backgroundColor: '#00317D',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});
