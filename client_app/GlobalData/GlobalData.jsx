import React, { createContext, useState } from 'react';

export const GlobalContext = createContext()

export default function GlobalData(props) {

    const [User, setUser] = useState([])

    const apiUrlUser = "https://proj.ruppin.ac.il/cgroup36/prod/api/User/";
    const apiUrlMedRequest = "https://proj.ruppin.ac.il/cgroup36/prod/api/MedRequest/";
    
    return (
        <GlobalContext.Provider
            value={{ User, apiUrlUser, setUser, apiUrlMedRequest }}>
            {props.children}
        </GlobalContext.Provider>
    )
}