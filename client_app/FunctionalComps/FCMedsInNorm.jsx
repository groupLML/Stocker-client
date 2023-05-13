import { View, Text } from 'react-native';
import React from 'react';

import FCMedInNorm from './FCMedInNorm';

export default function FCMedsInNorm(props) {
    const MedsNormStr = props.ListMeds.map((medNorm, key) => {
        return <FCMedInNorm
            id={medNorm.medId}
            medId={medNorm.medId}
            normQty={medNorm.normQty}
            mazNum={medNorm.mazNum}
            medName={medNorm.medName}
            key={medNorm.medId}
        />;
    })


    return (
        <View>
            {MedsNormStr}
        </View>
    )
}