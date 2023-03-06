import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Card } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements';
import FCMedInOrder from '../FunctionalComps/FCMedInOrder';

export default function AddPullOrderPage() {
    return (
        <View style={{ flex: 1 }}><Text>AddPullOrderPage</Text>
            <ScrollView>
                <FCMedInOrder />
            </ScrollView>
            <TouchableOpacity style={styles.AddBTN}  onPress={() => AddMed()}>
                <Icon name='add' color='white' />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    AddBTN: {
        borderRadius: 100,
        backgroundColor: '#003D9A',
        position: 'absolute',
        bottom: 0,
        marginBottom: 20,
        alignSelf: 'center'
    },
});