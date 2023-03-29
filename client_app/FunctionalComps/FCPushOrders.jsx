
import React from 'react';
import { View, StyleSheet } from 'react-native';

import FCPushOrder from './FCPushOrder';
import FCDetailedPullOrder from './FCDetailedPullOrder';

export default function FCPushOrders(props) {
  let pushOrdersStr;
  if (props.isDetailedPushOrder === true) {
    pushOrdersStr = props.PushOrdersList.map((pushOrder, key) => {
      return <FCDetailedPullOrder
        id={pushOrder.orderId}
        date={pushOrder.orderDate}
        //pullMedList={pullOrder.orderDate}//לבדוק
        nurseId={pushOrder.nurseId}
        nurseName={pushOrder.nurseName}
        pharmacistId={pushOrder.pharmacistId}
        pharmacistName={pushOrder.pharmacistName}
        depId={pushOrder.depId}
        depName={pushOrder.depName}
        orderStatus={pushOrder.orderStatus}
        PushOrdersList={props.PushOrdersList}
        key={pushOrder.id}
      />;
    })
  }
  else {
    pushOrdersStr = props.PushOrdersList.map((pushOrder, key) => {
      return <FCPushOrder
        id={pushOrder.orderId}
        date={pushOrder.orderDate}
        //pullMedList={pullOrder.orderDate}//לבדוק
        nurseId={pushOrder.nurseId}
        nurseName={pushOrder.nurseName}
        pharmacistId={pushOrder.pharmacistId}
        pharmacistName={pushOrder.pharmacistName}
        depId={pushOrder.depId}
        depName={pushOrder.depName}
        orderStatus={pushOrder.orderStatus}
        PushOrdersList={props.PushOrdersList}
        key={pushOrder.id}
      />;
    })
  }

  return (
    <View style={styles.container}>
      {pushOrdersStr}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 90,
  },
});
