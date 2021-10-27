import React, { useState, createContext, useEffect } from 'react';

const AppContext = createContext();
const { Provider } = AppContext;

const AppProvider = ({ children }) => {
    const [citiesAndStreets, setCitiesAndStreets] = useState();
    const [donationsList, setDonationsList] = useState();
    const [formValue, setFormValue] = useState();

    const updateDonation = () => {
       var method = "POST";
       var link ="/api/Donations/"; 

        if(formValue.id != null){
            method ="PUT";
            link= link+ formValue.id;
        }
        const requestOptions = {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formValue)
        };
        fetch(link, requestOptions)
            .then(
                res => {
                    if (res.ok === true) {
                        return res.json()
                    }
                    throw new Error(res.status);
                })
            .then(body => {
                if (body === true) {
                    setFormValue(null);
                    getDonationList();
                }
            }).catch(error => {
                console.error(`Fetch opartation failed, Status: ${error}`);
            });
    }

    const deleteDonation = (id) => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(`/api/Donations/${id}`, requestOptions)
            .then(
                res => {
                    if (res.ok === true) {
                        return res.json()
                    }
                    throw new Error(res.status);
                })
            .then(body => {
                if (body === true) {
                    if(formValue != null && formValue.id != id ){
                    setFormValue(null);
                    }
                    getDonationList();
                }
            }).catch(error => {
                console.error(`Fetch opartation failed, Status: ${error}`);
            });
    }

    const getDonationList = () => {
        fetch(`/api/donations`)
            .then(res => res.json())
            .then(body => setDonationsList(body));
    }

    useEffect(() => {
        // fetch(`${environmentLink}/mosl/leads/getCitiesAndStreets`)
        //     .then(res => res.json())
        //     .then(body => setCitiesAndStreets(body));
        getDonationList();
        //fetch("/static/mosl/stores/addresses.json")
        //    .then(res => res.json())
        //    .then(function (body) {
        //        setCitiesAndStreets(body)
        //    });
    }, [])

    const state = {
        formValue,
        citiesAndStreets,
        donationsList
    };

    const actions = {
        setFormValue,
        setCitiesAndStreets,
        // setDonationsList,
        updateDonation,
        deleteDonation
    };

    return (
        <Provider value={{ ...state, ...actions }}>
            {children}
        </Provider>
    )
}

export {
    AppContext,
    AppProvider
}
