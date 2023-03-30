import { View, Text } from 'react-native'
import React from 'react'
import FCDetailedPullOrder from './FCDetailedPullOrder';

export default function FCDetailedPullOrders(props) {
    let medsInOrderStr;
    medsInOrderStr = props.medsInOrderList.map((med, key) => {
        return <FCDetailedPullOrder
            id={med.medId}
            medName={med.medName}
            Qty={med.poQty}
            supQty={med.supQty}
            key={med.medId}// the mapping key is a unique value
        />;
    })
    
    return (
        <View>
            {medsInOrderStr}
        </View>
    )
}