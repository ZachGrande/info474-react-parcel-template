import React from 'react';
import { VegaLite } from 'react-vega';
import { useFetch } from "./hooks/useFetch";

function Assignment2() {

    const [data, loading] = useFetch(
        "https://raw.githubusercontent.com/ZachGrande/info474-react-parcel-template/master/disney_movies.csv"
    );

    return (
        <div>
            <p>Assignment 3 starter</p>
        </div>
    )
}

export default Assignment2;