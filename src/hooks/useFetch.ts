import axios from "axios";
import { useEffect, useState } from "react";
import { ApiWeatherData } from "../types/weatherTypes";

interface UseFetchData {
    cityCode: number | undefined;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useFetch ({ cityCode, setLoading }: UseFetchData) {
    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    const apiSecret = process.env.REACT_APP_API_SECRET;
    const url = `${baseUrl}/?id=${cityCode}&units=metric&lang=pt_br`

    const [data, setData] = useState<ApiWeatherData>();

    useEffect(() => {
        setLoading(true);
        axios.get(`${url}&appid=${apiSecret}`)
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
            });
    }, [url]);

    return data;
}