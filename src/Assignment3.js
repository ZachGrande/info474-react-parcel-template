import React, {useEffect, useState} from 'react';
import { useFetch } from "./hooks/useFetch";
import { useJson } from "./hooks/useJson";
import { geoPath, geoAlbersUsa } from 'd3-geo';
import { AiFillPlusCircle, AiFillMinusCircle, AiFillCaretLeft, AiFillCaretDown, AiFillCaretUp, AiFillCaretRight } from "react-icons/ai";
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

    // Colin's starter code to render world map
    const land = topojson.feature(world, world.objects.land);
    const projection = d3.geoNaturalEarth1();
    const path = d3.geoPath(projection);
    const mapPathString = path(land);
    const radius = d3.scaleSqrt([0, d3.max(data, d => d.total_volume)], [0, 40]);
    const max_height = 25;
    const max_width = 300;
    const max_x = 90;
    const max_y = 100

    const [width, setWidth] = useState(300)
    const [height, setHeight] = useState(25)
    const [x, setX] = useState(90);
    const [y, setY] = useState(100);


    return (

        <div>
            <h1>Assignment 3: Interactive Data Visualization</h1>
            <h3>Zach Grande, Alycia Nguyen, Michelle Ponting, Darren Ma, Erik Thomas-Hommer</h3>
            <p>{loading && "Loading data!"}</p>

            {/* <svg style={{
                width: '80vw',
                height: '90vh'
              }} id="map"/> */}
            <div className='d-flex justify-content-around align-items-center' style={{
                width: '5vw'
              }}>
              <AiFillPlusCircle onClick={() => {
                  setWidth(width - 20)
                  setHeight(height - 3)
                }}/>
              <AiFillMinusCircle onClick={() => {
                  setWidth(width >= max_width ? max_width : width + 20)
                  setHeight(height >= max_height ? max_height : height + 3)
                }}/>
            </div>
            <div className='d-flex flex-column  align-items-center' style={{
                width: '5vw'
              }}>
              <AiFillCaretUp onClick={() => {
                    setY(y - 5)
                  }}/>
                <div className='d-flex flex-row justify-content-between align-items-center' style={{
                    width: '100%'
                  }}>
                  <AiFillCaretLeft onClick={() => {
                        setX(x - 10)
                      }}/>
                  <AiFillCaretRight onClick={() => {
                        setX(x + 10)
                      }}/>
                </div>
                <AiFillCaretDown onClick={() => {
                      setY(y + 5)
                    }}/>
            </div>

              <svg id="map" width={1000} height={600} style={{ border: "1px solid black" }} viewBox={`${x} ${y} ${width} ${height}`}>
                <path d={mapPathString} fill="rgb(200, 200, 200)" />
                {data.map((measurement) => {
                    return (
                        <circle
                            transform={`translate(
                            ${projection([measurement.longitude, measurement.latitude])})`}
                            r={measurement.total_volume / 1000000}
                            opacity="0.1"
                            fill="#Dd3815"
                            stroke="8E2914"
                            stroke-width="0.1"
                        />
                    );
                })}
            </svg>
        </div>
    )
}

export default Assignment3;
