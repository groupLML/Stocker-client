import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';
import NumericInput from 'react-native-numeric-input'

import FCDepTypeList from '../FunctionalComps/FCDepTypeList';
import { GlobalContext } from '../GlobalData/GlobalData';

//import Autocomplete from 'react-native-autocomplete-input';
//import Icon from 'react-native-vector-icons/FontAwesome';


export default function AddRequestPage(props) {

  //-------------------------------Get Meds-----------------------------

  const { apiUrlMeds } = useContext(GlobalContext);
  const [meds, setMeds] = useState([]);

  useEffect(() => {
    fetch(apiUrlMeds, { //של השרת URL
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
        setMeds(result);
      },
      (error) => {
        console.log("err post=", error);
      });
  }, [])

  //מכל אובייקט genName יצירת מערך המכיל רק את מאפייני
  const genNames = [...new Set(meds.map(med => med.genName))];//ייחודי
  //const genNames = meds.map(med => med.genName);
  //console.log(genNames);//בדיקה

  //-----------------------Autocomplete med input-------------------------------

  const options = genNames;

  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isSelectFromList, setIsSelectFromList] = useState(false);//אני הוספתי

  const handleInputChange = (text) => {
    //setInputValue(text);
    //setFilteredOptions(options.filter((option) => option.toLowerCase().startsWith(text.toLowerCase())));
    setIsSelectFromList(false);
    setInputValue(text);
    const filtered = options.filter((option) => option.toLowerCase().startsWith(text.toLowerCase()));
    setFilteredOptions(filtered);
    if (filtered.length === 0) {
      setFilteredOptions(["The medicine doesn't exist"]);
    }
  };

  const handleSelectOption = (option) => {
    if (option !== "The medicine doesn't exist"){
    setInputValue(option);
    setIsSelectFromList(true);
    setFilteredOptions([]);
    }
  };

  /* const renderItem = ({ item }) => (
    <Text style={{ marginVertical: 5 }} onPress={() => handleSelectOption(item)}>{item}</Text>
  ); */
  const renderItem = ({ item, index }) => {
    if (index < 5) {
      return (
        <TouchableOpacity onPress={() => handleSelectOption(item)}>
          <Text style={styles.option}>{item}</Text>
        </TouchableOpacity>
      );
    }
    return null;
  };

  //-----------------------------Dep Type List------------------------------------
  const [isChecked, setChecked] = useState(true);
  const [reqQty, setReqQty] = useState(1);
  const { DepTypes, setDepTypes} = useContext(GlobalContext);

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
    //isChecked === true ? '#003D9A' : undefined
    console.log(DepTypes);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>בקשה ממחלקה</Text>
      <View>
        <View style={styles.row}>
          <Text style={styles.fields}>שם תרופה:</Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} value={inputValue} placeholder="Type something..." onChangeText={handleInputChange} />
            {inputValue && !isSelectFromList && <View style={styles.flatListContainer}>
              <FlatList
                data={filteredOptions}
                renderItem={renderItem}
                keyExtractor={(item) => item}
              />
            </View>}
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.fields}>כמות:</Text>
          <NumericInput type='plus-minus' rounded containerStyle={{ flexDirection: 'row-reverse' }} minValue={1} textColor='#003D9A' iconStyle={{ color: '#003D9A' }} rightButtonBackgroundColor='#E1EAF9' leftButtonBackgroundColor='#E1EAF9' onChange={value => setReqQty(value)} />
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
  inputContainer: {
    position: 'relative',
  },
  flatListContainer: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    maxHeight: 200, // maximum height of the FlatList
    backgroundColor: '#E1EAF9',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 7,
    zIndex: 1,
  },
  option:{
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 7,
    fontSize: 16,
  },
  input: {
    // flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ccc',
    paddingVertical: 5, // reduce padding on top and bottom
    paddingHorizontal: 65,
    borderColor: "#00317D",
    paddingRight: 10,
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
    paddingVertical: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
});