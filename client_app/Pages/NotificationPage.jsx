import { View, Text } from 'react-native'
import React from 'react'
import FCAnimatedLogo from '../FunctionalComps/FCAnimatedLogo'
import FCNotifications from '../FunctionalComps/FCNotifications'

export default function NotificationPage() {
    return (
        <View>
            <Text>NotificationPage:</Text>
            <FCNotifications />
        </View>
    )
}