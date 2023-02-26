import React from 'react'
import { View } from 'react-native'
import FCRequest from './FCRequest'

export default function FCRequests(props) {

    let requestsStr = props.RequestsList.map((request, key) => {
        return <FCRequest
            id={request.reqId}
            date={request.reqDate}
            time={request.reqTime}
            medId={request.genName}
            nurseName={request.nurseName}
           /*  aNurse={request.aUser} */
            depName={request.depName}
           /*  aDep={request.aDep} */
            reqQty={request.reqQty}
            reqStatus={request.reqStatus}
            requestsList={props.RequestsList}
            isDetailedRequest={props.isDetailedRequest}
            key={request.reqId}
            />;
    })

    return (
        <View>
            {requestsStr}
        </View>
    )
}

/* id = { request.reqId }
cNurse = { request.cUser }
aNurse = { request.aUser }
cDep = { request.cDep }
aDep = { request.aDep }
medId = { request.medId }
reqQty = { request.reqQty }
reqStatus = { request.reqStatus }
date = { request.reqDate }
key = { request.reqId } */