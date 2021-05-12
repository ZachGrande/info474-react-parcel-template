import React from 'react';
import { useFetch } from "./hooks/useFetch";
import { useJson } from "./hooks/useJson";
import { geoPath, geoAlbersUsa } from 'd3-geo';
import * as topojson from "topojson-client";
import world from "./cb_2015_us_state_20m.json";
import { extent } from "d3-array";
import { scaleLinear } from "d3-scale";
import {
    ComposableMap,
    Geographies,
    Geography,
    ZoomableGroup
} from "react-simple-maps"

/*
* The skeleton for the map was implemented using the documentation for react-simple-maps
* https://github.com/zcreativelabs/react-simple-maps
*/

function Assignment2() {

    const [data, loading] = useFetch(
        "https://raw.githubusercontent.com/ZachGrande/info474-react-parcel-template/master/avocado-2020-joined-city-only.csv"
    );
    
    return (
        <div>
            <h1>Assignment 3: Interactive Data Visualization</h1>
            <h3>Zach Grande, Alycia Nguyen, Michelle Ponting, Darren Ma, Erik Thomas-Hommer</h3>
        <p>{loading && "Loading data!"}</p>
        <ComposableMap>
            <ZoomableGroup zoom={1}>
                <Geographies geography={world}>
                    {({geographies}) => 
                      geographies.map(geo =>
                        <Geography key={geo.rsmKey} geography={geo} />
            )}
                </Geographies>
            </ZoomableGroup>
        </ComposableMap>
            
    </div>
    )
        }
        
        export default Assignment2;