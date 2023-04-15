import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';

import { GlobalContext } from '../GlobalData/GlobalData';
import FCOthersRequests from '../FunctionalComps/FCOthersRequests';

export default function OthersRequestsPage(props) {

    const { apiUrlMedRequest, depId, othersMedReqs, setOthersMedReqs } = useContext(GlobalContext);
    const [isStatusChanged, setIsStatusChanged] = useState(false);

    //----------------------GET Requests details ---------------------
    useEffect(() => {
        fetch(apiUrlMedRequest + 'RequestsOthers/' + `${depId}`, {
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
                    let newArray = result.filter((item) => item.aDep === depId || item.aDep === 0);
                    setOthersMedReqs(newArray); //set the requests from the choosen dep to display
                    if (isStatusChanged) {
                        setIsStatusChanged(false);
                    }
                },
                (error) => {
                    console.log("err Get=", error);
                });
    }, [isStatusChanged])//component did update

    return (
        <View style={styles.container}>
            <ScrollView>
                <FCOthersRequests RequestsList={othersMedReqs} handleIsStatusChanged={() => setIsStatusChanged(true)} cDepId={depId} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 25,
        textAlign: 'center',
        marginBottom: 15,
        color: '#003D9A',
        marginTop: 0,
    },
});
