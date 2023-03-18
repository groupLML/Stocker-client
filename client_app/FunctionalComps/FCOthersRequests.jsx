import { View, Text } from 'react-native'
import React from 'react'
import FCOthersRequest from './FCOthersRequest'

export default function FCOthersRequests(props) {

  const requestsStr = props.RequestsList.map((request, key) => {
    return <FCOthersRequest
      //id={request.reqId} *****************************כשליטל תוסיף את המספר בקשה********************************
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

/*
"depName": "כירורגיה פלסטית",
"cNurseName": "Fred Bruggeman",
"reqDate": "2023-02-22T23:30:29",
"medName": "Paracetamol Acamol 20 MG TAB",
"reqQty": 2,
"stcQty": 40 
*/