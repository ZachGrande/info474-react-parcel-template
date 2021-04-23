import React from 'react';
// import {createClassFromLiteSpec} from 'react-vega-lite';

function Assignment2() {

    printTable(cars.slice(0, 5));

    return (
        <div>
            <p>Hello there!</p>
        </div>
    )
}

export default Assignment2;
// export default Assignment2('BarChart', {
//     "description": "A simple bar chart with embedded data.",
//     "mark": "bar",
//     "encoding": {
//       "x": {"field": "a", "type": "ordinal"},
//       "y": {"field": "b", "type": "quantitative"}
//     }
// });