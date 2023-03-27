import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function HomePage() {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>דף הבית</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('יצירת בקשה')}>
        <Text style={styles.buttonText}>יצירת בקשה</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('יצירת הזמנת משיכה')}>
        <Text style={styles.buttonText}>יצירת הזמנה חדשה</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('צפייה בבקשות שלי')}>
        <Text style={styles.buttonText}>בקשות של המחלקה שלי</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('צפייה בבקשות אחרים')}>
        <Text style={styles.buttonText}>בקשות של מחלקות אחרות</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('צפייה בהזמנת משיכה')}>
        <Text style={styles.buttonText}>הזמנות במשיכה</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('צפייה בבקשות אחרים')}>
        <Text style={styles.buttonText}>הזמנות בדחיפה</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 15,
    color: '#003D9A',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#E1EAF9',
    padding: 10,
    borderRadius: 10,
    marginLeft: 50,
    marginRight: 50,
    margin: 10,
    borderWidth: 1,
    borderColor: '#00317D'
  },
  buttonText: {
    color: '#00317D',
    fontSize: 20,
    textAlign: 'center',
  },
});