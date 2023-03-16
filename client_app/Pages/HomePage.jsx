import { View, Text, TouchableHighlight, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function HomePage(props) {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Home</Text>
      <TouchableOpacity onPress={() => navigation.navigate('יצירת בקשה')}>
        <Text>יצירת בקשה</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('יצירת הזמנת משיכה')}>
        <Text>יצירת הזמנה חדשה</Text>
      </TouchableOpacity>
    </View>
  )
}