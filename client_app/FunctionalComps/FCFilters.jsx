import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'

export default function FCFilters(props) {
  const [selectedButtons, setSelectedButtons] = useState([]);

  const handleButtonPress = (buttonType) => {
    if (buttonType === 'W') {
      if (selectedButtons.includes('W') !== true) {
        setSelectedButtons([...selectedButtons, 'W']);
      }
      else {
        setSelectedButtons(selectedButtons.filter(button => button !== 'W'));
      }
    }
    if (buttonType === 'A') {
      if (selectedButtons.includes('A') !== true) {
        setSelectedButtons([...selectedButtons, 'A']);
      }
      else {
        setSelectedButtons(selectedButtons.filter(button => button !== 'A'));
      }
    }
  };

  useEffect(() => {
    console.log('selectedButtons: ', selectedButtons);
    props.HandleSelectedFilters(selectedButtons);
  }, [selectedButtons]) // did update

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity style={[styles.button, selectedButtons.includes('W') && styles.selectedButton]} onPress={() => handleButtonPress('W')}>
          <Text style={[styles.buttonText, selectedButtons.includes('W') && styles.selectedButtonText]}>בהמתנה</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, selectedButtons.includes('A') && styles.selectedButton]} onPress={() => handleButtonPress('A')}>
          <Text style={[styles.buttonText, selectedButtons.includes('A') && styles.selectedButtonText]} >מאושר</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    borderColor: '#E1EAF9',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 14,
    color: '#868F97',
    textAlign: 'center',
  },
  selectedButton: {
    borderColor: '#527FA1',
  },
  selectedButtonText: {
    color: '#527FA1',
    fontWeight:'bold'
  },
});