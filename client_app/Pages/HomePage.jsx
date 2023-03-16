import { View, Text } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function HomePage(props) {
  const navigation = useNavigation();
  
  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}