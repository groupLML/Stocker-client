import React, { createContext, useState, useEffect } from 'react';

export const GlobalContext = createContext()

export default function GlobalData(props) {

    const apiUrlUser = "https://proj.ruppin.ac.il/cgroup36/prod/api/User/";
    const apiUrlMedRequest = "https://proj.ruppin.ac.il/cgroup36/prod/api/MedRequest/";
    const apiUrlMeds = "https://proj.ruppin.ac.il/cgroup36/prod/api/Medicine/";
    const apiUrlDeps = "https://proj.ruppin.ac.il/cgroup36/prod/api/Department/"; 

    const [User, setUser] = useState([]);
    const [meds, setMeds] = useState([]);
    const [Deps, setDeps] = useState([]);
    const [medReqs, setMedReqs] = useState([]);

    const [DepTypes, setDepTypes] = useState([
        { name: 'אורתופדיה', isChecked: true },
        { name: 'כירורגיה', isChecked: true },
        { name: 'פנימית', isChecked: true },
    ]);
    
    return (
        <GlobalContext.Provider
            value={{
                apiUrlUser, apiUrlMedRequest, apiUrlMeds, apiUrlDeps,
                User, setUser, Deps, setDeps, DepTypes, setDepTypes, meds, setMeds, medReqs, setMedReqs }}>
            {props.children}
        </GlobalContext.Provider>
    )
}