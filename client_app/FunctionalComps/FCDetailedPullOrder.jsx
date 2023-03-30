
import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Card } from '@rneui/base';

export default function FCDetailedPullOrder(props) {

  return (
    <View style={styles.container}>
      <Card borderColor='#E1EAF9'>
        <Text style={styles.cardTitle}><Text>{props.medName}</Text></Text>
        <View style={styles.row}>
          <Text style={styles.cardBody}>כמות נדרשת: <Text>{props.poQty}</Text></Text>
          <Text style={styles.cardBody}>כמות שסופקה: <Text>{props.supQty}</Text></Text>
        </View>
      </Card>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#003D9A",
  },
  cardBody: {
    marginVertical: 10,
    fontSize: 15,
    color: "#003D9A",
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});