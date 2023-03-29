import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Card } from '@rneui/base';

import { useNavigation } from '@react-navigation/native';
import FCDateTime from './FCDateTime';
import FCMedsInOrder from './FCMedsInOrder.jsx';

export default function FCPullOrder(props) {

  const navigation = useNavigation();

  const handleCardPress = () => {
    navigation.navigate('צפייה בפרטי הזמנת משיכה', { pullOrderId: props.id, pullOrdersList: props.pullOrdersList });
  };

  return (
    <Card style={styles.cardContainer} borderColor="#00317D">
      <View style={styles.row}>
        <FCDateTime date={props.date} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {props.reqStatus === 'I' && (
            <>
              <Text style={{ color: '#5D9C59' }}>הונפק</Text>
            </>
          )}
          {props.reqStatus === 'W' && (
            <>
              <Text style={{ color: '#DF2E38' }}>בהמתנה</Text>
            </>
          )}
          {props.reqStatus === 'T' && (
            <>
              <Text style={{ color: '#FFC300' }}>בתהליך</Text>
            </>
          ) }
        </View>
      </View>

      <Text style={styles.cardBody}>שם יוצר ההזמנה: {props.nurseName}</Text>
      
      <Text style={styles.cardBody}>שם המחלקה שיצרה: {props.depName}</Text>

      {props.pharmacistName != 'user user' && <Text style={styles.cardBody}><Text style={{ fontWeight: "bold" }}>רוקח אחראי : </Text>{props.pharmacistName}</Text>}

      {props.isDetailedRequest && <FCMedsInOrder MedsOrderList = {props.pullMedList}/>}

      {!props.isDetailedRequest &&
        <TouchableOpacity onPress={() => handleCardPress()}>
          <Text style={styles.readMore}>קרא עוד...</Text>
        </TouchableOpacity>}
    </Card>
  )
}

/* const styles = StyleSheet.create({
  cardContainer: {
    width: "60%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 20,
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
  readMore: {
    color: "#007bff",
    textAlign: "right",
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
}); */

const styles = StyleSheet.create({
  cardContainer: {
    width: "60%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 20,
  },
  cardTitle: {
    fontSize: 20,
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
  readMore: {
    color: '#54A9FF',
    textAlign: "right",
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});