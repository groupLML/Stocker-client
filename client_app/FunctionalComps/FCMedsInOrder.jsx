import { View } from 'react-native';
import React from 'react';

import FCMedInOrder from './FCMedInOrder';

export default function FCMedsInOrder(props) {
  let MedsInOrderStr = props.MedOrderList.map((medOrder, ind) => {
    return <FCMedInOrder
      id={medOrder.id}
      image={medOrder.image}
      name={medOrder.name}
      cookingMethod={medOrder.cookingMethod}
      time={medOrder.time}
      key={medOrder.id}
    />;
  })


  return (
    <View>
      {MedsInOrderStr}
    </View>
  );

}
