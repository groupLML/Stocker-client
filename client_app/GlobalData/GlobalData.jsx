import React, { createContext, useState } from 'react';

export const GlobalContext = createContext()


export default function GlobalData(props) {

    const [User, setUser] = useState([])

    const apiUrlUser = "https://localhost:7102/api/User/";


    return (
        <GlobalContext.Provider
        value={{ User, apiUrlUser, setUser }}>
            {props.children}
        </GlobalContext.Provider>
    )
}