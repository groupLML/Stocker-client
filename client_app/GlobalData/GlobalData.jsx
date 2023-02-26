import React, { createContext, useState } from 'react';

export const GlobalContext = createContext()

export default function GlobalData(props) {

    const apiUrlUser = "https://proj.ruppin.ac.il/cgroup36/prod/api/User/";
    const apiUrlMedRequest = "https://proj.ruppin.ac.il/cgroup36/prod/api/MedRequest/";
    const apiUrlMeds = "https://proj.ruppin.ac.il/cgroup36/prod/api/Medicine";

    const [User, setUser] = useState([]);
    const [Meds, setMeds] = useState([]);
    const [DepTypes, setDepTypes] = useState([
        { name: 'אורתופדיה', isChecked: true },
        { name: 'כירורגיה', isChecked: true },
        { name: 'פנימית', isChecked: true },
    ]);

    //-------------------------------Get Meds-----------------------------
    fetch(apiUrlMeds, { //של השרת URL
        method: 'GET',//מה המתודה
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
                setMeds(result);
            },
            (error) => {
                console.log("err post=", error);
            });



    return (
        <GlobalContext.Provider
            value={{
                User, apiUrlUser, setUser,
                apiUrlMedRequest, DepTypes, setDepTypes, Meds}}>
            {props.children}
        </GlobalContext.Provider>
    )
}