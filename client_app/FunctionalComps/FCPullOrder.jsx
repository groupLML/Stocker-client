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
    <Card style={styles.cardContainer} borderColor="#E1EAF9">
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
              <Text style={{ color: '#FFC300' }}>מועבר</Text>
            </>
          )}
        </View>
      </View>

      <Text style={styles.cardBody}>שם יוצר ההזמנה: {props.nurseName}</Text>
      
      {props.pharmacistName != 'user user' && <Text style={styles.cardBody}><Text>רוקח אחראי : </Text>{props.pharmacistName}</Text>}

      {props.isDetailedRequest && <FCMedsInOrder MedsOrderList = {props.pullMedList}/>}

      {!props.isDetailedRequest &&
        <TouchableOpacity onPress={() => handleCardPress()}>
          <Text style={styles.readMore}>קרא עוד...</Text>
        </TouchableOpacity>}
    </Card>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    width: "60%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 20,
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