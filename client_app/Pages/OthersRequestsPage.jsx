import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';

import { GlobalContext } from '../GlobalData/GlobalData';
import FCOthersRequests from '../FunctionalComps/FCOthersRequests';
import FCSearchBar from '../FunctionalComps/FCSearchBar ';

export default function OthersRequestsPage(props) {

    const { apiUrlMedRequest, depId, othersMedReqs, setOthersMedReqs } = useContext(GlobalContext);
    const [isStatusChanged, setIsStatusChanged] = useState(false);
    const [ReqsSearch, setReqsSearch] = useState([]);

    const handleSearch = (search) => {
        if (othersMedReqs.length != 0) {
            console.log(othersMedReqs);
            const filtered = othersMedReqs.filter(item => item.medName.toLowerCase().includes(search.toLowerCase()));
            setReqsSearch(filtered);
        }
    };

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
                    setReqsSearch(newArray);
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
            <FCSearchBar handleSearch={handleSearch} />
            <View style={styles.scrollViewContainer}>
                <ScrollView>
                    <FCOthersRequests RequestsList={ReqsSearch} handleIsStatusChanged={() => setIsStatusChanged(true)} cDepId={depId} />
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollViewContainer: {
        flex: 1,
        position: 'relative',
    },
    title: {
        fontSize: 25,
        textAlign: 'center',
        marginBottom: 15,
        color: '#003D9A',
        marginTop: 0,
    },
});
