import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';
import FCDepTypeList from '../FunctionalComps/FCDepTypeList';
import { GlobalContext } from '../GlobalData/GlobalData';

export default function AddRequestPage(props) {

  const [isChecked, setChecked] = useState(true);
  const [depName, setDepName] = useState('');
  const [reqQty, setReqQty] = useState('');
  const { DepTypes, setDepTypes, Meds } = useContext(GlobalContext);
  
  /*const [selectedDep, setselectedDep] = useState([]); */
  /* let selected = DepTypes.filter((DepType) => DepType.isChecked); */

  useEffect(() => {//component did Update DepTypes
    console.log(DepTypes);
  }, [DepTypes]);

  useEffect(() => {//component did Update isChecked
    if (isChecked === true) {
      let temp = DepTypes.map((DepType) => {
        return { ...DepType, isChecked: true };
      });
      setDepTypes(temp);
    }
    else {
      let temp = DepTypes.map((DepType) => {
        return { ...DepType, isChecked: false };
      });
      setDepTypes(temp);
    }
  }, [isChecked]);


  const handleAddRequest = () => {
    isChecked === true ? '#003D9A' : undefined
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>בקשה ממחלקה</Text>
      <View>
        <View style={styles.row}>
          <Text style={styles.fields}>שם תרופה:</Text>
          <TextInput
            style={styles.input}
            value={depName}
            onChangeText={(text) => setDepName(text)}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.fields}>כמות:</Text>
          <TextInput
            style={styles.input}
            value={reqQty}
            onChangeText={(text) => setReqQty(text)}
          />
        </View>
        <View>
          <View style={styles.row}>
            <Checkbox style={styles.CB} color={isChecked ? '#003D9A' : undefined} value={isChecked} onValueChange={setChecked} />
            <Text style={styles.CB_txt}>שלח לכל המחלקות</Text>
          </View >
          {!isChecked && <FCDepTypeList />}
        </View>
        <TouchableOpacity style={styles.button} onPress={() => handleAddRequest()}>
          <Text style={styles.buttonText}>אישור</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    color: '#003D9A',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  fields: {
    width: 100,
    marginRight: 10,
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ccc',
    padding: 10,
  },
  CB: {
    marginRight: 10,
  },
  CB_txt: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#003D9A',
    borderRadius: 10,
    paddingVertical: 15,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
});