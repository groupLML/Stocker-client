import React from 'react';
import { View, StyleSheet } from 'react-native';

import FCPullOrder from './FCPullOrder';

export default function FCPullOrders(props) {
  let pullOrdersStr;
  if (props.isDetailedPullOrder === true) {
    pullOrdersStr = props.PullOrdersList.map((pullOrder, key) => {
      return <FCPullOrder
        id={pullOrder.pullId}
        date={pullOrder.pullDate}
        time={pullOrder.PullTime}
        pullMedList={pullOrder.pullMedOrder}//לבדוק
        nurseName={pullOrder.nurseName}
        aNurse={pullOrder.nUser}
        depName={pullOrder.depName}
        dep={pullOrder.depId}
        reqStatus={pullOrder.pullStatus}
        pullOrdersList={props.PullOrdersList}
        key={pullOrder.pullId}
      />;
    })
  }
  else {
    pullOrdersStr = props.PullOrdersList.map((pullOrder, key) => {
      return <FCRequest
        id={pullOrder.pullId}
        date={pullOrder.pullDate}
        time={pullOrder.PullTime}
        pullMedList={pullOrder.pullMedOrder}//לבדוק
        nurseName={pullOrder.nurseName}
        aNurse={pullOrder.nUser}
        depName={pullOrder.depName}
        dep={pullOrder.depId}
        reqStatus={pullOrder.pullStatus}
        pullOrdersList={props.PullOrdersList}
        key={pullOrder.pullId}
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
