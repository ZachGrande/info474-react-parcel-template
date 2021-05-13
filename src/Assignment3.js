import React from 'react';
import { useFetch } from "./hooks/useFetch";
import { useJson } from "./hooks/useJson";
import { geoPath, geoAlbersUsa } from 'd3-geo';
import * as topojson from "topojson-client";
import world from "./land-50m";
import { extent } from "d3-array";
import { scaleLinear } from "d3-scale";
// import {
//     ComposableMap,
//     Geographies,
//     Geography,
// } from "react-simple-maps"

/*
* The skeleton for the map was implemented using the documentation for react-simple-maps
* https://github.com/zcreativelabs/react-simple-maps
*/

function Assignment3() {

    const [data, loading] = useFetch(
        "https://raw.githubusercontent.com/ZachGrande/info474-react-parcel-template/master/avocado-2020-joined-city-only.csv"
    );

    const chart = function() {

        const svg = d3.create("svg")
            .attr("viewBox", [0, 0, 975, 610]);
        
        svg.append("path")
            .datum(topojson.feature(us, us.objects.nation))
            .attr("fill", "#ddd")
            .attr("d", path);
        
        svg.append("path")
            .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
            .attr("fill", "none")
            .attr("stroke", "white")
            .attr("stroke-linejoin", "round")
            .attr("d", path);
        
        const legend = svg.append("g")
            .attr("fill", "#777")
            .attr("transform", "translate(915,608)")
            .attr("text-anchor", "middle")
            .style("font", "10px sans-serif")
            .selectAll("g")
            .data(radius.ticks(4).slice(1))
            .join("g");
        
        legend.append("circle")
            .attr("fill", "none")
            .attr("stroke", "#ccc")
            .attr("cy", d => -radius(d))
            .attr("r", radius);
        
        legend.append("text")
            .attr("y", d => -2 * radius(d))
            .attr("dy", "1.3em")
            .text(radius.tickFormat(4, "s"));
        
        svg.append("g")
            .attr("fill", "brown")
            .attr("fill-opacity", 0.5)
            .attr("stroke", "#fff")
            .attr("stroke-width", 0.5)
            .selectAll("circle")
            .data(data
                .filter(d => d.position)
                .sort((a, b) => d3.descending(a.value, b.value)))
                .join("circle")
                .attr("transform", d => `translate(${d.position})`)
                .attr("r", d => radius(d.value))
                .append("title")
                .text(d => `${d.title}
                    ${format(d.value)}`);
        
            return svg.node();
    };
        
    return (
            
        <div>
            <h1>Assignment 3: Interactive Data Visualization</h1>
            <h3>Zach Grande, Alycia Nguyen, Michelle Ponting, Darren Ma, Erik Thomas-Hommer</h3>
            <p>{loading && "Loading data!"}</p>

            {chart}

            {/* <svg width={1000} height={600} style={{ border: "1px solid black" }}>

            </svg> */}

            {/* <ComposableMap>
                <Geographies geography={world}>
                    {({geographies}) => geographies.map(geo =>
                        <Geography key={geo.rsmKey} geography={geo} />
                    )}
                </Geographies>
            </ComposableMap> */}
        </div>
    )
}
            
export default Assignment3;