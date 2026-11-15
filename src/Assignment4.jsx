import { useEffect, useState } from 'react';
import { useFetch } from "./hooks/useFetch";
import * as topojson from "topojson-client";
import world from "./land-50m";
import YearSlider from "./components/YearSlider";
import Toggle from './components/Toggle'
import MapControls from "./components/MapControls";
import PageHeader from "./components/PageHeader";
import LoadingNotice from "./components/LoadingNotice";
import "animate.css";

/*
* The skeleton for the map was implemented using the documentation for D3's Bubble Map
* https://observablehq.com/@d3/bubble-map
*/

function Assignment4() {

  const [data, loading] = useFetch(
    "https://raw.githubusercontent.com/ZachGrande/info474-react-parcel-template/e8e82879867a43381706483de0d059b380034941/avocado-2020-joined-city-only.csv"
  );

  const [avo_agg_data, loading2] = useFetch(
    "https://raw.githubusercontent.com/ZachGrande/info474-react-parcel-template/e8e82879867a43381706483de0d059b380034941/aggregated-avocado-2020.csv"
  );

  const [listData, setListData] = useState([]);
  const [animateCitiesList, setAnimateCitiesList] = useState(false);

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

    let cities = avo_agg_data.filter(item => item.year == selectedYear);

    if (selectedSize === "4046") {
      cities = cities.sort(function(a, b){
        return (b.sm_4046 * b.average_price) - (a.sm_4046 * a.average_price);
      });
    } else if (selectedSize === "4225") {
      cities = cities.sort(function(a, b){
        return (b.l_4225 * b.average_price) - (a.l_4225 * a.average_price);
      });
    } else if (selectedSize === "4770") {
      cities = cities.sort(function(a, b){
        return (b.xl_4770 * b.average_price) - (a.xl_4770 * a.average_price);
      });
    } else {
      cities = cities.sort(function(a, b){
        return (b.total_volume * b.average_price) - (a.total_volume * a.average_price);
      });
    }
    cities = cities.slice(0, 11); // show top 10 cities
    setListData(cities);
  }, [avo_agg_data, data, selectedSize]);

  useEffect(() => {
    setAnimateCitiesList(true);

    const timer = setTimeout(() => setAnimateCitiesList(false), 1000);
    return () => clearTimeout(timer);
  }, [listData]);

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

  const sizeOptions = [
    { id: "inlineRadio1", value: "4046", label: "Small/Medium" },
    { id: "inlineRadio2", value: "4225", label: "Large" },
    { id: "inlineRadio3", value: "4770", label: "Extra Large" },
    { id: "inlineRadio4", value: "total_volume", label: "Any Size" },
  ];

  const legendItems = [
    { size: "1", r: 10, stroke: "#001c0f" },
    { size: "2", r: 12, stroke: "#1a572d" },
    { size: "3", r: 14, stroke: "#4b7a4b" },
    { size: "4", r: 16, stroke: "#819967" },
    { size: "5", r: 18, stroke: "#b3b38f" },
  ];

  return (
    <div className="theme-avocado">
      <div className="container page">
        <PageHeader
          eyebrow="Final Project"
          title="Avocado Sales Dashboard"
          subtitle="Zach Grande, Alycia Nguyen, Michelle Ponting, Darren Ma, Erik Thomas-Hommer"
        />
        <LoadingNotice show={loading || loading2} />

        <div className="row g-4 align-items-center">
          <div className="col-lg-5">
            <img className="hero-image" alt="Mural of a cartoon avocado relaxing in a hammock" src="https://images.unsplash.com/photo-1559205313-c6b5ba3e8314?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8" />
          </div>
          <div className="col-lg-7">
            <h2 className="section-heading mt-0">The Growth of Avocados</h2>
            <p>Avocados have been trending for years now, and more trends involving avocados continue to present themselves. The popularity of avocado toast in 2017 and the high consumption of avocados during the Super Bowl halftime in 2019 are just a few potential contributors to the outcome of avocado sales over the years. With growing popularity comes higher demand for avocados, which in turn calls for more production. Understanding how the sales for avocados have changed over time will give insight into the continuing popularity as well as a more detailed overview of the performance of the avocado market, which grew 104% from 2000 - 2016 (<a href="https://www.inspirafarms.com/avocado-market-trends-hitting-2020/" target="blank">Avocado Market Trends</a>).</p>
            <p>One avocado variety has dominated the market - <span className="fw-bold"> the Hass avocado</span>.</p>
            <p className="callout">Hass avocados currently make up 95% of all the avocados eaten in the USA.</p>
          </div>
        </div>

        <div className="prose">
          <h2 className="section-heading">The Story of Hass</h2>
          <p>Where did Hass avocados come from?</p>
          <p>The story begins in 1926 in La Habra Heights, California with Rudolph Hass, who purchased avocado seeds at a local nursery. At the time, different varieties of avocados were being produced, and had smooth, green skin, but Hass’ avocado trees offered avocados with the pebbly, black outside that we know today.</p>
          <p>Although Hass’ avocados initially didn’t have high demand, admiration for the avocados grew rapidly over time. In fact, the trees that Rudolph Hass cultivated have been used as the model for the many Hass avocado trees today. With the 5 million Hass avocado trees in California alone, and 10 million trees worldwide, it’s clear that avocados continue to be in high demand and reach many.</p>
          <p>This prompts several questions: What does the distribution of Hass avocado sales look like? Where are Hass avocados sold, how many are sold in these locations and how much are the avocados? Moreso… <span className="fw-bold" style={{ color: '#515C52' }}>how have these aspects such as location in combination with the sales for Hass avocados changed over time?</span></p>

          <h2 className="section-heading">Visualization Overview</h2>
          <p>The following visualization will answer these questions within the scope of the United States over the years 2015 - 2020. It presents a map of the U.S. with 2 different views to explore the sales for Hass avocados. One utilizes line markings that demonstrate the Hass avocado sales throughout a given year (sales over the months). These markings will be displayed at its respective location on the map. Each year can be inspected upon selection on the slider. Other aspects that can be explored are the sales for the different sizes of Hass avocados (small/medium, large or extra-large). Accompanying this map will be a list of the top 10 cities that had the most sales for a selected year (and size).</p>
          <p>A table will also be provided, which lists a breakdown of the top 10 cities, in descending order from most to least sales of Hass avocados. It will display sales for every size for the selected year. Namely, the table will contain a city name, its respective state name as well as the sales in a dollar amount for the total sales as well as the sales for small/medium, large and extra large avocados for a more detailed evaluation.</p>

          <h2 className="section-heading">Dataset Overview</h2>
          <p>The dataset utilized provides records for Hass avocado sales from 2015 - 2020 in the United States. It describes the total number of avocados sold in major U.S. cities across these five years. In the visualization, notable attributes were selected to guide exploration: year, size, location data, price and total volume of sales.</p>
        </div>

        <h2 className="section-heading">Visualization Instructions</h2>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-4 g-3">
          <div className="col">
            <div className="surface-card h-100 p-3">
              <h3 className="h6 fw-semibold mb-1">Switch View</h3>
              <p className="fst-italic small text-secondary mb-2">Select the view for total sales (circles) or the view for sales over time (sparkline)</p>
              <ul className="small mb-0">
                <li>Use the toggle to select which view you want to explore - left (circle) or right (sparkline)</li>
              </ul>
            </div>
          </div>
          <div className="col">
            <div className="surface-card h-100 p-3">
              <h3 className="h6 fw-semibold mb-1">Zooming</h3>
              <p className="fst-italic small text-secondary mb-2">Use zoom to enlarge and shrink the area of focus</p>
              <ul className="small mb-0">
                <li>Use the arrows to change your direction of focus - left, right, up, down</li>
                <li>Use the plus or minus button to zoom in or out of your area of focus</li>
              </ul>
            </div>
          </div>
          <div className="col">
            <div className="surface-card h-100 p-3">
              <h3 className="h6 fw-semibold mb-1">Year Selection</h3>
              <p className="fst-italic small text-secondary mb-2">Select a year to look at sales for that given year</p>
              <ul className="small mb-0">
                <li>Move the slider right to increase the year or left to decrease the year</li>
              </ul>
            </div>
          </div>
          <div className="col">
            <div className="surface-card h-100 p-3">
              <h3 className="h6 fw-semibold mb-1">Size Selection</h3>
              <p className="fst-italic small text-secondary mb-2">Select a size to filter your exploration and view sales for a particular size</p>
              <ul className="small mb-0">
                <li>Click the button for the size you want to observe</li>
              </ul>
            </div>
          </div>
        </div>

        <section className="surface-card p-3 p-lg-4 my-5" aria-label="Avocado sales dashboard">
          <div className="dashboard-title py-2 px-3 mb-4 text-center">
            <h2 className="h5 text-uppercase fw-normal m-0">
              <span className="fw-bold">{sizeSelectionWord} </span>Hass Avocado Sales in the United States (<span className="fw-bold">{selectedYear}</span>)
            </h2>
          </div>

          <div className="row g-4 mb-4">
            <div className="col-lg-7">
              <h3 className="h6 fw-semibold mb-1">Change Which Year Is Displayed:</h3>
              <YearSlider
                value={selectedYear}
                min={Math.min(...years)}
                max={Math.max(...years)}
                step={1}
                ticks={years.map((year) => ({ value: year, label: year }))}
                ariaLabel="Select dashboard year"
                onChange={setSelectedYear}
              />
            </div>
            <div className="col-lg-5">
              <h3 className="h6 fw-semibold mb-2" id="size-group-label">Change Which Size Of Avocado Is Displayed:</h3>
              <div className="row row-cols-2 row-cols-sm-4 g-2" role="radiogroup" aria-labelledby="size-group-label">
                {sizeOptions.map(({ id, value, label }) => (
                  <div className="col" key={id}>
                    <input className="btn-check" type="radio" name="inlineRadioOptions" id={id} value={value} onChange={handleSizeChange} checked={selectedSize === value} />
                    <label className="btn btn-outline-success btn-sm w-100" htmlFor={id}>{label}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-lg-9">
              <div className="map-wrapper">
                <div className="viz-frame viz-frame-map" style={{ backgroundColor: "#212529" }}>
                  <svg id="map" className="tooltip-svg" viewBox={`${x} ${y} ${width} ${height}`}>
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
                </div>
                <MapControls
                  onZoomIn={() => {
                    setWidth(width <= min_width + 20 ? min_width : width - 20)
                    setHeight(height <= min_height + 3 ? min_height : height - 3)
                  }}
                  onZoomOut={() => {
                    setWidth(width >= max_width ? max_width : width + 20)
                    setHeight(height >= max_height ? max_height : height + 3)
                  }}
                  onPanUp={() => setY(y - 5)}
                  onPanDown={() => setY(y + 5)}
                  onPanLeft={() => setX(x - 10)}
                  onPanRight={() => setX(x + 10)}
                />
              </div>
            </div>

            <aside className="col-lg-3">
              <div className="row g-4">
                <div className="col-12">
                  <div className="d-flex align-items-center justify-content-between gap-2">
                    <span className="small fw-semibold">View</span>
                    <div className="d-flex align-items-center gap-2 small">
                      <span className={spark ? "text-secondary" : "fw-semibold"}>Circles</span>
                      <Toggle
                        id='spark'
                        defaultChecked={spark}
                        onChange={() => setSpark(!spark)} />
                      <label htmlFor="spark" className={spark ? "fw-semibold" : "text-secondary"}>Sparkline</label>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6 col-lg-12">
                  <h3 className="h6 fw-semibold mb-0">Legend</h3>
                  <p className="small text-secondary mb-2">Total Sales for Avocado Size</p>
                  {legendItems.map(({ size, r, stroke }) => (
                    <div className="legend-item" key={size}>
                      <svg width="40" height="40" aria-hidden="true"><circle cx="20" cy="20" r={r} opacity="0.75" fill={setDotColor(size)} stroke={stroke} strokeWidth="2"></circle></svg>
                      <span>{setDisplayPrice(size)}</span>
                    </div>
                  ))}
                </div>

                <div className="col-sm-6 col-lg-12">
                  <h3 className="h6 fw-semibold">Top Cities:</h3>
                  {listData[0] &&
                    <ol className="top-cities">
                      {listData.map((item, index) => (
                        <li
                          key={index}
                          id={`city-${index + 1}`}
                          className={`animate__animated ${animateCitiesList ? 'animate__lightSpeedInRight' : ''}`}
                        >
                          {item.city}
                        </li>
                      ))}
                    </ol>}
                </div>
              </div>
            </aside>
          </div>

          <div className="table-responsive mt-4">
            <table className="table table-striped table-hover table-sm align-middle mb-0 table-numeric">
              <caption>List of top cities and sale amounts</caption>
              <thead className="table-dark">
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
                {tableData.slice(0, 10).map((row, index) => (
                  <tr key={row.city}>
                    <th scope="row">{index + 1}</th>
                    <td>{row.city}</td>
                    <td>{row.state_id}</td>
                    <td>{currency.format(row.total_volume * row.average_price)}</td>
                    <td>{currency.format(row.sm_4046 * row.average_price)}</td>
                    <td>{currency.format(row.l_4225 * row.average_price)}</td>
                    <td>{currency.format(row.xl_4770 * row.average_price)}</td>
                  </tr>
                ))}
              </tbody>}
            </table>
          </div>
        </section>

        <div className="prose">
          <h2 className="section-heading mt-0">What does this mean?</h2>
          <p>On the <span className="fw-bold">total sales view</span>, larger circle markings indicate a larger amount of Hass avocado sales for a selected year and size. So, the locations that have the largest markings also had the most sales, and locations that had the smallest markings had the least.</p>
          <p>On the <span className="fw-bold">sales over time</span> view, a positive slope on a line indicates that throughout a selected year, the Hass avocado sales increased for a selected size. Conversely, a negative slope indicates that a decrease in Hass avocado sales occurred. Locations that consistently presented a positive slope had a consistent increase in sales throughout the year, locations that consistently presented a negative slope had a consistent decrease, and locations whose slope fluctuated had varied success in sales.</p>
          <p>The list of the top 10 cities presents the cities in a given year where the most Hass avocado sales occurred of the chosen avocado size. These locations are also listed in the slots of the table. The table also contains all the cities that were included in our dataset in descending order, from cities with the most sales to cities with the least.</p>
          <p>Considering your selections (year: <span className="fw-bold">{selectedYear}</span>, size: <span className="fw-bold">{sizeSelectionWord}</span>)...</p>

          <h3 className="h6 fw-semibold mt-4">Total Sales View Explanation</h3>
          <p>There was a large range in the total Hass avocado sales between the cities with the most and  least sales! The 3 cities with the highest Hass avocado sales in {selectedYear} for {sizeSelectionWord} avocados were {listData[0] && <span className="fw-bold"> {tableData[0].city}, {tableData[1].city}, and {tableData[2].city}</span>}. {listData[0] && listData[0].city}, the top city in {selectedYear}, had a total of {listData[0] && Math.round(tableData[0].total_volume)} avocados sold during that year. That means that a total of ${tableData[0] && Math.round(tableData[0].total_volume * tableData[0].average_price)} was spent buying Hass avocados in {listData[0] && listData[0].city}! Not only was {listData[0] && listData[0].city} the top city in {selectedYear}, but it also was the city with the most avocado sales throughout 2015-2020!</p>

          <h3 className="h6 fw-semibold mt-4">Sales Over Time View Explanation</h3>
          <p>On the sales over time view, it can be observed that throughout a selected year, the sales fluctuated often. This could be due to how throughout months, avocados can become more or less popular. Considering factors such as when avocados are in season, or sudden trends or events can assist in understanding why sales can fluctuate during the year.</p>

          <h3 className="h6 fw-semibold mt-4">Table Explanation</h3>
          <p>The top 10 cities during {selectedYear} are displayed in the table. The total sales for each city is provided in  dollars, as well as the sales for each size of avocado (small/medium, large, and extra-large). According to the table, it seems that Los Angeles remained the city with the most amount of Hass avocado sales from 2015-2020!</p>

          <h2 className="section-heading">Conclusion</h2>
          <p>Now that exploration has been completed, some general conclusions can be drawn.</p>
          <p>The first set of conclusions will be stated according to the question proposed at the beginning - <span className="fw-bold">how has location in combination with the sales for Hass avocados changed over time?</span></p>
          <p>According to the map view, it can be observed that there is undoubtedly an increase in the total number of avocados sold, since moving the year slider towards the right results in an increased size for the circle markings.</p>
          <p>According to the sparkline view, it can also be seen that there is an increase in the number of avocados sold. This can be assumed because in many cities, including the cities that had the most Hass avocado sales (which is listed on the side of the map visualization), there was a positive overall change in the line.</p>
          <p>According to the table, it can be seen that location has a relationship with the total sales for Hass avocados. There was one city that maintained the most sales throughout 2015-2020 -- Los Angeles! In addition, the number two city also remained the same from 2015-2020 -- New York!</p>
          <p>Overall, it could be stated that there was apparent growth in Hass avocado sales throughout the United States. Notably, Los Angeles and New York demonstrated consistent increase in total sales from 2015-2020. It is possible that this trend of growing Hass avocado sales will continue not only in these cities, but throughout the United States. Especially considering how trends involving avocados are unquestionably going to persist, the sales for the most popular avocado - Hass avocados - will most likely persist as well.</p>

          <h2 className="section-heading">Considerations</h2>

          <h3 className="h6 fw-semibold mt-4">Interactions / Design Decisions Overview</h3>
          <p>Following the completion of assignment 3, we received feedback that helped us refine our visualization for our final project.</p>
          <p>To ensure interesting information is utilized, we chose to implement a toggle view on the map - one showing aggregated avocado sales per year and another showing change in sales over a year (by month) for each city.  This would be presented as centroid markings or sparklines on city locations, respectively.  In addition, a responsive list showing the top 10 cities was decided to be implemented to complement the map, along with a table that contains every city in our dataset and its total sales as well as the sales for the different sizes of avocados.</p>
          <p> Particularly, for the total sales view, we decided to standardize centroid markings with a min and max radius and include a tooltip with the city name, state and total sales (in dollars) for avocados sold for better understanding.</p>
          <p> Considering the sales over time view, we decided to plot a line with no axes at its respective location for each city.</p>
          <p>Another consideration we evaluated was regarding the flow of the page. To assist as well as enhance the exploration process, a narrative that will progress throughout the website and be responsive according to selection of year, size and toggle mode was decided to be implemented to guide the exploration of data.</p>
          <p>Lastly, considering the aesthetic and look of our visualization and page, we chose to incorporate a green color scheme to follow the avocado theme.</p>

          <h3 className="h6 fw-semibold mt-4">Development Process</h3>
          <p>Considering our development process, we began where assignment 3 left off. With initial data cleaning and the map already implemented, we started by performing more data cleaning to establish simplicity of our code with the new view (the sales over time sparkline).</p>
          <p>Our first created dataset (dataset 1) - with columns for city names (geography), latitude, longitude and a state ID (indicating what state this city is located in) joined with the main avocado dataset - was identified to be utilized by the sparkline visualization, since it included more detailed time data. A new dataset was created from dataset 1, and will be referenced in this explanation as dataset 2. Dataset 2 was determined to be used only for the total sales view (centroid markings) and was created by copying dataset 1, then manipulating the copy to only include columns that included attributes that contribute to exploration: city name, state name, year, latitude and longitude, average_price, total_volume, and the 3 different size columns (for small/medium, large, extra large). From here, the dataset was grouped by city and year, and summarized to get the total number of sales for each city for a particular year. In addition, bins were implemented to further organize data.</p>
          <p>Following this data cleaning process, work was split up to set up the framework for our visualization page, create and develop the narrative, implement the sparkline view, and fine-tune the centroid view. All aspects of the project were very time-consuming, especially when all of these moving parts had to complement each other.
          </p>
          <p>The narrative was formulated in consideration of both views, and was designed to evaluate results of both views. It was written to include aspects of storytelling, instruction and explanation.</p>
          <p>The centroid view (for total sales) involved a fair amount of re-working from assignment 3, given it had to utilize the newly created dataset. The responsive list of top cities and the tooltip that appears on hover took the most amount of time for the centroid view.</p>
          <p>The table under the map visualization also took a considerable amount of time, as it involved a series of  repetitive tasks. A calculation had to be performed to create this table in order to get the total sales in dollars, so the number of avocados sold was multiplied by the price. Additionally, making this table responsive to selections was quite difficult, and therefore required a lot of time as well.</p>
          <p>The sparkline was by far the most demanding task of them all. It required time data, and since the data in our dataset was organized by week, data had to be manipulated and summed up so monthly data was available. In addition, plotting the line seemed to be much more difficult than expected. To combat the potential crowding that could occur if all cities were presented, we decided to only present and utilize data from major cities (Los Angeles, New York, Seattle, San Francisco, Denver, Chicago, Houston)</p>
          <p>Lastly, the style of our page was implemented by our team to reflect the nature of avocados. So, a green color scheme was decided upon and incorporated throughout our website to make it more engaging.</p>

          <h2 className="section-heading">Citations</h2>
          <ul>
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
  )
}

export default Assignment4;
