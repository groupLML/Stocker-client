import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../GlobalData/GlobalData';

import FCDetailedPullOrders from '../FunctionalComps/FCDetailedPullOrders';
import FCDateTime from '../FunctionalComps/FCDateTime';

export default function PullOrderPage(props) {

  const { pullOrderId, PullOrdersList } = props.route.params;
  const [pullOrder, setPullOrder] = useState();
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
          const order = PullOrdersList.find((order) => order.orderId === pullOrderId);
          setPullOrder(order);
          console.log("MedsInOrderList=", result);
          console.log("pullOrder=", order);
        },
        (error) => {
          console.log("err get=", error);
        });
  }, []);


  return (
    <View style={styles.container}>
      {pullOrder && <Text>
        <FCDateTime date={pullOrder.orderDate}></FCDateTime>
        </Text>
      }
      <Text style={styles.title}>הזמנה מספר<Text>{pullOrderId}</Text></Text>
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