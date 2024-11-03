import React, { useEffect, useState } from 'react';
import { useFetch } from "./hooks/useFetch";
import { AiFillPlusCircle, AiFillMinusCircle, AiFillCaretLeft, AiFillCaretDown, AiFillCaretUp, AiFillCaretRight } from "react-icons/ai";
import * as topojson from "topojson-client";
import world from "./land-50m";
import Slider from 'react-rangeslider'
import "react-rangeslider/lib/index.css";
import "./A4styling2.css";
import Toggle from 'react-toggle'

import "react-toggle/style.css"

/*
* The skeleton for the map was implemented using the documentation for D3's Bubble Map
* https://observablehq.com/@d3/bubble-map
*/

function Assignment4() {

  const [data, loading] = useFetch(
    "https://raw.githubusercontent.com/ZachGrande/info474-react-parcel-template/master/avocado-2020-joined-city-only.csv"
  );

  const [avo_agg_data, loading2] = useFetch(
    "https://raw.githubusercontent.com/ZachGrande/info474-react-parcel-template/sizeChange/aggregated-avocado-2020.csv"
  );

  // Colin's starter code to render world map
  const land = topojson.feature(world, world.objects.land);
  const projection = d3.geoNaturalEarth1();
  const path = d3.geoPath(projection);
  const mapPathString = path(land);
  const max_height = 25;
  const max_width = 300;
  const min_height = 1;
  const min_width = 1;
  const x_d3_scale = d3.scaleLinear()
  const y_d3_scale = d3.scaleLinear()

  const [width, setWidth] = useState(160)
  const [height, setHeight] = useState(4)
  const [x, setX] = useState(160);
  const [y, setY] = useState(135);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(2015)
  const [selectedSize, setSelectedSize] = useState("total_volume")
  const [groupedData, setGroupedData] = useState([]);
  const [spark, setSpark] = useState(false); // was set to true

  useEffect(() => {
    if (avo_agg_data) {
      getYears()
    }
    if (data) {
      getGroupedData()
    }
  }, [avo_agg_data, data, selectedSize])

  const getYears = async () => {
    var _years = [];
    await avo_agg_data.forEach((item, i) => {
      const year = parseInt(item.year);
      if (_years.indexOf(year) == -1) {
        _years.push(year)
      }
    });

    setYears(_years)
  }

  const handleSizeChange = (event) => {
    let returnSize = event.target.value
    setSelectedSize(returnSize)
  }

  const setRadius = (measurement) => {
    let r = "5"
    let rValue = 0
    if (selectedSize === "4046") {
      rValue = measurement.sm_4046
      if (rValue <= 2500000) {
        r = "1"
      } else if (rValue > 2500000 && rValue <= 5000000) {
        r = "2"
      } else if (rValue > 5000000 && rValue <= 7500000) {
        r = "3"
      } else if (rValue > 7500000 && rValue <= 10000000) {
        r = "4"
      }
    } else if (selectedSize === "4225") {
      rValue = measurement.l_4225
      if (rValue <= 2600000) {
        r = "1"
      } else if (rValue > 2600000 && rValue <= 5100000) {
        r = "2"
      } else if (rValue > 5100000 && rValue <= 8000000) {
        r = "3"
      } else if (rValue > 8000000 && rValue <= 15000000) {
        r = "4"
      }
    } else if (selectedSize === "4770") {
      rValue = measurement.xl_4770
      if (rValue <= 200000) {
        r = "1"
      } else if (rValue > 200000 && rValue <= 400000) {
        r = "2"
      } else if (rValue > 400000 && rValue <= 600000) {
        r = "3"
      } else if (rValue > 600000 && rValue <= 800000) {
        r = "4"
      }
    } else {
      rValue = measurement.total_volume
      if (rValue <= 14000000) {
        r = "1"
      } else if (rValue > 14000000 && rValue <= 26000000) {
        r = "2"
      } else if (rValue > 26000000 && rValue <= 38000000) {
        r = "3"
      } else if (rValue > 38000000 && rValue <= 50000000) {
        r = "4"
      }
    }
    return r
  }

  const setDisplayPrice = (size) => {
    let r = "0"
    if (selectedSize === "4046") {
      if (size === "1") {
        return "Less than $2,500,000";
      } else if (size === "2") {
        return "$2,500,000 to $5,000,000";
      } else if (size === "3") {
        return "$5,000,000 to $7,500,000";
      } else if (size === "4") {
        return "$7,500,000 to $10,000,000";
      } else {
        return "Greater than $10,000,000";
      }
    } else if (selectedSize === "4225") {
      if (size === "1") {
        return "Less than $2,600,000";
      } else if (size === "2") {
        return "$2,600,000 to $5,100,000";
      } else if (size === "3") {
        return "$5,100,000 to $8,000,000";
      } else if (size === "4") {
        return "$8,000,000 to $15,000,000";
      } else {
        return "Greater than $15,000,000";
      }
    } else if (selectedSize === "4770") {
      if (size === "1") {
        return "Less than $200,000";
      } else if (size === "2") {
        return "$200,000 to $400,000";
      } else if (size === "3") {
        return "$400,000 to $600,000";
      } else if (size === "4") {
        return "$600,000 to $800,000";
      } else {
        return "Greater than $800,000";
      }
    } else {
      if (size === "1") {
        return "Less than $14,000,000";
      } else if (size === "2") {
        return "$14,000,000 to $26,000,000";
      } else if (size === "3") {
        return "$26,000,000 to $38,000,000";
      } else if (size === "4") {
        return "$38,000,000 to $50,000,000";
      } else {
        return "Greater than $50,000,000";
      }
    }
  }

  const setDotColor = (size) => {
    if (size === "1") {
      return "#006837";
    } else if (size === "2") {
      return "#31a354";
    } else if (size === "3") {
      return "#78c679";
    } else if (size === "4") {
      return "#c2e699";
    } else {
      return "#ffffcc";
    }
  }




  const getGroupedData = async () => {
    var _groupedData = [];
    await data.sort((a, b) => {
      const aDate = new Date(a.date);
      const bDate = new Date(b.date);
      return aDate - bDate;
    }).forEach((item, i) => {
      const city = item.city;
      const year = item.year;
      const month = parseInt(item.date.split('/')[0]);
      if(!_groupedData[city]) {
        _groupedData[city] = {
          latitude: item.latitude,
          longitude: item.longitude
        };
      }

      if(!_groupedData[city][year]) {
        _groupedData[city][year] = [];
      }

      if(_groupedData[city][year].length < month) {
        _groupedData[city][year].push(parseInt(item[selectedSize]));
      } else {
        const prev = _groupedData[city][year][month - 1];
        _groupedData[city][year][month - 1] = prev + parseInt(item[selectedSize]);
      }
    });
    setGroupedData(_groupedData)
  }

  var listData = avo_agg_data.filter(item => item.year == selectedYear);
  if (selectedSize === "4046") {
    listData = listData.sort(function(a, b){
      return (b.sm_4046 * b.average_price) - (a.sm_4046 * a.average_price);
    });
  } else if (selectedSize === "4225") {
    listData = listData.sort(function(a, b){
      return (b.l_4225 * b.average_price) - (a.l_4225 * a.average_price);
    });
  } else if (selectedSize === "4770") {
    listData = listData.sort(function(a, b){
      return (b.xl_4770 * b.average_price) - (a.xl_4770 * a.average_price);
    });
  } else {
    listData = listData.sort(function(a, b){
      return (b.total_volume * b.average_price) - (a.total_volume * a.average_price);
    });
  }

  var tableData = avo_agg_data.filter(item => item.year == selectedYear);
  tableData = tableData.sort(function(a, b){
    return (b.total_volume * b.average_price) - (a.total_volume * a.average_price);
  });

  // Implementation is used from https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-strings
  var currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  var titleData = avo_agg_data.filter(item => item.year == selectedYear);
  function getDollarAmount(city) {
    var thisData = titleData.filter(item => item.city == city);
    thisData = thisData[0];
    if (selectedSize === "4046") {
      return currency.format(thisData.sm_4046 * thisData.average_price);
    } else if (selectedSize === "4225") {
      return currency.format(thisData.l_4225 * thisData.average_price);
    } else if (selectedSize === "4770") {
      return currency.format(thisData.xl_4770 * thisData.average_price);
    } else {
      return currency.format(thisData.total_volume * thisData.average_price);
    }
  }

  // Getting wording for narration
  function getSizeWording() {
    if (selectedSize === "4046") {
      return 'small/medium';
    } else if (selectedSize === "4225") {
      return 'large';
    } else if (selectedSize === "4770") {
      return 'extra large';
    } else {
      return 'any size';
    }
  }
  var sizeSelectionWord = getSizeWording();

  return (
    <div className="p-5" style={{ backgroundColor: "#EEF5DD" }} >

      <div className="container-fluid"> {/* extra div wrapper to give more space on sides */}
      <div className="row no-gutters mb-4"> {/* header + title area */}
          <div className="col">
            <h2>Final Project: Avocado Sales Dashboard</h2>
            <h3>Zach Grande, Alycia Nguyen, Michelle Ponting, Darren Ma, Erik Thomas-Hommer</h3>
            <p>{loading && "Loading data!"}</p>
            <p>{loading2 && "Loading other data!"}</p>
          </div>
        </div>

        <div className="row no-gutters">
          <img className="pr-3" width="30%" height="30%" src="https://images.unsplash.com/photo-1559205313-c6b5ba3e8314?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8" />
          <div className="col">
            <h4 className="font-weight-light text-uppercase">The Growth of Avocados</h4>
            <p>Avocados have been trending for years now, and more trends involving avocados continue to present themselves. The popularity of avocado toast in 2017 and the high consumption of avocados during the Super Bowl halftime in 2019 are just a few potential contributors to the outcome of avocado sales over the years. With growing popularity comes higher demand for avocados, which in turn calls for more production. Understanding how the sales for avocados have changed over time will give insight into the continuing popularity as well as a more detailed overview of the performance of the avocado market, which grew 104% from 2000 - 2016 (<a href="https://www.inspirafarms.com/avocado-market-trends-hitting-2020/" target="blank">Avocado Market Trends</a>).</p>
            <p>One avocado variety has dominated the market - <span className="font-weight-bold"> the Hass avocado</span>.</p>
            <span className="font-weight-bold" style={{ color: '#515C52', fontSize: '18px' }}>Hass avocados currently make up 95% of all the avocados eaten in the USA.</span>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h4 className="font-weight-light text-uppercase mt-4">The Story of Hass</h4>
            <p>Where did Hass avocados come from?</p>
            <p>The story begins in 1926 in La Habra Heights, California with Rudolph Hass, who purchased avocado seeds at a local nursery. At the time, different varieties of avocados were being produced, and had smooth, green skin, but Hass’ avocado trees offered avocados with the pebbly, black outside that we know today.</p>
            <p>Although Hass’ avocados initially didn’t have high demand, admiration for the avocados grew rapidly over time. In fact, the trees that Rudolph Hass cultivated have been used as the model for the many Hass avocado trees today. With the 5 million Hass avocado trees in California alone, and 10 million trees worldwide, it’s clear that avocados continue to be in high demand and reach many.</p>
            <p>This prompts several questions: What does the distribution of Hass avocado sales look like? Where are Hass avocados sold, how many are sold in these locations and how much are the avocados? Moreso… <span className="font-weight-bold" style={{ color: '#515C52' }}>how have these aspects such as location in combination with the sales for Hass avocados changed over time?</span></p>

            <h4 className="font-weight-light text-uppercase mt-4">Visualization Overview</h4>
            <p>The following visualization will answer these questions within the scope of the United States over the years 2015 - 2020. It presents a map of the U.S. with 2 different views to explore the sales for Hass avocados. One utilizes line markings that demonstrate the Hass avocado sales throughout a given year (sales over the months). These markings will be displayed at its respective location on the map. Each year can be inspected upon selection on the slider. Other aspects that can be explored are the sales for the different sizes of Hass avocados (small/medium, large or extra-large). Accompanying this map will be a list of the top 10 cities that had the most sales for a selected year (and size).</p>
            <p>A table will also be provided, which lists a breakdown of the top 10 cities, in descending order from most to least sales of Hass avocados. It will display sales for every size for the selected year. Namely, the table will contain a city name, its respective state name as well as the sales in a dollar amount for the total sales as well as the sales for small/medium, large and extra large avocados for a more detailed evaluation.</p>

            <h4 className="font-weight-light text-uppercase mt-4">Dataset Overview</h4>
            <p>The dataset utilized provides records for Hass avocado sales from 2015 - 2020 in the United States. It describes the total number of avocados sold in major U.S. cities across these five years. In the visualization, notable attributes were selected to guide exploration: year, size, location data, price and total volume of sales.</p>

            <h4 className="font-weight-light text-uppercase mt-4">Visualization Instructions</h4>
            <div className="row">
              <div className="col-7">
                <h5 className="font-weight-normal mb-0">Switch View</h5>
                <span className="font-italic">Select the view for total sales (circles) or the view for sales over time (sparkline)</span>
                <ul>
                  <li>Use the toggle to select which view you want to explore - left (circle) or right (sparkline)</li>
                </ul>
                <h5 className="font-weight-normal mb-0">Zooming</h5>
                <span className="font-italic">Use zoom to enlarge and shrink the area of focus</span>
                <ul>
                  <li>Use the arrows to change your direction of focus - left, right, up, down</li>
                  <li>Use the plus or minus button to zoom in or out of your area of focus</li>
                </ul>
              </div>
              <div className="col-5">
                <h5 className="font-weight-normal mb-0">Year Selection</h5>
                <span className="font-italic">Select a year to look at sales for that given year</span>
                <ul>
                  <li>Move the slider right to increase the year or left to decrease the year</li>
                </ul>
                <h5 className="font-weight-normal mb-0">Size Selection</h5>
                <span className="font-italic">Select a size to filter your exploration and view sales for a particular size</span>
                <ul>
                  <li> Click the button for the size you want to observe</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4 p-3 bg-white mb-3 justify-content-center" style={{ borderRadius: "30px" }}> {/* dashboard area */}
          <div className="py-2 px-4 mb-3 text-center" style={{ borderRadius: "30px", backgroundColor: "#c2e699" }}>
            <h3 className="font-weight-normal text-uppercase p-0 m-0">
              <span className="font-weight-bold" style={{ color: '#212529' }}>{sizeSelectionWord} </span>Hass Avocado Sales in the United States (<span className="font-weight-bold" style={{ color: '#212529' }}>{selectedYear}</span>)
            </h3>
          </div>
          <div className="col">
            <div className="row justify-content-center text-center"> {/* filters row */}
              <div className="col-7"> {/* slider col */}
                <h4 className="mb-0">Change Which Year Is Displayed:</h4>
                <div> {/* slider wrapper */}
                  <Slider
                    value={selectedYear - Math.min(...years)}
                    min={0}
                    max={5}
                    labels={years.reduce((acc, year, index) => ({ ...acc, [index]: year }), {})}
                    tooltip={false}
                    orientation="horizontal"
                    onChange={value => { setSelectedYear(value + Math.min(...years)) }}
                  />
                </div>
              </div>
              <div className="col-5"> {/* tbd size radio btns col */}
                <h4 className="mb-0">Change Which Size Of Avocado Is Displayed:</h4>
                <div className="py-3">
                  <div className="form-check form-check-inline" onChange={handleSizeChange}>
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="4046" onChange={handleSizeChange} checked={selectedSize === "4046"} />
                    <label className="form-check-label" htmlFor="inlineRadio1">Small/Medium</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="4225" onChange={handleSizeChange} checked={selectedSize === "4225"} />
                    <label className="form-check-label" htmlFor="inlineRadio2">Large</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="4770" onChange={handleSizeChange} checked={selectedSize === "4770"} />
                    <label className="form-check-label" htmlFor="inlineRadio3">Extra Large</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio4" value="total_volume" onChange={handleSizeChange} checked={selectedSize === "total_volume"} />
                    <label className="form-check-label" htmlFor="inlineRadio4">Any Size</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="row py-3"> {/* map / list row */}
              <div className="col"> {/* map col */}
                <svg id="map" className="tooltip-svg" width={1000} height={650} style={{ border: "1px solid black", backgroundColor: "#212529" }} viewBox={`${x} ${y} ${width} ${height}`}>
                  <path d={mapPathString} fill="rgb(200, 200, 200)" />
                  {
                    spark ?
                    Object.keys(groupedData).filter(city =>
                      city == "Los Angeles" ||
                      city == "New York" ||
                      city == "San Francisco" ||
                      city == "Denver" ||
                      city == "Seattle" ||
                      city == "Houston" ||
                      city == "Chicago"
                    ).map((city, i) => {
                        const spark_width = 20;
                        const spark_height = 15;
                        const x_scale = x_d3_scale
                          .range([2, spark_width - 2])
                          .domain([0, 11]);
                        const y_scale = y_d3_scale
                          .range([spark_height - 2, 2])
                          .domain(d3.extent(groupedData[city][selectedYear]));
                        const line = d3.line()
                                    .x((d, i) => {
                                      let x = x_scale(i);
                                      return x
                                    })
                                    .defined((d) => {
                                      return !isNaN(d)
                                    })
                                    .y((d, i) => {
                                      return y_scale(d);
                                    });
                        const y_transform = parseInt(groupedData[city].latitude) + 4
                        return (
                          <g transform={`translate(${projection([groupedData[city].longitude - 5, y_transform ])})`}>
                            <path
                              style={{ fill: 'none', strokeWidth: '0.5px', stroke: 'steelblue' }}
                              d={line(groupedData[city][selectedYear])}/>
                          </g>
                        );
                    }) :
                    avo_agg_data.filter(item => item.year == selectedYear).map(measurement => {
                      let size = setRadius(measurement);
                      let color = setDotColor(size);
                      return (
                        <circle
                            className="tooltip-trigger"
                            key={measurement.latitude}
                            transform={`translate(${projection([measurement.longitude, measurement.latitude])})`}
                            r={size}
                            opacity="0.75"
                            fill={color}
                            stroke="8E2914"
                            strokeWidth="0.1"
                          >
                          <title>{measurement.city}, {measurement.state_id}: {getDollarAmount(measurement.city)}</title>
                        </circle>
                      );
                    })
                  }
                </svg>
                {/* zoom overlay, needs nesting to properly stack in corner */}
                <div className="row text-center no-gutters" style={{ position: "absolute", top: "10px", right: "20px" }}>
                  <div className="col pt-2" style={{ backgroundColor: "rgba(255, 255, 255, .75)", borderRadius: "5px" }}>
                    <div className="row">
                      <div className="col">
                        <AiFillPlusCircle className="mx-2" size="30" onClick={() => {
                          setWidth(width <= min_width + 20 ? min_width : width - 20)
                          setHeight(height <= min_height + 3 ? min_height : height - 3)
                        }} />
                        <AiFillMinusCircle className="mx-2" size="30" onClick={() => {
                          setWidth(width >= max_width ? max_width : width + 20)
                          setHeight(height >= max_height ? max_height : height + 3)
                        }} />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <AiFillCaretUp size="30" onClick={() => { setY(y - 5) }} />
                        <div className="row">
                          <div className="col"><AiFillCaretLeft size="30" onClick={() => { setX(x - 10) }} /></div>
                          <div className="col"><AiFillCaretRight size="30" onClick={() => { setX(x + 10) }} /></div>
                        </div>
                        <AiFillCaretDown size="30" onClick={() => { setY(y + 5) }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="d-flex flex-row justify-content-around align-items-start">
                  <label>Sparkline</label>
                  <Toggle
                    id='spark'
                    defaultChecked={spark}
                    onChange={() => setSpark(!spark)} />
                </div>
                <hr></hr>
                <h4 className="m-0 p-0">Legend</h4>
                <p className="font-weight-light text-secondary">Total Sales for Avocado Size</p>
                <div>
                  <svg width="40" height="40"><circle cx="20" cy="20" r="10" opacity="0.75" fill={setDotColor("1")} stroke="#001c0f" strokeWidth="2"></circle></svg>
                  <span className="pl-1" style={{fontSize:"14px"}}>{setDisplayPrice("1")}</span>
                </div>
                <div>
                  <svg width="40" height="40"><circle cx="20" cy="20" r="12" opacity="0.75" fill={setDotColor("2")} stroke="#1a572d" strokeWidth="2"></circle></svg>
                  <span className="pl-1" style={{fontSize:"14px"}}>{setDisplayPrice("2")}</span>
                </div>
                <div>
                  <svg width="40" height="40"><circle cx="20" cy="20" r="14" opacity="0.75" fill={setDotColor("3")} stroke="#4b7a4b" strokeWidth="2"></circle></svg>
                  <span className="pl-1" style={{fontSize:"14px"}}>{setDisplayPrice("3")}</span>
                </div>
                <div>
                  <svg width="40" height="40"><circle cx="20" cy="20" r="16" opacity="0.75" fill={setDotColor("4")} stroke="#819967" strokeWidth="2"></circle></svg>
                  <span className="pl-1" style={{fontSize:"14px"}}>{setDisplayPrice("4")}</span>
                </div>
                <div>
                  <svg width="40" height="40"><circle cx="20" cy="20" r="18" opacity="0.75" fill={setDotColor("5")} stroke="#b3b38f" strokeWidth="2"></circle></svg>
                  <span className="pl-1" style={{fontSize:"14px"}}>{setDisplayPrice("5")}</span>
                </div>
                <hr></hr>
                <h4>Top Cities:</h4>
                {listData[0] &&
                  <ol>
                    <li id="city-1" className="animate__animated animate__lightSpeedInRight">{listData[0].city}</li>
                    <li id="city-2" className="animate__animated animate__lightSpeedInRight">{listData[1].city}</li>
                    <li id="city-3" className="animate__animated animate__lightSpeedInRight">{listData[2].city}</li>
                    <li id="city-4" className="animate__animated animate__lightSpeedInRight">{listData[3].city}</li>
                    <li id="city-5" className="animate__animated animate__lightSpeedInRight">{listData[4].city}</li>
                    <li id="city-6" className="animate__animated animate__lightSpeedInRight">{listData[5].city}</li>
                    <li id="city-7" className="animate__animated animate__lightSpeedInRight">{listData[6].city}</li>
                    <li id="city-8" className="animate__animated animate__lightSpeedInRight">{listData[7].city}</li>
                    <li id="city-9" className="animate__animated animate__lightSpeedInRight">{listData[8].city}</li>
                    <li id="city-10" className="animate__animated animate__lightSpeedInRight">{listData[9].city}</li>
                  </ol>}
              </div>
            </div>
            <div className="row">
              <div className="col">
                <table className="table table-striped table-sm mb-0">
                  <caption>List of top cities and sale amounts</caption>
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">City</th>
                      <th scope="col">State</th>
                      <th scope="col">Total Sales (USD)</th>
                      <th scope="col">Small/Medium Avocado Sales (USD)</th>
                      <th scope="col">Large Avocado Sales (USD)</th>
                      <th scope="col">Extra Large Avocado Sales (USD)</th>
                    </tr>
                  </thead>
                  {listData[0] &&
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>{tableData[0].city}</td>
                      <td>{tableData[0].state_id}</td>
                      <td>{currency.format(tableData[0].total_volume * tableData[0].average_price)}</td>
                      <td>{currency.format(tableData[0].sm_4046 * tableData[0].average_price)}</td>
                      <td>{currency.format(tableData[0].l_4225 * tableData[0].average_price)}</td>
                      <td>{currency.format(tableData[0].xl_4770 * tableData[0].average_price)}</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>{tableData[1].city}</td>
                      <td>{tableData[1].state_id}</td>
                      <td>{currency.format(tableData[1].total_volume * tableData[1].average_price)}</td>
                      <td>{currency.format(tableData[1].sm_4046 * tableData[1].average_price)}</td>
                      <td>{currency.format(tableData[1].l_4225 * tableData[1].average_price)}</td>
                      <td>{currency.format(tableData[1].xl_4770 * tableData[1].average_price)}</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>{tableData[2].city}</td>
                      <td>{tableData[2].state_id}</td>
                      <td>{currency.format(tableData[2].total_volume * tableData[2].average_price)}</td>
                      <td>{currency.format(tableData[2].sm_4046 * tableData[2].average_price)}</td>
                      <td>{currency.format(tableData[2].l_4225 * tableData[2].average_price)}</td>
                      <td>{currency.format(tableData[2].xl_4770 * tableData[2].average_price)}</td>
                    </tr>
                    <tr>
                      <th scope="row">4</th>
                      <td>{tableData[3].city}</td>
                      <td>{tableData[3].state_id}</td>
                      <td>{currency.format(tableData[3].total_volume * tableData[3].average_price)}</td>
                      <td>{currency.format(tableData[3].sm_4046 * tableData[3].average_price)}</td>
                      <td>{currency.format(tableData[3].l_4225 * tableData[3].average_price)}</td>
                      <td>{currency.format(tableData[3].xl_4770 * tableData[3].average_price)}</td>
                    </tr>
                    <tr>
                      <th scope="row">5</th>
                      <td>{tableData[4].city}</td>
                      <td>{tableData[4].state_id}</td>
                      <td>{currency.format(tableData[4].total_volume * tableData[4].average_price)}</td>
                      <td>{currency.format(tableData[4].sm_4046 * tableData[4].average_price)}</td>
                      <td>{currency.format(tableData[4].l_4225 * tableData[4].average_price)}</td>
                      <td>{currency.format(tableData[4].xl_4770 * tableData[4].average_price)}</td>
                    </tr>
                    <tr>
                      <th scope="row">6</th>
                      <td>{tableData[5].city}</td>
                      <td>{tableData[5].state_id}</td>
                      <td>{currency.format(tableData[5].total_volume * tableData[5].average_price)}</td>
                      <td>{currency.format(tableData[5].sm_4046 * tableData[5].average_price)}</td>
                      <td>{currency.format(tableData[5].l_4225 * tableData[5].average_price)}</td>
                      <td>{currency.format(tableData[5].xl_4770 * tableData[5].average_price)}</td>
                    </tr>
                    <tr>
                      <th scope="row">7</th>
                      <td>{tableData[6].city}</td>
                      <td>{tableData[6].state_id}</td>
                      <td>{currency.format(tableData[6].total_volume * tableData[6].average_price)}</td>
                      <td>{currency.format(tableData[6].sm_4046 * tableData[6].average_price)}</td>
                      <td>{currency.format(tableData[6].l_4225 * tableData[6].average_price)}</td>
                      <td>{currency.format(tableData[6].xl_4770 * tableData[6].average_price)}</td>
                    </tr>
                    <tr>
                      <th scope="row">8</th>
                      <td>{tableData[7].city}</td>
                      <td>{tableData[7].state_id}</td>
                      <td>{currency.format(tableData[7].total_volume * tableData[7].average_price)}</td>
                      <td>{currency.format(tableData[7].sm_4046 * tableData[7].average_price)}</td>
                      <td>{currency.format(tableData[7].l_4225 * tableData[7].average_price)}</td>
                      <td>{currency.format(tableData[7].xl_4770 * tableData[7].average_price)}</td>
                    </tr>
                    <tr>
                      <th scope="row">9</th>
                      <td>{tableData[8].city}</td>
                      <td>{tableData[8].state_id}</td>
                      <td>{currency.format(tableData[8].total_volume * tableData[8].average_price)}</td>
                      <td>{currency.format(tableData[8].sm_4046 * tableData[8].average_price)}</td>
                      <td>{currency.format(tableData[8].l_4225 * tableData[8].average_price)}</td>
                      <td>{currency.format(tableData[8].xl_4770 * tableData[8].average_price)}</td>
                    </tr>
                    <tr>
                      <th scope="row">10</th>
                      <td>{tableData[9].city}</td>
                      <td>{tableData[9].state_id}</td>
                      <td>{currency.format(tableData[9].total_volume * tableData[9].average_price)}</td>
                      <td>{currency.format(tableData[9].sm_4046 * tableData[9].average_price)}</td>
                      <td>{currency.format(tableData[9].l_4225 * tableData[9].average_price)}</td>
                      <td>{currency.format(tableData[9].xl_4770 * tableData[9].average_price)}</td>
                    </tr>
                  </tbody>}
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="row no-gutters">
          <div className="col">
            <h4 className="font-weight-light text-uppercase mt-4">What does this mean?</h4>
            <p>On the <span className="font-weight-bold">total sales view</span>, larger circle markings indicate a larger amount of Hass avocado sales for a selected year and size. So, the locations that have the largest markings also had the most sales, and locations that had the smallest markings had the least.</p>
            <p>On the <span className="font-weight-bold">sales over time</span> view, a positive slope on a line indicates that throughout a selected year, the Hass avocado sales increased for a selected size. Conversely, a negative slope indicates that a decrease in Hass avocado sales occurred. Locations that consistently presented a positive slope had a consistent increase in sales throughout the year, locations that consistently presented a negative slope had a consistent decrease, and locations whose slope fluctuated had varied success in sales.</p>
            <p>The list of the top 10 cities presents the cities in a given year where the most Hass avocado sales occurred of the chosen avocado size. These locations are also listed in the slots of the table. The table also contains all the cities that were included in our dataset in descending order, from cities with the most sales to cities with the least.</p>
            <p>Considering your selections (year: <span className="font-weight-bold">{selectedYear}</span>, size: <span className="font-weight-bold">{sizeSelectionWord}</span>)...</p>

            <h5 className="font-weight-normal">Total Sales View Explanation</h5>
            <p>There was a large range in the total Hass avocado sales between the cities with the most and  least sales! The 3 cities with the highest Hass avocado sales in {selectedYear} for {sizeSelectionWord} avocados were {listData[0] && <span className="font-weight-bold"> {tableData[0].city}, {tableData[1].city}, and {tableData[2].city}</span>}. {listData[0] && listData[0].city}, the top city in {selectedYear}, had a total of {listData[0] && Math.round(tableData[0].total_volume)} avocados sold during that year. That means that a total of ${tableData[0] && Math.round(tableData[0].total_volume * tableData[0].average_price)} was spent buying Hass avocados in {listData[0] && listData[0].city}! Not only was {listData[0] && listData[0].city} the top city in {selectedYear}, but it also was the city with the most avocado sales throughout 2015-2020!</p>

            <h5 className="font-weight-normal">Sales Over Time View Explanation</h5>
            <p>On the sales over time view, it can be observed that throughout a selected year, the sales fluctuated often. This could be due to how throughout months, avocados can become more or less popular. Considering factors such as when avocados are in season, or sudden trends or events can assist in understanding why sales can fluctuate during the year.</p>

            <h5 className="font-weight-normal">Table Explanation</h5>
            <p>The top 10 cities during {selectedYear} are displayed in the table. The total sales for each city is provided in  dollars, as well as the sales for each size of avocado (small/medium, large, and extra-large). According to the table, it seems that Los Angeles remained the city with the most amount of Hass avocado sales from 2015-2020!</p>

            <h4 className="font-weight-light text-uppercase mt-4">Conclusion</h4>
            <p>Now that exploration has been completed, some general conclusions can be drawn.</p>
            <p>The first set of conclusions will be stated according to the question proposed at the beginning - <span className="font-weight-bold">how has location in combination with the sales for Hass avocados changed over time?</span></p>
            <p>According to the map view, it can be observed that there is undoubtedly an increase in the total number of avocados sold, since moving the year slider towards the right results in an increased size for the circle markings.</p>
            <p>According to the sparkline view, it can also be seen that there is an increase in the number of avocados sold. This can be assumed because in many cities, including the cities that had the most Hass avocado sales (which is listed on the side of the map visualization), there was a positive overall change in the line.</p>
            <p>According to the table, it can be seen that location has a relationship with the total sales for Hass avocados. There was one city that maintained the most sales throughout 2015-2020 -- Los Angeles! In addition, the number two city also remained the same from 2015-2020 -- New York!</p>
            <p>Overall, it could be stated that there was apparent growth in Hass avocado sales throughout the United States. Notably, Los Angeles and New York demonstrated consistent increase in total sales from 2015-2020. It is possible that this trend of growing Hass avocado sales will continue not only in these cities, but throughout the United States. Especially considering how trends involving avocados are unquestionably going to persist, the sales for the most popular avocado - Hass avocados - will most likely persist as well.</p>

            <h4 className="font-weight-light text-uppercase mt-4">Considerations</h4>

            <h5>Interactions / Design Decisions Overview</h5>
            <p>Following the completion of assignment 3, we received feedback that helped us refine our visualization for our final project.</p>
            <p>To ensure interesting information is utilized, we chose to implement a toggle view on the map - one showing aggregated avocado sales per year and another showing change in sales over a year (by month) for each city.  This would be presented as centroid markings or sparklines on city locations, respectively.  In addition, a responsive list showing the top 10 cities was decided to be implemented to complement the map, along with a table that contains every city in our dataset and its total sales as well as the sales for the different sizes of avocados.</p>
            <p> Particularly, for the total sales view, we decided to standardize centroid markings with a min and max radius and include a tooltip with the city name, state and total sales (in dollars) for avocados sold for better understanding.</p>
            <p> Considering the sales over time view, we decided to plot a line with no axes at its respective location for each city.</p>
            <p>Another consideration we evaluated was regarding the flow of the page. To assist as well as enhance the exploration process, a narrative that will progress throughout the website and be responsive according to selection of year, size and toggle mode was decided to be implemented to guide the exploration of data.</p>
            <p>Lastly, considering the aesthetic and look of our visualization and page, we chose to incorporate a green color scheme to follow the avocado theme.</p>

            <h5>Development Process </h5>
            <p>Considering our development process, we began where assignment 3 left off. With initial data cleaning and the map already implemented, we started by performing more data cleaning to establish simplicity of our code with the new view (the sales over time sparkline).</p>
            <p>Our first created dataset (dataset 1) - with columns for city names (geography), latitude, longitude and a state ID (indicating what state this city is located in) joined with the main avocado dataset - was identified to be utilized by the sparkline visualization, since it included more detailed time data. A new dataset was created from dataset 1, and will be referenced in this explanation as dataset 2. Dataset 2 was determined to be used only for the total sales view (centroid markings) and was created by copying dataset 1, then manipulating the copy to only include columns that included attributes that contribute to exploration: city name, state name, year, latitude and longitude, average_price, total_volume, and the 3 different size columns (for small/medium, large, extra large). From here, the dataset was grouped by city and year, and summarized to get the total number of sales for each city for a particular year. In addition, bins were implemented to further organize data.</p>
            <p>Following this data cleaning process, work was split up to set up the framework for our visualization page, create and develop the narrative, implement the sparkline view, and fine-tune the centroid view. All aspects of the project were very time-consuming, especially when all of these moving parts had to complement each other.
            </p>
            <p>The narrative was formulated in consideration of both views, and was designed to evaluate results of both views. It was written to include aspects of storytelling, instruction and explanation.</p>
            <p>The centroid view (for total sales) involved a fair amount of re-working from assignment 3, given it had to utilize the newly created dataset. The responsive list of top cities and the tooltip that appears on hover took the most amount of time for the centroid view.</p>
            <p>The table under the map visualization also took a considerable amount of time, as it involved a series of  repetitive tasks. A calculation had to be performed to create this table in order to get the total sales in dollars, so the number of avocados sold was multiplied by the price. Additionally, making this table responsive to selections was quite difficult, and therefore required a lot of time as well.</p>
            <p>The sparkline was by far the most demanding task of them all. It required time data, and since the data in our dataset was organized by week, data had to be manipulated and summed up so monthly data was available. In addition, plotting the line seemed to be much more difficult than expected. To combat the potential crowding that could occur if all cities were presented, we decided to only present and utilize data from major cities (Los Angeles, New York, Seattle, San Francisco, Denver, Chicago, Houston)</p>
            <p>Lastly, the style of our page was implemented by our team to reflect the nature of avocados. So, a green color scheme was decided upon and incorporated throughout our website to make it more engaging.</p>

            <h4 className="font-weight-light text-uppercase">Citations</h4>
            <ul className="list-unstyled">
              <li><a href="https://www.tutorialspoint.com/d3js/d3js_introduction_to_svg.htm" target="blank">Introduction to SVG</a></li>
              <li><a href="https://avocadosfrommexico.com/avocados/hass-avocado/" target="blank">Hass Avocados Information</a></li>
              <li><a href="https://www.inspirafarms.com/avocado-market-trends-hitting-2020/" target="blank">Avocado market trends</a></li>
              <li><a href="https://www.kaggle.com/neuromusic/avocado-prices" target="blank">Initial Avocado Dataset</a>
              </li>
              <li><a href="https://www.kaggle.com/timmate/avocado-prices-2020" target="blank">Avocado Dataset Utilized</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Assignment4;
