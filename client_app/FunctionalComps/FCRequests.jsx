import { View, Text } from 'react-native'
import React from 'react'
import FCRequest from './FCRequest'

export default function FCRequests(props) {

    let requestsStr = props.RequestsList.map((Request, ind) => {
        return <FCRequest id={Request.id}
            key={Request.id} />;
    }
    )
    return (
        <View>
            {requestsStr}
        </View>
    )
}