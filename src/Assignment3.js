import React from 'react';
import { useFetch } from "./hooks/useFetch";
import { useJson } from "./hooks/useJson";
import { geoPath, geoAlbersUsa } from 'd3-geo';
import * as topojson from "topojson-client";
import world from "./land-50m";
import { extent } from "d3-array";
import { scaleLinear } from "d3-scale";
import {
    ComposableMap,
    Geographies,
    Geography,
} from "react-simple-maps"

/*
* The skeleton for the map was implemented using the documentation for D3's Bubble Map
* https://observablehq.com/@d3/bubble-map
*/

function Assignment3() {
    
    const [data, loading] = useFetch(
        "https://raw.githubusercontent.com/ZachGrande/info474-react-parcel-template/master/avocado-2020-joined-city-only.csv"
    );
        
    return (
            
        <div>
            <h1>Assignment 3: Interactive Data Visualization</h1>
            <h3>Zach Grande, Alycia Nguyen, Michelle Ponting, Darren Ma, Erik Thomas-Hommer</h3>
            <p>{loading && "Loading data!"}</p>
            <ComposableMap>
            <Geographies geography={world}>
            {({geographies}) => geographies.map(geo =>
                <Geography key={geo.rsmKey} geography={geo} />
                )}
                </Geographies>
                </ComposableMap>
        </div>
    )
}
            
export default Assignment3;