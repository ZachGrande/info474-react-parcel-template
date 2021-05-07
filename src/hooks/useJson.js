import { json } from "d3-fetch";
import { useState, useEffect } from "react";
const useJson = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    async function fetchUrl() {
        const response = await json(url);
        setData(response);
        setLoading(false);
    }
    useEffect(() => {
        fetchUrl();
    }, []);
    return [data, loading];
};
export { useJson };