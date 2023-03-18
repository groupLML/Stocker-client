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
                medName={request.medName}
                cNurseId={request.cUserId}
                cNurseName={request.cNurseName}
                aDepId={request.aDepId}
                aDepName={request.aDepName}
                aNurseId={request.aUserId}
                aNurseName={request.aNurseName}
                reqQty={request.reqQty}
                reqStatus={request.reqStatus}
                requestsList={props.RequestsList}
                handleRequestUpdate={props.handleRequestUpdate}
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
                medName={request.medName}
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