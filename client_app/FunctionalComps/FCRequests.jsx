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
                time={request.reqTime}
                genName={request.genName}
                nurseName={request.nurseName}
                /*  aNurse={request.aUser} */
                depName={request.depName}
                /*  aDep={request.aDep} */
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
                time={request.reqTime}
                genName={request.genName}
                nurseName={request.nurseName}
                /*  aNurse={request.aUser} */
                depName={request.depName}
                /*  aDep={request.aDep} */
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