import React from 'react'
import { View } from 'react-native'
import FCRequest from './FCRequest'

export default function FCRequests(props) {

    let requestsStr = props.RequestsList.map((request, key) => {
        return <FCRequest
            id={request.id}
            cNurse={request.cUser}
            aNurse={request.aUser}
            cDep={request.cDep}
            aDep={request.aDep}
            medId={request.medId}
            reqQty={request.reqQty} 
            reqStatus={request.reqStatus} 
            date={request.reqDate}
            key={request.id}
            />;
    })

    return (
        <View>
            {requestsStr}
        </View>
    )
}