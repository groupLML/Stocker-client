import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';

import FCPullOrders from '../FunctionalComps/FCPullOrders';

export default function PullOrderPage(props) {

  const { pullOrderId, pullOrdersList } = props.route.params;

  let pullOrder = pullOrdersList.filter((item) => item.pullId === pullOrderId);//get the request item to read 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>הזמנת משיכה</Text>
      <ScrollView>
        <FCPullOrders PullOrdersList={pullOrder} isDetailedPullOrder={true} />
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