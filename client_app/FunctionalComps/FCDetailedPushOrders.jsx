import { View, Text } from 'react-native'
import React from 'react'
import FCDetailedPushOrder from './FCDetailedPushOrder';

export default function FCDetailedPushOrders(props) {
    let medsInOrderStr;
    medsInOrderStr = props.medsInOrderList.map((med, key) => {
        return <FCDetailedPushOrder
            id={med.medId}
            medName={med.medName}
            poQty={med.poQty}
            supQty={med.supQty}
            isWaitingOrder={props.isWaitingOrder}
            key={med.medId}
        />;
    })

    return (
        <View>
            {medsInOrderStr}
        </View>
    )
}