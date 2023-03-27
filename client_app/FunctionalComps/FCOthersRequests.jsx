import { View, Text } from 'react-native'
import React from 'react'
import FCOthersRequest from './FCOthersRequest'

export default function FCOthersRequests(props) {

  const requestsStr = props.RequestsList.map((request, key) => {
    return <FCOthersRequest
      id={request.reqId}
      depName={request.depName}
      cNurseName={request.cNurseName}
      date={request.reqDate}
      medName={request.medName}
      reqQty={request.reqQty}
      stcQty={request.stcQty}
      requestsList={props.RequestsList}
      key={request.reqId}
    />;
  })
  return (
    <View>
      {requestsStr}
    </View>
  )
}