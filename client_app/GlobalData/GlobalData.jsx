import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GlobalContext = createContext()

export default function GlobalData(props) {

    const apiUrlUser = "https://proj.ruppin.ac.il/cgroup36/prod/api/User/";
    const apiUrlMedRequest = "https://proj.ruppin.ac.il/cgroup36/prod/api/MedRequest/";
    const apiUrlMeds = "https://proj.ruppin.ac.il/cgroup36/prod/api/Medicine/";
    const apiUrlPullOrder = "https://proj.ruppin.ac.il/cgroup36/prod/api/PullOrder/";
    
    //create unique med names by chaining med string properties
    const [uniqueMedNamesWithId, setUniqueMedNamesWithId] = useState([]);        
    
    const setMedsNames =  (medsArry) => {
        setUniqueMedNamesWithId(medsArry.map((med) => ({ id: med.medId, uniqueName: `${med.genName}${med.eaQty}${med.unit}${med.given}` })));
    }

    const [isRequestUpdated, setIsRequestUpdated] = useState(false);

    const [depId, setDepId] = useState('');
    const [meds, setMeds] = useState([]);
    const [myMedReqs, setMyMedReqs] = useState([]);
    //const [othersMedReqs, setOthersMedReqs] = useState([]);

    const [DepTypes, setDepTypes] = useState([
        { name: 'אורתופדיה', isChecked: true },
        { name: 'כירורגיה', isChecked: true },
        { name: 'פנימית', isChecked: true },
    ]);

    const getUserData = async () => {
        try {
            const result = await AsyncStorage.getItem('User');
            return result != null ? JSON.parse(result) : null;
        } catch (e) {
            // handle errors here
            console.log(e);
            return null;
        }
    }

    return (
        <GlobalContext.Provider
            value={{
                apiUrlUser, apiUrlMedRequest, apiUrlMeds, apiUrlPullOrder,
                depId, setDepId, meds, setMeds,
                DepTypes, setDepTypes, myMedReqs, setMyMedReqs, //othersMedReqs, setOthersMedReqs,
                getUserData,
                isRequestUpdated, setIsRequestUpdated,
                setMedsNames, uniqueMedNamesWithId,
            }}>
            {props.children}
        </GlobalContext.Provider>
    )
}