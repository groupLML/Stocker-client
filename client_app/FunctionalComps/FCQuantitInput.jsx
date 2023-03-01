import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react';
import NumericInput from 'react-native-numeric-input'

export default function FCQuantitInput() {

    const [reqQty, setReqQty] = useState('');

    return (
        <View style={styles.row}>
            <Text style={styles.fields}>כמות:</Text>
            <NumericInput 
            type='plus-minus' 
            rounded containerStyle={{ flexDirection: 'row-reverse' }} 
            minValue={1} textColor='#003D9A' 
            iconStyle={{ color: '#003D9A' }} 
            rightButtonBackgroundColor='#E1EAF9' 
            leftButtonBackgroundColor='#E1EAF9' 
            onChange={value => setReqQty(value)} 
            />
        </View>
    )
}

const styles = StyleSheet.create({
row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  fields: {
    fontSize: 17,
    color: "#003D9A",
    width: 100,
    marginRight: 10,
    fontWeight: 'bold',
  },
});