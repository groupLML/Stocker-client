import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../GlobalData/GlobalData';

import FCDetailedPushOrders from '../FunctionalComps/FCDetailedPushOrders';

export default function PushOrderPage(props) {

  const [pushOrder, setPushOrder] = useState(null);
  const [medsInOrderList, setMedsInOrderList] = useState([]);
  const { apiUrlPushOrder, depId } = useContext(GlobalContext);

  const { pushOrderId, pushOrdersList } = props.route.params;

  //----------------------GET Meds in push order---------------------
  useEffect(() => {
    fetch(apiUrlPushOrder + 'GetOrderDetails/depId/' + `${depId}` + '/orderId/' + `${pushOrderId}` + '/type/' + `${1}`, {
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
          const order = pushOrdersList.find((order) => order.orderId === pushOrderId);
          console.log(order.orderStatus + 'd');
          setPushOrder(order);
        },
        (error) => {
          console.log("err get=", error);
        });
  }, []);

  return (
    <View>
      {pushOrder !==null &&
        <View style={styles.container}>
          <Text style={styles.title}>הזמנה מספר{pushOrderId}</Text>
          <ScrollView>
            <FCDetailedPushOrders medsInOrderList={medsInOrderList} orderStatus={pushOrder.orderStatus} />
          </ScrollView>
        </View>
      }
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