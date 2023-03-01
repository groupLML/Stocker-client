import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import FCDepTypeList from '../FunctionalComps/FCDepTypeList';
import { GlobalContext } from '../GlobalData/GlobalData';
import FCMedInput from '../FunctionalComps/FCMedInput';
import FCQuantitInput from '../FunctionalComps/FCQuantitInput';

export default function AddRequestPage(props) {

  const handleAddRequest = () => {
    //isChecked === true ? '#003D9A' : undefined
    console.log(DepTypes);
  };

  //צריך להחליט איפה נעשה פעם ראשונה את זה
  //-------------------------------Get Deps-----------------------------

  const { apiUrlDeps, Deps, setDeps } = useContext(GlobalContext);
  
  useEffect(() => {
    fetch(apiUrlDeps, { //של השרת URL
      method: 'GET',//מה המתודה
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset=UTF-8',
      })
    })
      .then(res => {
        return res.json()
      })
      .then(
        (result) => {
          setDeps(result);
        },
        (error) => {
          console.log("err post=", error);
        });
  }, [Deps]);//component did mount

  /* useEffect(() => {
    setDepartments(Deps);

         const filteredDeps = DepTypes.map(depType => {
          if (depType.isChecked) {
            const depIds = Deps.filter(dep => dep.depType === depType.name).map(dep => dep.depId);
            return { name: depType.name, depIds };
          }
          return null;
        }).filter(depType => depType !== null); 

  }, [Deps]); //callback function
 */
  return (
    <View style={styles.container}>
      <Text style={styles.title}>בקשה ממחלקה</Text>
      <View>
        <View style={styles.row}>
          <Text style={styles.fields}>שם תרופה:</Text>
          <FCMedInput />
        </View>
        <FCQuantitInput Qty={1} />
        <FCDepTypeList />
        <TouchableOpacity style={styles.button} onPress={() => handleAddRequest()}>
          <Text style={styles.buttonText}>אישור</Text>
        </TouchableOpacity>
      </View>
    </View >
  );
};

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
    fontSize: 17,
    color: "#003D9A",
    width: 100,
    marginRight: 10,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#003D9A',
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
});