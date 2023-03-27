import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';

//import PushOrdersPage from './PushOrdersPage';
import PullOrdersPage from './PullOrdersPage';

export default function OrdersPage() {

    const [showPull, setShowPull] = useState(true);
    const [selectedButton, setSelectedButton] = useState(0);

    const handleButtonPress = (buttonNumber, buttonType) => {
        setSelectedButton(buttonNumber);
        if (buttonType === 'Pull') {
            setShowPull(true);
        } else {
            setShowPull(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity style={[styles.button, selectedButton === 0 && styles.selectedButton]} onPress={() => handleButtonPress(0, 'Pull')}>
                    <Text style={[styles.buttonText, selectedButton === 0 && styles.selectedButtonText]}>משיכה</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, selectedButton === 1 && styles.selectedButton]} onPress={() => handleButtonPress(1, 'Push')}>
                    <Text style={[styles.buttonText, selectedButton === 1 && styles.selectedButtonText]} >דחיפה</Text>
                </TouchableOpacity>
            </View>
            {showPull ? <PullOrdersPage /> : <PullOrdersPage />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    /*   button: {
        flex: 1,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#E1EAF9',
        padding: 10,
        margin: 0,
        marginTop: 20,
      }, */
    button: {
        flex: 1,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#E1EAF9',
        padding: 10,
        margin: 0,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    selectedButton: {
        backgroundColor: '#E1EAF9',
    },
    buttonText: {
        color: '#00317D',
        fontSize: 16,
        textAlign: 'center',
    },
    selectedButtonText: {
        fontWeight: "bold",
    },
});