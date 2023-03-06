import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Card } from '@rneui/base';
import { Icon } from 'react-native-elements';
import FCMedInput from './FCMedInput';
import FCQuantityInput from './FCQuantityInput';

export default function FCMedInOrder() {

    const AddMed = () => {
        
    };


    return (
        <Card>
            <Text>med card:</Text>
            <FCMedInput/>
            <FCQuantityInput/>
            <TouchableOpacity style={styles.AddBTN} onPress={() => AddMed()}>
                <Icon name='add' color='white' />
            </TouchableOpacity>
        </Card>
    )
}

const styles = StyleSheet.create({
    AddBTN: {
        borderRadius: 100,
        backgroundColor: '#003D9A',
        bottom: 0,
        marginTop: 20,
        alignSelf: 'center'
    },
});