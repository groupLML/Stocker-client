import { StyleSheet, View } from 'react-native';
import React from 'react';

import FCMedInOrder from './FCMedInOrder';

export default function FCMedsInOrder(props) {
  let MedsInOrderStr = props.medsOrderList.map((med, ind) => {
    return <FCMedInOrder
      medId={med.medId}
      Qty={med.Qty}
      medsOrderList={med.medsOrderList}
      key={med.medId}
      getId2Delete={() => props.SendId2Delete(med.medId)}
    />;
  })


  return (
    <View style={styles.container}>
      {MedsInOrderStr}
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
});