
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@rneui/base';

import FCQuantityInput from './FCQuantityInput';

export default function FCDetailedPullOrder(props) {

  const [Qty, setQty] = useState(1);

  const GetQtyFromInput = (Qty) => {
    setQty(Qty);
  }

  return (
    <View style={styles.container}>
      <Card borderColor='#E1EAF9'>
        {props.isWaitingOrder === true && (
          <TouchableOpacity onPress={() => props.getId2Delete(props.medId)}>
            <Ionicons name='close-outline' color='#003D9A' size={22} />
          </TouchableOpacity>
        )}
        <Text style={styles.cardTitle}><Text>{props.medName}</Text></Text>
        {props.isWaitingOrder === true && (
          <FCQuantityInput reqQty={props.poQty} sendQty={GetQtyFromInput} />
        )}
        {props.isWaitingOrder === false && (
          <View>
            <Text style={styles.cardBody}>כמות שהוזמנה: <Text>{props.poQty}</Text></Text>
            <Text style={styles.cardBody}>כמות שסופקה: <Text>{props.supQty}</Text></Text>
          </View>
        )}

      </Card>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    //marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 10,
    color: "#003D9A",
  },
  cardBody: {
    //marginVertical: 10,
    fontSize: 15,
    color: "#003D9A",
  },
});