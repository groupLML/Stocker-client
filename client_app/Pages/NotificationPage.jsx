import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import FCNotifications from '../FunctionalComps/FCNotifications'

export default function NotificationPage() {
    return (
        <View style={styles.container}>
            <Text>NotificationPage:</Text>
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
});
