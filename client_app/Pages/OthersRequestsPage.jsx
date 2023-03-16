import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';

import FCRequests from '../FunctionalComps/FCRequests';
import { GlobalContext } from '../GlobalData/GlobalData';

export default function OthersRequestsPage() {

    const { apiUrlMedRequest, depId, othersMedReqs, setOthersMedReqs } = useContext(GlobalContext);

    const [requests, setRequests] = useState([]);

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
                    setRequests(result); //set the requests from the choosen dep to display
                },
                (error) => {
                    console.log("err post=", error);
                });
    }, [depId])//component did update

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>צפייה בבקשות המחלקה</Text>
                <FCRequests RequestsList={requests} isDetailedRequest={false} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#003D9A',
        marginTop: 30,
    },
});
