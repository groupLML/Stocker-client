import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { Icon } from 'react-native-elements';
import FCMedInOrder from '../FunctionalComps/FCMedInOrder';

export default function AddPullOrderPage() {
    
    const AddMed = () => {
        
    };
    
    return (
        <View style={{ flex: 1 }}><Text>Add Pull Order:</Text>
            <TouchableOpacity style={styles.AddBTN} onPress={() => AddMed()}>
                <Icon name='add' color='white' />
            </TouchableOpacity>
            <ScrollView>
                <FCMedInOrder />
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
        /* position: 'absolute', */
        bottom: 0,
        marginBottom: 20,
        alignSelf: 'center'
    },
    button: {
        backgroundColor: '#00317D',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});
