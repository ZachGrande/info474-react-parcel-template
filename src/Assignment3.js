import React from 'react';
import { useFetch } from "./hooks/useFetch";
import { useJson } from "./hooks/useJson";
import { geoPath, geoAlbersUsa } from 'd3-geo';
import * as topojson from "topojson-client";
//import us from './cb_2015_us_state_20m.js';
import * as us from "./states-albers-10m.json";
import world from "./land-50m";
import { extent } from "d3-array";
import { scaleLinear } from "d3-scale";

/*
* The skeleton for the map was implemented using the documentation for D3's Bubble Map
* https://observablehq.com/@d3/bubble-map
*/

function Assignment3() {

    const [data, loading] = useFetch(
        "https://raw.githubusercontent.com/ZachGrande/info474-react-parcel-template/master/avocado-2020-joined-city-only.csv"
    );

    const chart = function() {

        const svg = d3.select("#map");

        // This path variable works when building the map
        const path = d3.geoPath();

        // This construction of projection/path can translate the coordinates, but not render the map
        // const projection = d3.geoNaturalEarth1();
        // const path = d3.geoPath(projection);


        const radius = d3.scaleSqrt([0, d3.max(data, d => d.total_volume)], [0, 40]); // altered line, was d.value

        // Draw US outline
        svg.append("path")
            .datum(topojson.feature(us, us.objects.nation))
            .attr("fill", "#ddd")
            .attr("d", path);

        // Draw states outline
        svg.append("path")
            .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
            .attr("fill", "none")
            .attr("stroke", "white")
            .attr("stroke-linejoin", "round")
            .attr("d", path);

        // Create legend
        const legend = svg.append("g")
            .attr("fill", "#777")
            .attr("transform", "translate(915,608)")
            .attr("text-anchor", "middle")
            .style("font", "10px sans-serif")
            .selectAll("g")
            .data(radius.ticks(4).slice(1))
            .join("g");

        // Add cirlces to legend
        legend.append("circle")
            .attr("fill", "none")
            .attr("stroke", "#ccc")
            .attr("cy", d => -radius(d))
            .attr("r", radius);

        // Add text to legend
        legend.append("text")
            .attr("y", d => -2 * radius(d))
            .attr("dy", "1.3em")
            .text(radius.tickFormat(4, "s"));

        // Draw circles on map
        svg.append("g")
            .attr("fill", "brown")
            .attr("fill-opacity", 0.5)
            .attr("stroke", "#fff")
            .attr("stroke-width", 0.5)
            .selectAll("circle")
            .data(data
                .filter(d => d.latitude)
                .sort((a, b) => d3.descending(a.total_volume, b.total_volume))) // altered line, was a/b.value
                .join("circle")
                .attr("transform", d => `translate(${+d.latitude},${+d.longitude})`) // altered line, was d.position
                // .attr("transform", d=>`translate(
                    // ${projection([d.longitude, d.latitude])})`)
                .attr("r", d => radius(d.total_volume)) // altered line: .attr("r", d => radius(d.value))
                .append("title")
                // .text(d => `${d.city}
                    // ${format(d.total_volume)}`); // altered line: ${format(d.value)}`);, also d.title above
    };
    chart()
    return (

        <div>
            <h1>Assignment 3: Interactive Data Visualization</h1>
            <h3>Zach Grande, Alycia Nguyen, Michelle Ponting, Darren Ma, Erik Thomas-Hommer</h3>
            <p>{loading && "Loading data!"}</p>

            <svg style={{
                width: '80vw',
                height: '90vh'
              }} id="map"/>
        </div>
    )
}

export default Assignment3;
