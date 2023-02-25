import { View, Text } from 'react-native'
import React from 'react'

export default function RequestPage(props) {
    const { requestId } = props.route.params;
  return (
    <View>
      <Text>{requestId}</Text>
    </View>
  )
}