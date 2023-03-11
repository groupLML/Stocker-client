import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GlobalContext = createContext()

export default function GlobalData(props) {

    const apiUrlUser = "https://proj.ruppin.ac.il/cgroup36/prod/api/User/";
    const apiUrlMedRequest = "https://proj.ruppin.ac.il/cgroup36/prod/api/MedRequest/";
    const apiUrlMeds = "https://proj.ruppin.ac.il/cgroup36/prod/api/Medicine/";
    const apiUrlDeps = "https://proj.ruppin.ac.il/cgroup36/prod/api/Department/";
    const apiUrlPullOrder = "https://proj.ruppin.ac.il/cgroup36/prod/api/PullOrder/";


/*     const apiUrlUser = "https://localhost:7102/api/User/";
    const apiUrlMedRequest = "https://localhost:7102/api/MedRequest/";
    const apiUrlMeds = "https://localhost:7102/api/Medicine/";
    const apiUrlDeps = "https://localhost:7102/api/Department/";
    const apiUrlPullOrder = "https://proj.ruppin.ac.il/cgroup36/prod/api/PullOrder/"; */

    const [User, setUser] = useState([]);
    const [depId, setDepId] = useState('');

    const [meds, setMeds] = useState([]);
    const [deps, setDeps] = useState([]);
    const [medReqs, setMedReqs] = useState([]);

    const [DepTypes, setDepTypes] = useState([
        { name: 'אורתופדיה', isChecked: true },
        { name: 'כירורגיה', isChecked: true },
        { name: 'פנימית', isChecked: true },
    ]);

    const getUserData = () => {
        try {//Retrieving AsyncStorage data
            AsyncStorage.getItem('User', (err, result) => {
                return result != null ? JSON.parse(result) : null;
            })
        } catch (e) {
            // error reading value
        }
    }

    return (
        <GlobalContext.Provider
            value={{
                apiUrlUser, apiUrlMedRequest, apiUrlMeds, apiUrlDeps, apiUrlPullOrder,
                User, setUser, depId, setDepId, deps, setDeps, meds, setMeds,
                DepTypes, setDepTypes, medReqs, setMedReqs,
                getUserData
            }}>
            {props.children}
        </GlobalContext.Provider>
    )
}