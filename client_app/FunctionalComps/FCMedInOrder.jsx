import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { Card } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { GlobalContext } from '../GlobalData/GlobalData';

export default function FCMedOrder(props) {

  const { meds } = useContext(GlobalContext);
  let selectedMed = meds.find((med) => med.medId === props.medId);//get the order item to read 

  return (
    <View>
       <Card borderColor='#E1EAF9' >
        <TouchableOpacity onPress={() => props.getId2Delete(props.medId)}>
          <Ionicons name='close-outline' color='#003D9A' size={22}/>
        </TouchableOpacity>
        <View style={styles.row}>
          <Text style={styles.cardBody}>שם תרופה: </Text>
          <Text style={styles.cardBody}>{selectedMed.medName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cardBody}>כמות: </Text>
          <Text style={styles.cardBody}>{props.poQty}</Text>
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
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  cardBody: {
    marginVertical: 10,
    fontSize: 15,
    color: "#003D9A",
  },
  
});