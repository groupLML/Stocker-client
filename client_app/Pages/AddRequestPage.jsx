import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Checkbox from '@react-native-community/checkbox';

export default function AddRequestPage(props) {

    const handleCB = () => {
        const [isSelected, setSelection] = useState(false);
    }

    const [depName, setDepName] = useState('');
    const [reqQty, setReqQty] = useState('');

    /* const [isSelected, setSelection] = useState(false);

    const handleSelection = () => {
        setSelection(!isSelected);
    };
 */
    const handleAddRequest = () => {
        console.log("lin");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>בקשה ממחלקה</Text>
            <Text style={styles.fields}>שם תרופה:</Text>
            <TextInput
                style={styles.input}
                value={depName}
                onChangeText={(text) => setDepName(text)}
            />
            <Text style={styles.fields}>כמות:</Text>
            <TextInput
                style={styles.input}
                value={reqQty}
                onChangeText={(text) => setReqQty(text)}
            />
            <View>
                <CheckBox value={isSelected} onValueChange={setSelection}/>
                <Text>{isSelected ? 'Checked' : 'Unchecked'}</Text>
            </View>
            {/* <CheckBox
                value={isSelected}
                onValueChange={handleSelection}
                style={{ marginRight: 10 }}
            /> */}
            <Text style={styles.fields}>שלח לכל המחלקות</Text>

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
        fontWeight: 'bold',
        marginBottom: 10,
        //fontFamily: 'Imbue',
        color: '#003D9A',
    },
    input: {
        borderWidth: 2,
        borderColor: '#00317D',
        borderRadius: 5,
        padding: 10,
        width: '80%',
        marginBottom: 10,
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
});