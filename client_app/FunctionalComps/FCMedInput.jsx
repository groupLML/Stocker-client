import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native'
import { GlobalContext } from '../GlobalData/GlobalData';

export default function FCMedInput() {

    const { meds } = useContext(GlobalContext);
   
    //מכל אובייקט genName יצירת מערך המכיל רק את מאפייני
    const genNames = [...new Set(meds.map(med => med.genName))];//(דיסטינק) ללא כפיליות
    //const genNames = meds.map(med => med.genName);
    //console.log(genNames);//בדיקה

    //-----------------------Autocomplete med input-------------------------------

    const options = genNames;

    const [inputValue, setInputValue] = useState('');
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [isSelectFromList, setIsSelectFromList] = useState(false);//אני הוספתי

    const handleInputChange = (text) => {
        setIsSelectFromList(false);
        setInputValue(text);
        const filtered = options.filter((option) => option.toLowerCase().startsWith(text.toLowerCase()));
        setFilteredOptions(filtered);
        if (filtered.length === 0) {
            setFilteredOptions(["אין ערכים תואמים, יש לבחור ערך מהרשימה"]);
        }
    };

    const handleSelectOption = (option) => {
        if (option !== "אין ערכים תואמים, יש לבחור ערך מהרשימה") {
            setInputValue(option);
            setIsSelectFromList(true);
            setFilteredOptions([]);
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
    )
}

const styles = StyleSheet.create({
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
    option: {
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
});