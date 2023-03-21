import { View } from 'react-native';
import React from 'react';

import FCMedInOrder from './FCMedInOrder';

export default function FCMedsInOrder(props) {
  let MedsInOrderStr = props.medsOrderList.map((med, ind) => {
    return <FCMedInOrder
      medId={med.medId}
      Qty={med.Qty}
      medsOrderList={med.medsOrderList}
      key={med.medId}
    />;
  })


  return (
    <View>
      {MedsInOrderStr}
    </View>
  );

}
