import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';

import MyRequestsPage from './MyRequestsPage';
import OthersRequestsPage from './OthersRequestsPage';

export default function RequestsPage() {

  const [showMy, setShowMy] = useState(true);
  const [selectedButton, setSelectedButton] = useState(0);

  useEffect(() => {
    setSelectedButton(0); // set the default selected button to 0 when the component mounts
  }, []);
  
  const handleButtonPress = (buttonNumber,buttonType) => {
    setSelectedButton(buttonNumber);
    if (buttonType === 'MyReq') {
      setShowMy(true);
    } else {
      setShowMy(false);
    }
  };

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