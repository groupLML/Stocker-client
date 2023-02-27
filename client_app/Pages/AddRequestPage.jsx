import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import Checkbox from 'expo-checkbox';
import FCDepTypeList from '../FunctionalComps/FCDepTypeList';
import { GlobalContext } from '../GlobalData/GlobalData';
import Autocomplete from 'react-native-autocomplete-input';
import Icon from 'react-native-vector-icons/FontAwesome';
import NumericInput from 'react-native-numeric-input'
/* import { AntDesign } from '@expo/vector-icons'; */


export default function AddRequestPage(props) {
  //-----------------------------------Autocomplete med input---------------------------------------------
  const data = [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banana' },
    { id: 3, name: 'Cherry' },
    { id: 4, name: 'Date' },
  ];

  const [query, setQuery] = useState('');//tracks the user's input
  const [selectedItems, setSelectedItems] = useState([]);//stores the selected items

  const filterData = (query) => {//filter the data source based on the user's input
    if (query === '') {
      return [];
    }
    return data.filter((item) => item.name.toLowerCase().startsWith(query.toLowerCase()));
  };

  const renderSuggestion = ({ item }) => (//render each auto completion suggestion
    <TouchableOpacity onPress={() => addItem(item)}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderSelectedItem = ({ item }) => (//render each selected item's name
    <View style={styles.selectedItem}>
      <Text>{item.name}</Text>
      <TouchableOpacity onPress={() => removeItem(item)}>
        <Icon name="times" size={20} />
      </TouchableOpacity>
    </View>
  );

  const addItem = (item) => {// add a selected item to the selectedItems array
    setSelectedItems([...selectedItems, item]);
    setQuery('');
  };

  const removeItem = (itemName) => {// remove a selected item from the selectedItems array
    setSelectedItems(selectedItems.filter((item) => item.name !== itemName));
  };
  //-------------------------------------------------------------------------------------------

  const [isChecked, setChecked] = useState(true);
  const [reqQty, setReqQty] = useState(0);
  const { DepTypes, setDepTypes, Meds } = useContext(GlobalContext);

  /*   const handleIncreaseQuantity = () => {
      setReqQty(reqQty + 1);
    };
  
    const handleDecreaseQuantity = () => {
      if (reqQty > 0) {
        setReqQty(reqQty - 1);
      }
    }; */

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
          <Autocomplete
            data={filterData(query)}
            value={query}
            onChangeText={(text) => setQuery(text)}
            renderItem={renderSuggestion}
            keyExtractor={(item) => item.id.toString()}
            placeholder="Type here..."
            containerStyle={styles.autocompleteContainer}
            listStyle={styles.listStyle} />
           <FlatList
            data={selectedItems}
            renderItem={renderSelectedItem}
            keyExtractor={(item) => item.id.toString()}
            style={styles.selectedItemsContainer} />

          {/* <TextInput
            style={styles.input}
            value={depName}
            onChangeText={(text) => setDepName(text)}
          /> */}
        </View>
        <View style={styles.row}>
          <Text style={styles.fields}>כמות:</Text>
          <NumericInput type='plus-minus' rounded minValue={1} textColor='#003D9A' iconStyle={{ color: '#003D9A' }} rightButtonBackgroundColor='#E5E4E2' leftButtonBackgroundColor='#E5E4E2' onChange={value => setReqQty(value)} />
          {/* <TouchableOpacity onPress={handleIncreaseQuantity}>
            <AntDesign name="plus" size={20} color="black" />
          </TouchableOpacity>

          <Text style={{ marginHorizontal: 10, fontSize: 18 }}>{reqQty}</Text>

          <TouchableOpacity onPress={handleDecreaseQuantity}>
            <AntDesign name="minus" size={20} color="black" />
          </TouchableOpacity> */}
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
    fontSize: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ccc',
    paddingVertical: 5, // reduce padding on top and bottom
    paddingHorizontal: 10,
    borderColor: "#00317D",
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
  /*   quantity: {
      size: 24,
      color: "black",
    }, */
});