import { View, Text } from 'react-native';
import React from 'react';
import { Card } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

export default function FCMedOrder(props) {
  return (
    <View>
      <Card>
        <View>
          <Ionicons name='close-outline'/>
          <Text>{props.medId}</Text>
          <Text>{props.Qty}</Text>
        </View>
      </Card>
    </View>
  )
}