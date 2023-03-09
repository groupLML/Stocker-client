import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';

import FCDepTypeList from '../FunctionalComps/FCDepTypeList';
import { GlobalContext } from '../GlobalData/GlobalData';
import FCMedInput from '../FunctionalComps/FCMedInput';
import FCQuantityInput from '../FunctionalComps/FCQuantityInput';

export default function AddRequestPage(props) {
  
  const [selectedMedId, setSelectedMedId] = useState(null);
  const [Qty, setQty] = useState(1);

  const handleSelectMed = (medId) => {
    setSelectedMedId(medId);
  };

  const GetQtyFromInput = (Qty) => {
    setQty(Qty);
  }

 /*  useEffect(() => {
    console.log(Qty);
  }) */

  const handleAddRequest = () => {

    const { getUserData, DepTypes } = useContext(GlobalContext);
    const SelectedDepTypes = DepTypes.filter(depType => depType.isChecked).map(depType => depType.name);


    const user = getUserData();

    const request = { //create a request object 
      cUser: user.userId,
      cDep: user.depId,
<<<<<<< Updated upstream
      aDep: null,
      medId: selectedMedId,
=======
      medId: 1,
>>>>>>> Stashed changes
      reqQty: Qty,
      reqDate: moment().format('YYYY-MM-DD HH:mm:ss'),
      DepTypes: SelectedDepTypes,
    };

    //---------------------------------------Post request----------------------------------------
    fetch(apiUrlMedRequest, {
      method: 'POST',
      body: JSON.stringify(request),
      headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset=UTF-8',
      })
    })
      .then(res => {
        return res.json()
      })
      .then(
        (result) => {
          PostRequestDeps(result);//result is the added request id
        },
        (error) => {
          console.log("err post=", error);
        });

  /*   //צריך להחליט איפה נעשה פעם ראשונה את זה
    //-------------------------------Get Deps-----------------------------
  
    const { apiUrlDeps, deps, setDeps } = useContext(GlobalContext);
  
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
    }, [Deps]);//component did mount */

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
          <FCMedInput sendMedSelect={handleSelectMed} />
        </View>
        <FCQuantityInput reqQty={1} sendQty={GetQtyFromInput} />
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
});}