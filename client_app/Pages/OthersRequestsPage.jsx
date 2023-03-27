import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';

import { GlobalContext } from '../GlobalData/GlobalData';
import FCOthersRequests from '../FunctionalComps/FCOthersRequests';

export default function OthersRequestsPage() {

    const { apiUrlMedRequest, depId, othersMedReqs, setOthersMedReqs } = useContext(GlobalContext);

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
                    setOthersMedReqs(result); //set the requests from the choosen dep to display
                },
                (error) => {
                    console.log("err post=", error);
                });
    }, [depId])//component did update

    return (
        <View style={styles.container}>
            <ScrollView>
                <FCOthersRequests RequestsList={othersMedReqs} />
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
