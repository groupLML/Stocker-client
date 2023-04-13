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
                    const newReqDeps = DepTypes.map((item) => ({ name: item.name, isChecked: result.includes(item.name) }))//set the requests of choosen dep to display
                    setDepTypes(newReqDeps);
                },
                (error) => {
                    console.log("err post=", error);
                });
    }, []) // did mount
    
    useEffect(() => {
        console.log(DepTypes);
    }, [DepTypes]);


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


    /* const handleChangeAll = () => { //A specific dep type checkbox is checked
        setChecked(!isChecked);
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
    }; */


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
        color: '#003D9A'
    },
});