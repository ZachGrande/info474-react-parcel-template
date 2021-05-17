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
          
          <div className="py-2">
            <h4 className="font-italic">Context</h4>
            <div>
              Avocados have certainly been trending for years now, and more trends involving avocados continue to present 
              themselves. The popularity of avocado toast in 2017 and the high consumption of avocados during the Super 
              Bowl halftime in 2019 are just a few potential contributors to the outcome of avocado sales over the years. 
              With growing popularity comes higher demand for avocados, which in turn calls for more production. Understanding 
              how the sales for avocados have changed over time will give insight into the continuing popularity as well as 
              a more detailed overview of the performance of the avocado market, which grew 104% from 2000 - 2016. 
            </div>
          </div>

          <div className="py-2">
            <h4 className="font-italic">Dataset Overview</h4>
            <div>
              The dataset utilized provides records for Hass avocado sales from 2015 - 2020 in the United States. It 
              describes the total number of avocados sold in major U.S. cities across these five years.
            </div>
          </div>
          
          <div className="py-2">
            <h4 className="font-italic">Interactions / Design Decisions Overview</h4>
            <div>
              <p>
                We decided to use an interactive map of the United States to represent our dataset. Our decision to use 
                this visualization is based on our desire to better visualize how US avocado sales change over time. 
              </p>
              <p>
                <span className="font-weight-bold">Our first interaction technique is a slider along the bottom of the map.</span> 
                This slider 
                is set on a time based scale for each year of avocado sales provided by the data. We believed this 
                was the best way to represent the data over time due to the ability to watch sales rise and fall based 
                on location over the 5 year period. 
              </p>
              <p>
                <span className="font-weight-bold">Our second interaction technique is the ability to zoom into the map and move the 
                visualization around in the zoomed view. </span>
                This allows viewers to focus on areas of the map that are important to them. It also 
                allows the ability to better view specified cities. 
              </p>
              <p>
                Our visual encoding decisions are all centered around the idea of improving readability of the map. 
                Due to the limited amount of cities in our dataset, we decided constantly showing the cities with 
                circles around them would be the best decision for our visualization. We decided to use circles at the 
                location of a city, which vary in size to distinguish which cities have had the most sales in avocados 
                (larger circles indicate more sales in a city). We chose to use red as the color marking with an adjusted 
                opacity because it is clear over the grey map.
              </p>
              <p>
                One of our initial ideas for our visualization was to use a drop down menu to change the visual encoding 
                of the sale-based circles around the cities. Ultimately, we decided against this decision because we 
                realized a size encoding for each city was enough. Viewers would not gain a better understanding of 
                avocado sales from changing color or density due to the limited number of cities provided in the dataset. 
              </p>
            </div>
          </div>

          <div className="py-2">
            <h4 className="font-italic">Development Process</h4>
            <div>
              <p>
                Considering our development process, we first began with cleaning up our data. Doing so, we excluded data 
                that was representative of an entire state or region, as those are just aggregate values. The data cleaning 
                process involved creating a dataset with location data with columns for city names (geography), 
                latitude, longitude and a state ID (indicating what state this city is located in). This location 
                dataset was then joined with the main avocado dataset for usage in our visualization. Next, we set up the 
                static map. We utilized a map of the world, and set it to only display the United States, since our data 
                only consists of US data, by confining the area. The process of choosing the method to display the map was 
                a bit time-consuming, as we researched multiple methods, but ultimately decided to use the one presented in 
                class as it seemed most appropriate for adding interactivity. From here, we ensured that data points could 
                show up at different locations on the map.
              </p>
              <p>
                After the map was set up showing sales data, work was split up for implementing our interactions. 
                For the varying sizes of data points, time was spent to ensure that the location is seen through the 
                circle markings, especially when the markings were larger. Next, attention was given to the zoom 
                interaction. Arrow and plus and minus buttons were implemented to allow users to navigate to and get 
                a closer look at different areas of the map. Lastly, the slider was implemented, and this took the 
                most amount of time.
              </p>
              <span className="font-italic">Total Time Spent: 10hrs</span>
            </div>
          </div>

          <div className="py-2">
            <h4 className="font-italic">Roles</h4>
            <div>
              <ul>
                <li>
                  <span className="font-weight-bold">Zach: </span> 
                  Initial map set-up, got data points to display, mark encodings with varying size and opacity
                </li>
                <li>
                  <span className="font-weight-bold">Alycia 
                    <span className="font-italic"> (is concussed)</span>: 
                  </span> 
                  found data set, cleaned up data set, final write up
                </li>
                <li>
                  <span className="font-weight-bold">Michelle: </span> 
                  cleaned up data set, final write up
                </li>
                <li>
                  <span className="font-weight-bold">Darren: </span> 
                  instructions and visualization key
                </li>
                <li>
                  <span className="font-weight-bold">Erik: </span> 
                  zoom interaction, slider interaction
                </li>
              </ul>
            </div>
          </div>

          <div className="py-2">
            <h4 className="font-italic">Resources</h4>
            <div>
              <ul>
                <li>
                  <a href="https://www.kaggle.com/timmate/avocado-prices-2020" target="blank">Original Data Source</a>
                </li>
                <li>
                  <a href="https://www.inspirafarms.com/avocado-market-trends-hitting-2020/" target="blank">Context Research Source</a>
                </li>
                <li>
                  <a href="https://www.tutorialspoint.com/d3js/d3js_introduction_to_svg.htm" target="blank">D3 documentation</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
    )
}

export default Assignment3;
