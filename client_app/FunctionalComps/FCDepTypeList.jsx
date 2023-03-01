import { View, Text, StyleSheet, FlatList } from 'react-native';
import Checkbox from 'expo-checkbox';
import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../GlobalData/GlobalData';

export default function FCDepTypeList() {

    //-----------------------------Dep Type List------------------------------------
    const [isChecked, setChecked] = useState(true);
    const { DepTypes, setDepTypes } = useContext(GlobalContext);

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

    const handleChange = (name) => {
        let temp = DepTypes.map((DepType) => {
            if (name === DepType.name) {
                return { ...DepType, isChecked: !DepType.isChecked };
            }
            return DepType;
        });
        setDepTypes(temp);
    };

    /*let selected = DepTypes.filter((DepType) => DepType.isChecked); */

    return (
        <View>
            <View style={styles.row}>
                <Checkbox style={styles.CB} color={isChecked ? '#003D9A' : undefined} value={isChecked} onValueChange={setChecked} />
                <Text style={styles.CB_txt}>שלח לכל המחלקות</Text>
            </View >
            {!isChecked && <FlatList 
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
        alignItems: 'center',
        paddingHorizontal: 10,
        margin: 5,
    },
    CB: {
        marginRight: 10,
    },
    CB_txt: {
        fontSize: 16,
    },
});