import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

export default function LogoutPage() {

  const { setDepId } = useContext(GlobalContext);

  const handleLogout = () => {
    try {//Inserting user information into AsyncStorage
      const userData = JSON.stringify("")
      AsyncStorage.setItem('User', userData, () => {
        setDepId("");
        props.navigation.navigate('התחברות');
      });
    } catch (e) {
      // saving error
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={() => handleLogout()}>
        <Text>התנתק</Text>
      </TouchableOpacity>
    </View>
  )
}