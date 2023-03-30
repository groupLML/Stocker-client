import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../GlobalData/GlobalData';

import FCDetailedPullOrders from '../FunctionalComps/FCDetailedPullOrders';

export default function PullOrderPage(props) {

  const { pullOrderId, PullOrdersList } = props.route.params;
  const [pullOrder, setpullOrder] = useState();
  const [medsInOrderList, setMedsInOrderList] = useState([]);
  const { apiUrlPullOrder, depId } = useContext(GlobalContext);

  //----------------------GET Meds in pull Order---------------------
  useEffect(() => {
    setpullOrder(PullOrdersList.find((order) => order.orderId === pullOrderId));

    fetch(apiUrlPullOrder + 'GetOrderDetails/depId/' + `${depId}` + '/orderId/' + `${pullOrderId}`, {
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
  }, []);


  useEffect(() => {
    console.log("pullOrder=", pullOrder);
    console.log(pullOrder.nurseName);
  }, [pullOrder]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>הזמנה מספר<Text>{pullOrderId}</Text></Text>
      <Text style={styles.title}>תאריך<Text></Text></Text>
      <ScrollView>
        <FCDetailedPullOrders medsInOrderList={medsInOrderList} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 15,
    color: '#003D9A',
    marginTop: 60,
  },
});