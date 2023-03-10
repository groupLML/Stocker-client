import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native'
import { GlobalContext } from '../GlobalData/GlobalData';

export default function FCMedInput(props) {

  const { meds, uniqueMedNames, uniqueMedNamesWithId } = useContext(GlobalContext);

  //const genNamesWithId = meds.map((med) => ({ id: med.medId, genName: med.genName }));
  //מכל אובייקט genName יצירת מערך המכיל רק את מאפייני
  //const uniqueGenNames = [...new Set(genNamesWithId.map(med => med.genName))];//(דיסטינק) ללא כפיליות

  //get the unique name of the requiered med
  const medName = uniqueMedNamesWithId
    .filter(med => med.id === props.medId)
    .map(med => med.uniqueName)[0];

  //-----------------------Autocomplete med input-------------------------------
  const options = uniqueMedNames;

  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isSelectFromList, setIsSelectFromList] = useState(false);

  const handleInputChange = (text) => {
    setIsSelectFromList(false);
    setInputValue(text);
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
      if (selectedMed) {
        setInputValue(option);
        setIsSelectFromList(true);
        setFilteredOptions([]);
        props.sendMedSelect(selectedMed.id);
      }
      else {
        setInputValue('');
        setIsSelectFromList(false);
        setFilteredOptions([]);
        props.sendMedSelect(null);
      }
      console.log(selectedMed);
    }
  };

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

  return (
    <View >
      <View style={{ flexDirection: 'row', alignItems: 'center', position: 'relative', maxWidth: '80%' }}>
        <Text style={styles.fields}>שם תרופה:</Text>
        <TextInput
          style={[styles.input, { width: '100%' }]}
          value={inputValue}
          placeholder={props.genName ? props.genName : 'בחר תרופה'}
          onChangeText={handleInputChange}
        />
      </View>
      {inputValue && !isSelectFromList && <View style={styles.flatListContainer}>
        <FlatList
          data={filteredOptions}
          renderItem={renderItem}
          keyExtractor={(item) => item}
        />
      </View>}
    </View>
  )
}

const styles = StyleSheet.create({
  flatListContainer: {
    paddingHorizontal: 10,
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
    fontSize: 17,
    color: "#003D9A",
    marginRight: 10,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#00317D',
    borderRadius: 5,
    padding: 10,
    textAlign: 'right',
    paddingHorizontal: 10,
    textAlign: 'left',
    writingDirection: 'rtl',
  },
});