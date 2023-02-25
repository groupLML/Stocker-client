import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Card } from 'react-native';
import Checkbox from 'expo-checkbox';
import FCDepTypeList from '../FunctionalComps/FCDepTypeList';

export default function AddRequestPage(props) {

    const [isChecked, setChecked] = useState(true)
    const [depName, setDepName] = useState('');
    const [reqQty, setReqQty] = useState('');

    const handleAddRequest = () => {
        console.log("lin");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>בקשה ממחלקה</Text>
            <View></View>
            <View style={styles.row}>
                <Text style={styles.fields}>שם תרופה:</Text>
                <TextInput
                    style={styles.input}
                    value={depName}
                    onChangeText={(text) => setDepName(text)}
                />
            </View>
            <View style={styles.row}>
                <Text style={styles.fields}>כמות:</Text>
                <TextInput
                    style={styles.input}
                    value={reqQty}
                    onChangeText={(text) => setReqQty(text)}
                />
            </View>
            <View style={styles.row}>
                <Checkbox style={styles.CB} color={isChecked ? '#003D9A' : undefined} value={isChecked} onValueChange={setChecked} />
                <Text style={styles.CB_txt}>שלח לכל המחלקות</Text>
                <FCDepTypeList></FCDepTypeList>
            </View >

            <TouchableOpacity style={styles.button} onPress={handleAddRequest}>
                <Text style={styles.buttonText}>אישור</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 30,
        //fontFamily: 'Imbue',
        color: '#003D9A',
        position: 'absolute',
        top: 0,
    },
    fields: {
        fontSize: 15,
        marginBottom: 10,
        //fontFamily: 'Imbue',
        color: '#003D9A',
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
        marginTop: 15,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,

    },
    CB_txt: {
        color: '#003D9A',
        paddingRight: 10,
    },
    CB: {
        borderColor: '#003D9A',
    },
});