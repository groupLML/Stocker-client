import React, { createContext, useState } from 'react';

export const GlobalContext = createContext()

export default function GlobalData(props) {

    const [User, setUser] = useState([])

    const [DepTypes, setDepTypes] = useState([
        { name: 'אורתופדיה', isChecked: false },
        { name: 'כירורגיה', isChecked: false },
        { name: 'פנימית', isChecked: false },
    ]);

    const apiUrlUser = "https://proj.ruppin.ac.il/cgroup36/prod/api/User/";
    const apiUrlMedRequest = "https://proj.ruppin.ac.il/cgroup36/prod/api/MedRequest/";
    
    return (
        <GlobalContext.Provider
            value={{ User, apiUrlUser, setUser, apiUrlMedRequest, DepTypes, setDepTypes }}>
            {props.children}
        </GlobalContext.Provider>
    )
}