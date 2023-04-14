import { View, Text, StyleSheet, FlatList } from 'react-native';
import Checkbox from 'expo-checkbox';
import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../GlobalData/GlobalData';

export default function FCDepTypeList(props) {

    //-----------------------------Dep Type List------------------------------------
    const [isChecked, setChecked] = useState(null); //Send to all deps checkBox status (init value is checked)
    const { depId, apiUrlMedRequest, DepTypes, setDepTypes } = useContext(GlobalContext);

    //----------------------GET Request deps ---------------------------------------
    useEffect(() => {
        if (props.ReqId !== null) {
            fetch(apiUrlMedRequest + 'RequestDepTypes/depId/' + `${depId}` + '/reqId/' + `${props.ReqId}`, {
                method: 'GET',
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
                        const newReqDeps = DepTypes.map((item) => ({ name: item.name, isChecked: Array.isArray(result) && result.includes(item.name) }))
                        setDepTypes(newReqDeps);
                    },
                    (error) => {
                        console.log("err post=", error);
                    });
        }
        else {
            setChecked(true);
        }
    }, []) // did mount

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

    useEffect(() => {
        console.log(DepTypes);
        if (DepTypes.every((item) => item.isChecked === true)) {
            setChecked(true);
        }
    }, [DepTypes]);


    return (
        <View>
            <View style={styles.row}>
                <Checkbox style={styles.CB} color={isChecked ? '#003D9A' : undefined} value={isChecked} onValueChange={setChecked} />
                <Text style={styles.CB_txt}>שלח לכל המחלקות</Text>
            </View >
            <View style={styles.depsCB}>
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
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    CB: {
        marginRight: 5,
    },
    AllRow: {
        flexDirection: 'row',
    },
    CB_txt: {
        fontSize: 16,
        color: '#003D9A'
    },
    depsCB: {
        marginLeft: 25,
        marginTop: 10,
    },

});