import React from 'react';
import { View } from 'react-native';

import FCPullOrder from './FCPullOrder';

export default function FCPullOrders() {
  let pullOrdersStr;
/*   if (props.isDetailedRequest === true) { */
    pullOrdersStr = props.PullOrdersList.map((pullOrder, key) => {
      return <FCPullOrder
 /*        id={request.reqId}
        date={request.reqDate}
        time={request.reqTime}
        genName={request.genName}
        nurseName={request.nurseName}
        aNurse={request.aUser}
        depName={request.depName}
        aDep={request.aDep} 
        reqQty={request.reqQty}
        reqStatus={request.reqStatus} */
        pullOrdersList={props.PullOrdersList}
       /*  key={request.reqId} */
      />;
    })
/*   }
  else {
    requestsStr = props.RequestsList.map((request, key) => {
      return <FCRequest
        id={request.reqId}
        date={request.reqDate}
        time={request.reqTime}
        genName={request.genName}
        nurseName={request.nurseName}
        depName={request.depName}
        reqQty={request.reqQty}
        reqStatus={request.reqStatus}
        requestsList={props.RequestsList}
        key={request.reqId}
      />;
    })
  } */


  return (
    <View>
      {pullOrdersStr}
    </View>
  )
}

