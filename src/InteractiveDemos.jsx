import { useState } from 'react';
import { useFetch } from "./hooks/useFetch";
import { scaleLinear } from "d3-scale";
import { extent, bin } from "d3-array";
import PageHeader from "./components/PageHeader";
import LoadingNotice from "./components/LoadingNotice";

function InteractiveDemos() {

    const [data, loading] = useFetch(
        // "https://raw.githubusercontent.com/ZachGrande/info474-react-parcel-template/master/disney_movies.csv"
        "https://raw.githubusercontent.com/colinmegill/react-parcel-starter/main/weather.csv"
    );

    const [selectedStation, setSelectedStation] = useState(
        "RALEIGH DURHAM INTL AP"
    );

    const dataSmallSample = data.slice(0, 5000);
    const TMAXextent = extent(dataSmallSample, (d) => {
        return +d.TMAX;
    });

    const projection = d3.geoNaturalEarth1();
    const path = d3.geoPath(projection);

    const size = 500;
    const margin = 20;
    const axisTextAlignmentFactor = 3;
    const yScale = scaleLinear()
        .domain(TMAXextent) // unit: km
        .range([size - margin, size - 350]); // unit: pixels

    let _bins = bin().thresholds(30);
    let tmaxBins = _bins(
        dataSmallSample.map((d) => {
            return +d.TMAX;
        })
    );

    const histogramLeftPadding = 20;

    return (
        <div className="container page">
            <PageHeader
                eyebrow="Class demo"
                title="Interactive Demos"
                subtitle="Hover over a line to highlight every measurement from the same weather station."
            />
            <LoadingNotice show={loading}>Loading weather data…</LoadingNotice>

            <section className="surface-card p-3 p-md-4" style={{ maxWidth: 560 }}>
                <h2 className="h5 mb-3">
                    Barcode plot TMAX at Kalispell Glacier (sounds cold, expect it to be
                    lower than average)
                </h2>
                <div className="viz-frame viz-square">
                    <svg viewBox={`0 0 ${size} ${size}`}>
                        <text
                            x={size / 2 - 12}
                            textAnchor="end"
                            y={size - margin + axisTextAlignmentFactor}
                            style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}
                        >
                            0
                        </text>
                        <text
                            x={size / 2 - 12}
                            textAnchor="end"
                            y={size - margin - 100 + axisTextAlignmentFactor}
                            style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}
                        >
                            100
                        </text>
                        <line
                            x1={size / 2 - 10}
                            y1={size - margin - 100}
                            x2={size / 2 - 5}
                            y2={size - margin - 100}
                            stroke={"black"}
                        />
                        <line
                            x1={size / 2 - 10}
                            y1={size - margin}
                            x2={size / 2 - 5}
                            y2={size - margin}
                            stroke={"black"}
                        />
                        {data.slice(0, 1000).map((measurement, index) => {
                            const highlight = measurement.station === selectedStation;
                            return (
                                <line
                                    key={index}
                                    onMouseEnter={() => {
                                        setSelectedStation(measurement.station);
                                    }}
                                    x1={size / 2}
                                    y1={size - margin - measurement.TMAX}
                                    x2={highlight ? size / 2 + 30 : size / 2 + 20}
                                    y2={size - margin - measurement.TMAX}
                                    stroke={highlight ? "red" : "steelblue"}
                                    strokeOpacity={highlight ? 1 : 0.1}
                                >
                                    <title>{measurement.station}</title>
                                </line>
                            );
                        })}
                        <text
                            x={size - 200}
                            y={size - margin}
                            style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}
                        >
                            {selectedStation}
                        </text>
                    </svg>
                </div>
                <p className="small text-secondary mt-3 mb-0">
                    Selected station: <span className="fw-semibold text-body">{selectedStation}</span>
                </p>
            </section>
        </div>
    )
}

export default InteractiveDemos;
