import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GlobalContext = createContext()

export default function GlobalData(props) {

    const apiUrlUser = "https://proj.ruppin.ac.il/cgroup36/prod/api/User/";
    const apiUrlMedRequest = "https://proj.ruppin.ac.il/cgroup36/prod/api/MedRequest/";
    const apiUrlMeds = "https://proj.ruppin.ac.il/cgroup36/prod/api/Medicine/";
    //const apiUrlDeps = "https://proj.ruppin.ac.il/cgroup36/prod/api/Department/";
    const apiUrlPullOrder = "https://proj.ruppin.ac.il/cgroup36/prod/api/PullOrder/";


    /* const apiUrlUser = "https://localhost:7102/api/User/";
    const apiUrlMedRequest = "https://localhost:7102/api/MedRequest/";
    const apiUrlMeds = "https://localhost:7102/api/Medicine/";
    const apiUrlDeps = "https://localhost:7102/api/Department/";
    const apiUrlPullOrder = "https://proj.ruppin.ac.il/cgroup36/prod/api/PullOrder/"; */


    const [isRequestUpdated, setIsRequestUpdated] = useState(false);

    // const [User, setUser] = useState([]);
    const [depId, setDepId] = useState('');

    const [meds, setMeds] = useState([]);
    //const [deps, setDeps] = useState([]);
    const [medReqs, setMedReqs] = useState([]);

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
                DepTypes, setDepTypes, medReqs, setMedReqs,
                getUserData,
                isRequestUpdated, setIsRequestUpdated
            }}>
            {props.children}
        </GlobalContext.Provider>
    )
}