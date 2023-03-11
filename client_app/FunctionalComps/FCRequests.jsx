import React from 'react';
import { View } from 'react-native';

import FCDetailedRequest from './FCDetailedRequest';
import FCRequest from './FCRequest'

export default function FCRequests(props) {
    let requestsStr;
    if (props.isDetailedRequest === true) {
        requestsStr = props.RequestsList.map((request, key) => {
            return <FCDetailedRequest
                id={request.reqId}
                date={request.reqDate}
                medId={request.medId}
                genName={request.genName}
                cNurseId={request.cUserId}
                cNurseName={request.cNurseName}
                aDepId={request.aDepId}
                aDepName={request.aDepName}
                aNurseId={request.aUserId}
                reqQty={request.reqQty}
                reqStatus={request.reqStatus}
                requestsList={props.RequestsList}
                key={request.reqId}
            />;
        })
    }
    else {
        requestsStr = props.RequestsList.map((request, key) => {
            return <FCRequest
                id={request.reqId}
                date={request.reqDate}
                medId={request.medId}
                genName={request.genName}
                cNurseId={request.cUserId}
                cNurseName={request.cNurseName}
                aDepId={request.aDepId}
                aDepName={request.aDepName}
                aNurseId={request.aUserId}
                reqQty={request.reqQty}
                reqStatus={request.reqStatus}
                requestsList={props.RequestsList}
                key={request.reqId}
            />;
        })
    }


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