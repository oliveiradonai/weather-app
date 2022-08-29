import axios from "axios";
import { useEffect, useState } from "react";

export function useFetch<T = unknown>(url: string | undefined) {
    const apiSecret = process.env.REACT_APP_API_SECRET;

    const [data, setData] = useState<T>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        setLoading(true);
        axios.get(`${url}&appid=${apiSecret}`)
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [apiSecret, url]);

    return { data, loading, error };
}