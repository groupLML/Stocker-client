import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { Card } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import { GlobalContext } from '../GlobalData/GlobalData';

import FCDateTime from './FCDateTime';
import FCMedsInOrder from './FCMedsInOrder.jsx';

export default function FCPullOrder(props) {//gets the props of the pull order

  const navigation = useNavigation();

/*   const [medsInOrderList, setMedsInOrderList] = useState([]);
  const { apiUrlPullOrder, depId } = useContext(GlobalContext); */
/* 
  //----------------------GET Meds in pull Order---------------------
  useEffect(() => {
    fetch(apiUrlPullOrder + 'GetOrderDetails/depId/' + `${depId}` + '/orderId/' + `${props.id}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset=UTF-8',
      })
    })
      .then(result => {
        return result.json();
      })
      .then(
        (result) => {
          setMedsInOrderList(result);
          console.log("MedsInOrderList=", result);
        },
        (error) => {
          console.log("err get=", error);
        });
  }, [])//component did mount */

  const handleCardPress = () => {
    navigation.navigate('צפייה בפרטי הזמנת משיכה', { pullOrderId: props.id});
  };

  return (
    <Card style={styles.cardContainer} borderColor="#E1EAF9">
      <View style={styles.row}>
        <FCDateTime date={props.date} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {props.orderStatus === 'I' && (
            <>
              <Text style={{ color: '#5D9C59' }}>הונפק</Text>
            </>
          )}
          {props.orderStatus === 'W' && (
            <>
              <Text style={{ color: '#DF2E38' }}>בהמתנה</Text>
            </>
          )}
          {props.orderStatus === 'T' && (
            <>
              <Text style={{ color: '#FFC300' }}>מועבר</Text>
            </>
          )}
        </View>
      </View>

      <Text style={styles.cardBody}>שם יוצר ההזמנה: {props.nurseName}</Text>

      {props.pharmacistName != 'user user' && <Text style={styles.cardBody}><Text>רוקח אחראי : </Text>{props.pharmacistName}</Text>}

      <TouchableOpacity onPress={() => handleCardPress()}>
        <Text style={styles.readMore}>קרא עוד...</Text>
      </TouchableOpacity>
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