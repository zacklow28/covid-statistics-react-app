import { useState, useEffect } from 'react';

const API_URL = process.env.REACT_APP_API_URL;
const API_URL_US_DAILY = process.env.REACT_APP_API_URL_DAILY;
const API_URL_COUNTRIES = process.env.REACT_APP_API_URL_COUNTRIES;

export const API = ({ date, countryCode, onFetchData }) => {
    const [covidData, setCovidData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (countryCode === "Daily" || countryCode === "") {
                const response = await fetch(API_URL_US_DAILY);
                const data = await response.json();
                if (data) {
                    const first = data[0];
                    //since keys not the same, have to specify
                    setCovidData({last_update: first.dateChecked, confirmed: first.positive,
                        deaths: first.death, active: first.hospitalized});
                }
                return;
            }
            const response = await fetch(`${API_URL}date=${date}&iso=${countryCode}`);
            const data = await response.json();
            //destructure only when there is data
            if (data?.data) {
                const { last_update, confirmed, deaths, active } = data.data;
                //keys the same
                setCovidData({ last_update, confirmed, deaths, active });
            }
        }
        fetchData();
    }, [date, countryCode]);

    useEffect(() => {
        //since object not array, we do null check instead of length
        if (covidData != null) {
            onFetchData(covidData);
        }
    }, [covidData, onFetchData]);
};

export const DailyAPI = async () => {
    try {
        const response = await fetch(API_URL_US_DAILY);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("error fetching daily data");
    }
};

export const CountriesAPI = async () => {
    try {
        const response = await fetch(API_URL_COUNTRIES);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.log("error fetching countries");
    }
}