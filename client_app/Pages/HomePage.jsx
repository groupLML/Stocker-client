import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function HomePage() {

  const navigation = useNavigation();


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stocker</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('יצירת בקשה')}>
          <Image source={require("../Images/question.png")} style={styles.buttonImage} />
          <Text style={styles.buttonText}>יצירת בקשה</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('יצירת הזמנת משיכה')}>
          <Image source={require("../Images/order.png")} style={styles.buttonImage} />
          <Text style={styles.buttonText}>יצירת הזמנה</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('צפייה בבקשות שלי')}>
          <Image source={require("../Images/take.png")} style={styles.buttonImage} />
          <Text style={styles.buttonText}>בקשות המחלקה שלי</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('צפייה בבקשות אחרים')}>
          <Image source={require("../Images/give.png")} style={styles.buttonImage} />
          <Text style={styles.buttonText}>בקשות מחלקות אחרות</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('צפייה בהזמנת משיכה')}>
          <Image source={require("../Images/pull.png")} style={styles.buttonImage} />
          <Text style={styles.buttonText}>הזמנות משיכה</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('צפייה בבקשות אחרים')}>
        <Image source={require("../Images/push.png")} style={styles.buttonImage} />
          <Text style={styles.buttonText}>הזמנות דחיפה</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: 'center',
    marginBottom: 15,
    color: '#003D9A',
    marginTop: 20,
    textShadowColor: '#CCCCCC',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    marginTop: 20,
  },
  button: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    margin: 10,
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.7,
    shadowRadius: 5,
    elevation: 8,
  },
  buttonText: {
    color: '#00317D',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonImage: {
    width: 40,
    height: 40,
  },
});