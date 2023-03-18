import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native'
import { GlobalContext } from '../GlobalData/GlobalData';

export default function FCMedInput(props) {

  //*******************************************להחליף שורות אחרי שליטל תוסיף את שם התרופה***********************************************
  const { uniqueMedNamesWithId } = useContext(GlobalContext);
  //const { meds } = useContext(GlobalContext);

  //-----------------------Autocomplete med input-------------------------------
  const options = uniqueMedNamesWithId.map(med => med.uniqueName);
  //const options = meds.map(med => med.medName);

  //*******************************************להחליף שורות אחרי שליטל תוסיף את שם התרופה***********************************************

  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isSelectFromList, setIsSelectFromList] = useState(false);

  useEffect(() => {
    if (props.clearInputs) {
      setInputValue('');
    }
  }, [props.clearInputs]);

  const handleInputChange = (text) => {
    setIsSelectFromList(false);
    setInputValue(text);
    if (text === '') {// set selected option to null when input is cleared
      props.sendMedSelect(null);
    }
    const filtered = options.filter((option) => option.toLowerCase().includes(text.toLowerCase()));
    //const filtered = options.filter((option) => option.toLowerCase().startsWith(text.toLowerCase()));
    setFilteredOptions(filtered);
    if (filtered.length === 0) {
      setFilteredOptions(["אין ערכים תואמים, יש לבחור ערך מהרשימה"]);
    }
  };

  const handleSelectOption = (option) => {
    if (option !== "אין ערכים תואמים, יש לבחור ערך מהרשימה") {
      const selectedMed = uniqueMedNamesWithId.find((med) => med.uniqueName === option);
      setInputValue(option);
      setIsSelectFromList(true);
      setFilteredOptions([]);
      props.sendMedSelect(selectedMed.id);
    }
  };

  const renderItem = ({ item, index }) => {
    if (index < 5) {//5 options only??
      return (
        <TouchableOpacity onPress={() => handleSelectOption(item)}>
          <Text style={styles.option}>{item}</Text>
        </TouchableOpacity>
      );
    }
    return null;
  };

  return (
    <View >
      <View style={{ flexDirection: 'row', alignItems: 'center', position: 'relative', width: '90%' }}>
        <Text style={styles.fields}>שם תרופה:</Text>
        <View style={{ flex: 1 }}>
          <TextInput
            style={styles.input}
            value={inputValue}
            placeholder={props.medName ? props.medName : 'בחר תרופה'}
            onChangeText={handleInputChange}
          />
          {inputValue && !isSelectFromList && <View style={styles.flatListContainer}>
            <FlatList
              data={filteredOptions}
              renderItem={renderItem}
              keyExtractor={(item) => item}
            />
          </View>}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  flatListContainer: {
    maxHeight: 200, // maximum height of the FlatList
    backgroundColor: '#E1EAF9',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    zIndex: 1,
  },
  option: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 7,
    fontSize: 16,
  },
  fields: {
    alignSelf:'flex-start',
    marginTop:10,
    fontSize: 17,
    color: "#003D9A",
    marginRight: 15,
    fontWeight: 'bold',
  },
  input: {
    maxWidth: 250,
    borderWidth: 1,
    borderColor: '#00317D',
    borderRadius: 5,
    padding: 10,
    paddingHorizontal: 10,
    textAlign: 'left',
    writingDirection: 'rtl',
  },
});