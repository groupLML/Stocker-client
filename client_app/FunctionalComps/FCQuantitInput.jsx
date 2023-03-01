import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import NumericInput from 'react-native-numeric-input';

export default function FCQuantitInput(props) {

  const [reqQty, setReqQty] = useState(props.Qty);

  return (
    <View style={styles.row}>
      <Text style={styles.fields}>כמות:</Text>
      <NumericInput
        type='plus-minus'
        rounded
        minValue={1}
        textColor='#003D9A'
        iconStyle={{ color: '#003D9A' }}
        rightButtonBackgroundColor='#E1EAF9'
        leftButtonBackgroundColor='#E1EAF9'
        onChange={value => setReqQty({ value })}
        value={reqQty.value}
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

/* const [reqQtyTemp, setReqQtyTemp] = useState(props.reqQty); */

{/* <View style={styles.row}>
  <Text style={[styles.cardBody, { fontWeight: "bold" }]}>כמות: </Text>
  <NumericInput
    type='plus-minus'
    onChange={value => setReqQtyTemp({ value })}
    rounded
    minValue={1}
    textColor='#003D9A'
    iconStyle={{ color: '#003D9A' }}
    containerStyle={{ flexDirection: 'row-reverse' }}
    rightButtonBackgroundColor='#E1EAF9'
    leftButtonBackgroundColor='#E1EAF9'
    value={reqQtyTemp.value}
  />
</View> */}