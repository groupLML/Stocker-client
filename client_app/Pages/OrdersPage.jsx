import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';

import PushOrdersPage from './PushOrdersPage';
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
            {showPull ? <PullOrdersPage /> : <PushOrdersPage />}
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
    button: {
      flex: 1,
      backgroundColor: 'white',
      padding: 10,
      margin: 0,
      marginTop: 20,
      backgroundColor: '#E1EAF9',
      borderBottomWidth: 2, // Add a transparent border to the both buttons
      borderBottomColor: 'transparent', // Set the border color to transparent
    },
    selectedButton: {
      borderBottomWidth:1,
      borderBottomColor:'#00317D'
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