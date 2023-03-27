import { View, Text, StyleSheet, FlatList } from 'react-native';
import Checkbox from 'expo-checkbox';
import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../GlobalData/GlobalData';

export default function FCDepTypeList() {

    //-----------------------------Dep Type List------------------------------------
    const [isChecked, setChecked] = useState(true); //Send to all deps checkBox status (init value is checked)
    const { DepTypes, setDepTypes } = useContext(GlobalContext);

    useEffect(() => {//Send to all deps checkBox (isChecked) did Update
        if (isChecked === true) {
            let temp = DepTypes.map((DepType) => {
                return { ...DepType, isChecked: true };
            });
            setDepTypes(temp); //set the depTypes array to temp where all deps are checked
        }
        else {
            let temp = DepTypes.map((DepType) => {
                return { ...DepType, isChecked: false };
            });
            setDepTypes(temp); //set the depTypes array to temp where none of deps are checked
        }
    }, [isChecked]);

    const handleChange = (ChosenDepName) => { //A specific dep type checkbox is checked
        let temp = DepTypes.map((DepType) => { //find the Chosen Dep and add to temp array
            if (ChosenDepName === DepType.name) {
                return { ...DepType, isChecked: !DepType.isChecked };
            }
            return DepType;
        });
        setDepTypes(temp); //set the depTypes array for temp
    };

    return (
        <View>
            <View style={styles.row}>
                <Checkbox style={styles.CB} color={isChecked ? '#003D9A' : undefined} value={isChecked} onValueChange={setChecked} />
                <Text style={styles.CB_txt}>שלח לכל המחלקות</Text>
            </View >
            {!isChecked && <FlatList //when Send to all deps checkBox status is false (unchecked) show all checkboxs options
                data={DepTypes}
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        <Checkbox style={styles.CB} color={item.isChecked ? '#003D9A' : undefined} value={item.isChecked} onValueChange={() => handleChange(item.name)} />
                        <Text style={styles.CB_txt}>{item.name}</Text>
                    </View>
                )}
            />}
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        margin: 5,
    },
    CB: {
        marginRight: 20,
    },
    CB_txt: {
        fontSize: 16,
    color:'#003D9A'
    },
});