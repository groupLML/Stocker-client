import { View } from 'react-native';
import React from 'react';

import FCMedOrder from './FCMedOrder';

export default function FCMedOrders(props) {
  let MedOrdersStr = props.MedOrdersList.map((medOrder, ind) => {
    return <FCMedOrder
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
      {MedOrdersStr}
    </View>
  );

}