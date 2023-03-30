import React from 'react';
import { View, StyleSheet } from 'react-native';

import FCPullOrder from './FCPullOrder';
import FCDetailedPullOrder from './FCDetailedPullOrder';

export default function FCPullOrders(props) {
  let pullOrdersStr;
/*   if (props.isDetailedPullOrder === true) {
    pullOrdersStr = props.PullOrdersList.map((med, key) => {
      return <FCDetailedPullOrder
        id={med.medId}
        medName={med.medName}
        Qty={med.poQty}
        supQty={med.supQty}
        key={med.medId}// the mapping key is a unique value
      />;
    })
  }
  else {
    pullOrdersStr = props.PullOrdersList.map((pullOrder, key) => {
      return <FCPullOrder
        id={pullOrder.orderId}
        date={pullOrder.orderDate}
        nurseId={pullOrder.nurseId}
        nurseName={pullOrder.nurseName}
        pharmacistId={pullOrder.pharmacistId}
        pharmacistName={pullOrder.pharmacistName}
        orderStatus={pullOrder.orderStatus}
        key={key}// the mapping key is a unique value
      />;
    })
  } */

  pullOrdersStr = props.PullOrdersList.map((pullOrder, key) => {
    return <FCPullOrder
      id={pullOrder.orderId}
      date={pullOrder.orderDate}
      nurseId={pullOrder.nurseId}
      nurseName={pullOrder.nurseName}
      pharmacistId={pullOrder.pharmacistId}
      pharmacistName={pullOrder.pharmacistName}
      orderStatus={pullOrder.orderStatus}
      key={key}// the mapping key is a unique value
    />;
  })

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
