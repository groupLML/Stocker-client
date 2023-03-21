import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import NumericInput from 'react-native-numeric-input';

export default function FCQuantityInput(props) {

  const [reqQty, setReqQty] = useState(1);

  useEffect(() => {
    if (props.clearForm) {
      console.log("clear form");
      setReqQty(props.reqQty)
    }
  }, [props.clearForm]);

  const handleChange = (value) => {
    setReqQty(value);
    props.sendQty(value);  
  }

  return (
    <View style={styles.row}>
      <Text style={styles.fields}>כמות:</Text>
      <View style={styles.inputContainer}></View>
      <NumericInput
        type='plus-minus'
        rounded
        minValue={1}
        textColor='#003D9A'
        totalWidth={100}
        iconStyle={{ color: '#003D9A' }}
        rightButtonBackgroundColor='#E1EAF9'
        leftButtonBackgroundColor='#E1EAF9'
        onChange={handleChange}
        value={reqQty}
        style={{ zIndex: 3 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    marginVertical: 10,
    fontSize: 15,
    color: "#003D9A",
    flexDirection: 'row',
    alignItems: 'center',
  },
  fields: {
    fontSize: 17,
    color: "#003D9A",
    marginRight: 10,
    fontWeight: 'bold',
  },
});