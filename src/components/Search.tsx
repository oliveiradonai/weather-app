import styles from '../styles/search.module.scss';
import Select from 'react-select';
import locales from '../data/localidades.json';
import { debounce, } from 'lodash';
import { formatString } from '../Utils/format';
import { SetStateAction, useEffect, useState } from 'react';

export function Search(props: any) {
    const [inputText, setInputText] = useState(null);
    const [cities, setCities] = useState();

    //Added debounce to wait the user to finish search
    const search = debounce(e => {
        const formatedString = formatString(e);
        setInputText(formatedString);
    }, 500);

    //Return cities
    function returnCities() {
        const objectCities = [];

        locales.find(city => {
            const cityName = formatString(city.label)
            if (cityName.indexOf(inputText) > -1)
                objectCities.push({
                    value: city.value,
                    label: `${city.label} - ${city.country}`
                })
        })
        setCities(objectCities);
    }

    useEffect(() => {
        if (inputText)
            returnCities();
    }, [inputText]);

    return (
        <>
            <div className={styles.searchLocation}>
                <Select placeholder="Selecione uma localidade..." options={cities} onInputChange={search} id="select-city" onChange={(evento) => apiCall(evento.value)} />
            </div>
        </>
    )
}