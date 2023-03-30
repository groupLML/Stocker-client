import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../GlobalData/GlobalData';

import FCDetailedPullOrders from '../FunctionalComps/FCDetailedPullOrders';

export default function PullOrderPage(props) {

  const { pullOrderId } = props.route.params;

  const [medsInOrderList, setMedsInOrderList] = useState([]);
  const { apiUrlPullOrder, depId } = useContext(GlobalContext);

  //----------------------GET Meds in pull Order---------------------
  useEffect(() => {
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
  }, [])//component did mount


  //let pullOrder = pullOrdersList.filter((item) => item.orderId === pullOrderId);//get the request item to read 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>הזמנת משיכה</Text>
      <ScrollView>
        <FCDetailedPullOrders medsInOrderList={medsInOrderList}/>
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