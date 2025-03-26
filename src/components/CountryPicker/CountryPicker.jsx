import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl, Input } from '@mui/material';
import { CountriesAPI } from '../../api';
import styles from './CountryPicker.module.css';

const CountryPicker = ({ handleCountryChange, handleDateChange }) => {
  const [countries, setCountries] = useState([]);
  const [date, setDate] = useState("2021-01-01");
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
        const result = await CountriesAPI();
        setCountries(result.sort((x, y) => x.name.localeCompare(y.name)));
    };
    fetchCountries();
  }, [setCountries]);

  useEffect(() => {
      handleDateChange(date);
      //eslint-disable-next-line
  }, []);

  return (
    <div className={styles.container}>
    <FormControl className={styles.formControl}>
        <NativeSelect value={selectedCountry} onChange={(e) => {
            handleCountryChange(e.target.value);
            setSelectedCountry(e.target.value);
            }}>
            <option>US-Daily</option>
            {countries.map((object, i) => <option key={i}>{object.name}-{object.iso}</option>)}
        </NativeSelect>
    </FormControl>
    {selectedCountry !== "US-Daily" && selectedCountry !== "" && <Input placeholder="date=yyyy-mm-dd" value={date} onChange={(e) => setDate(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" ? handleDateChange(e.target.value) : null}></Input>}
    </div>
  );
};

export default CountryPicker;