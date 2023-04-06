import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';

import FCDetailedPushOrders from '../FunctionalComps/FCDetailedPushOrders';

export default function PushOrderPage(props) {

  const { pushOrderId, pushOrdersList } = props.route.params;

  let pushOrders = pushOrdersList.filter((item) => item.orderId === pushOrderId);//get the request item to read 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>הזמנת דחיפה</Text>
      <ScrollView>
        <FCDetailedPushOrders PushOrdersList={pushOrders} />
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