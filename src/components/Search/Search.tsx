import Select from 'react-select';
import localesArchive from '../../data/localidades.json';
import { debounce, } from 'lodash';
import { formatString } from '../../Utils/format';
import { useEffect, useState } from 'react';
import { Container } from './styles';
import { Cities, CitiesSelect } from '../../types/searchTypes';

interface SearchData {
    setCityCode: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export function Search({ setCityCode }: SearchData) {
    const [inputText, setInputText] = useState("");
    const [cities, setCities] = useState<CitiesSelect[] | []>([]);
    const locales = (localesArchive as Array<Cities>);

    //Added debounce to wait the user to finish search
    const search = debounce(e => {
        const formattedString = formatString(e);
        setInputText(formattedString);
    }, 500);

    //Return cities
    function returnCities(cities: Cities[]) {
        const objectCities: CitiesSelect[] = [];

        cities.map(city => {
            const cityName = formatString(city.label)
            if (cityName.indexOf(inputText) > -1)
                objectCities.push({
                    value: city.value,
                    label: `${city.label} - ${city.country}`
                });
            return objectCities;
        })

        setCities(objectCities);
    }

    useEffect(() => {
        if (inputText.length > 0) {
            returnCities(locales);
        }
    }, [inputText]);

    return (
        <Container>
            <Select
                placeholder="Selecione uma localidade..."
                options={cities}
                onInputChange={search}
                id="select-city"
                onChange={(evento) => setCityCode(evento?.value)}
            />
        </Container>
    )
}