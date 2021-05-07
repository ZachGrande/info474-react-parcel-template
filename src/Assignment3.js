import React from 'react';
import { useFetch } from "./hooks/useFetch";
import { geoPath, geoAlbersUsa } from 'd3-geo';
import { feature } from "topojson-client";

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