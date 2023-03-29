import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import MyRequestsPage from './MyRequestsPage';
import OthersRequestsPage from './OthersRequestsPage';

export default function RequestsPage(props) {

  const [showMy, setShowMy] = useState(true);
  const [selectedButton, setSelectedButton] = useState(0);

  const handleButtonPress = (buttonNumber, buttonType) => {
    setSelectedButton(buttonNumber);
    if (buttonType === 'MyReq') {
      setShowMy(true);
    } else {
      setShowMy(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setSelectedButton(0)
      setShowMy(true)
      return () => {
        // Clean up the effect when the screen goes out of focus
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity style={[styles.button, selectedButton === 0 && styles.selectedButton]} onPress={() => handleButtonPress(0, 'MyReq')}>
          <Text style={[styles.buttonText, selectedButton === 0 && styles.selectedButtonText]}>בקשות שלי</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, selectedButton === 1 && styles.selectedButton]} onPress={() => handleButtonPress(1, 'OthersReq')}>
          <Text style={[styles.buttonText, selectedButton === 1 && styles.selectedButtonText]} >בקשות של אחרים</Text>
        </TouchableOpacity>
      </View>
      {showMy ? <MyRequestsPage /> : <OthersRequestsPage />}
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
    borderBottomWidth: 1,
    borderBottomColor: '#00317D'
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