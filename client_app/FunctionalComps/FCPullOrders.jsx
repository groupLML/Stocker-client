import React from 'react';
import { View, StyleSheet } from 'react-native';

import FCPullOrder from './FCPullOrder';
import FCDetailedPullOrder from './FCDetailedPullOrder';

export default function FCPullOrders(props) {
  let pullOrdersStr;
  if (props.isDetailedPullOrder === true) {
    return <FCDetailedPullOrder/>
    /* pullOrdersStr = props.PullOrdersList.map((pullOrder, key) => {
      return <FCRequest
        id={pullOrder.orderId}
        date={pullOrder.pullDate}
        //pullMedList={pullOrder.orderDate}//לבדוק
        nurseId={pullOrder.nurseId}
        nurseName={pullOrder.nurseName}
        pharmacistId={pullOrder.pharmacistId}
        pharmacistName={pullOrder.pharmacistName}
        depId={pullOrder.depId}
        depName={pullOrder.depName}
        reqStatus={pullOrder.orderStatus}
        pullOrdersList={props.PullOrdersList}
        key={pullOrder.orderId}
      />;
    }) */
  }
  else {
    pullOrdersStr = props.PullOrdersList.map((pullOrder, key) => {
      return <FCPullOrder
        id={pullOrder.orderId}
        date={pullOrder.orderDate}
        //pullMedList={pullOrder.orderDate}//לבדוק
        nurseId={pullOrder.nurseId}
        nurseName={pullOrder.nurseName}
        pharmacistId={pullOrder.pharmacistId}
        pharmacistName={pullOrder.pharmacistName}
        depId={pullOrder.depId}
        depName={pullOrder.depName}
        reqStatus={pullOrder.orderStatus}
        pullOrdersList={props.PullOrdersList}
        key={pullOrder.id}
      />;
    })
  }

  return (
    <View style={styles.container}>
      {pullOrdersStr}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 90,
  },
});
