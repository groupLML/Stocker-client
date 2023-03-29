import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import FCNotifications from '../FunctionalComps/FCNotifications'

export default function NotificationPage() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>הודעות מבית מרקחת</Text>
            <ScrollView>
            <FCNotifications />
            </ScrollView>
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
