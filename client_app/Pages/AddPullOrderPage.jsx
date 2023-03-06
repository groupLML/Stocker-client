import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import FCMedInOrder from '../FunctionalComps/FCMedInOrder';

export default function AddPullOrderPage() {

    return (
        <View style={{ flex: 1 }}><Text>Add Pull Order:</Text>
            <ScrollView>
                <FCMedInOrder/>
            </ScrollView>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>שליחה</Text>
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
    button: {
        backgroundColor: '#00317D',
        padding: 10,
        borderRadius: 5,
        alignItems:'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});
