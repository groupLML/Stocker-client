import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';

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
                <Checkbox style={styles.CB} value={isChecked} onValueChange={setChecked} />
                <Text style={styles.CB_txt}>שלח לכל המחלקות</Text>
            </View >
            <Text>{isChecked ? 'Checked' : 'Unchecked'}</Text>
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
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 30,
        //fontFamily: 'Imbue',
        color: '#003D9A',
    },
    fields: {
        fontSize: 15,
        marginBottom: 10,
        //fontFamily: 'Imbue',
        color: '#003D9A',
    },
    input: {
        borderWidth: 1,
        borderColor: '#00317D',
        borderRadius: 10,
        padding: 10,
        width: '80%',
        height:40,
        marginBottom: 10,
        backgroundColor: '#f3f3f3',     
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