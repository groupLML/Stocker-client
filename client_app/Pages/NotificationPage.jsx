import { View, Text, StyleSheet, ScrollView, Platform} from 'react-native';
import React, { useContext, useState, useEffect } from 'react';

import { GlobalContext } from '../GlobalData/GlobalData';
import FCNotifications from '../FunctionalComps/FCNotifications';

export default function NotificationPage() {

    const { apiUrlNotification } = useContext(GlobalContext);
    const [notifications, setNotifications] = useState(null);
    //----------------------GET Notification---------------------
    useEffect(() => {
        fetch(apiUrlNotification, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json; charset=UTF-8',
            })
        })
            .then(res => {
                return res.json();
            })
            .then(
                (result) => {
                    setNotifications(result); //set the notifications of choosen dep to display
                    console.log(result);
                },
                (error) => {
                    console.log("err get=", error);
                });
    }, []) // did mount

    return (
        <View>
            {notifications !== null && (
                <View style={styles.container}>
                    <Text style={styles.title}>הודעות מבית מרקחת</Text>
                    <ScrollView>
                        <FCNotifications NotificationsList={notifications} />
                    </ScrollView>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 25,
        textAlign: 'center',
        marginBottom: 15,
        color: '#003D9A',
        marginTop: 20,
    },
});
