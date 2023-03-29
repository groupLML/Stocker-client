import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { Card } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import FCDateTime from './FCDateTime';

export default function FCMyRequest(props) {
  
  const navigation = useNavigation();

  const handleCardPress = () => {
    navigation.navigate('צפייה בפרטי בקשה', { requestId: props.id, requestsList: props.requestsList });
  };

  return (
    <Card style={styles.cardContainer} borderColor="#E1EAF9">
      <View style={styles.row}>
        <FCDateTime date={props.date} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {props.reqStatus === 'A' && (
            <>
              <Text style={{ color: '#5D9C59' }}>מאושר</Text>
            </>
          )}
          {props.reqStatus === 'W' && (
            <>
              <Text style={{ color: '#DF2E38'}}>בהמתנה</Text>
            </>
          )}
          {props.reqStatus === 'D' && <Text>נדחה</Text>}
        </View>
      </View>

      <Text style={styles.cardTitle}>{props.medName}</Text>
      <Text style={styles.cardBody}><Text>כמות: </Text>{props.reqQty}</Text>
      <Text style={styles.cardBody}><Text>שם יוצר ההזמנה: </Text>{props.cNurseName}</Text>

      {props.aDepName !== '' && <Text style={styles.cardBody}><Text>שם המחלקה שאישרה: </Text>{props.aDepName}</Text>}

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
