import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function HomePage(props) {
  const navigation = useNavigation();

  return (
    <View>
      <Text style={styles.title}>דף הבית</Text>
      <TouchableOpacity onPress={() => navigation.navigate('יצירת בקשה')}>
        <Text>יצירת בקשה</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('יצירת הזמנת משיכה')}>
        <Text>יצירת הזמנה חדשה</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('צפייה בבקשות אחרים')}>
        <Text>בקשות של מחלקות אחרות</Text>
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: '#003D9A',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});