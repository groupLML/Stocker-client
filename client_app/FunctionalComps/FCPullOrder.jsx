import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Card } from '@rneui/base';
import { Icon } from '@rneui/themed';

import { useNavigation } from '@react-navigation/native';
import FCDateTime from './FCDateTime';

export default function FCPullOrder() {

  const navigation = useNavigation();

  const handleCardPress = () => {
    navigation.navigate('צפייה בפרטי בקשה', { requestId: props.id, requestsList: props.requestsList });
  };

  return (
    <Card style={styles.cardContainer} borderColor="#00317D">
      <View style={styles.row}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {props.reqStatus === 'I' && (
            <>
              <Icon type="ionicon" name="checkmark" color="#00914B" size={20} />
              <Text style={{ color: '#00914B' }}>הונפק</Text>
            </>
          )}
          {props.reqStatus === 'T' && (
            <>
              <Icon type="ionicon" name="hourglass" color="#FFC300" size={20} />
              <Text style={{ color: '#FFC300' }}>בתהליך</Text>
            </>
          ) }
          {props.reqStatus === 'W' && (
            <>
              <Icon type="ionicon" name="hourglass" color="red" size={20} />
              <Text style={{ color: 'red' }}>בהמתנה</Text>
            </>
          )}
          
        </View>
        <FCDateTime time={props.time} date={props.date} />
      </View>

      <Text style={styles.cardTitle}>{props.genName}</Text>
      <Text style={styles.cardBody}><Text style={{ fontWeight: "bold" }} >כמות: </Text>{props.reqQty}</Text>
      <Text style={styles.cardBody}><Text style={{ fontWeight: "bold" }} >שם יוצר ההזמנה: </Text>{props.nurseName}</Text>

      {props.depName && <Text style={styles.cardBody}><Text style={{ fontWeight: "bold" }} >שם המחלקה שאישרה: </Text>{props.depName}</Text>}

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
});