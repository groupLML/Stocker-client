import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { Card } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

import { GlobalContext } from '../GlobalData/GlobalData';

export default function FCMedOrder(props) {
  
  const { meds } = useContext(GlobalContext);
  let selectedMed = meds.find((med) => med.medId === props.medId);//get the request item to read 

  return (
    <View>
      <Card>
      <TouchableOpacity onPress={() => props.getId2Delete(props.medId)}>
        <Ionicons name='close-outline'/>
      </TouchableOpacity>
        <View style={styles.row}>
          <Text>מספר תרופה: </Text>
          <Text>{props.medId}</Text>
          </View>
          <View style={styles.row}>
          <Text>שם תרופה: </Text>
          <Text>{selectedMed.medName}</Text>
          </View>
          <View style={styles.row}>
          <Text>כמות: </Text>
          <Text>{props.Qty}</Text>
        </View>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
});