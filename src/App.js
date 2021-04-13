import React from "react";

const viewHeight = 500;
const viewWidth = 500;

const App = () => {
    return <svg style={{border: "1px solid lightgrey", width: viewWidth, height: viewHeight}}>
        <circle cx={0} cy={viewHeight} r="5" />
        <p>This is working</p>
        <rect x="200" y="100" width="10" height="10" />
        <rect x={200} y={200} width={10} height={10} fill="rgb(230,230,230)" />
        <rect x={212} y={200} width={10} height={10} fill="rgb(230,230,230)" />
        <rect x={224} y={200} width={10} height={10} fill="rgb(230,230,230)" />
        <rect x={236} y={200} width={10} height={10} fill="rgb(230,230,230)" />
        <rect x={248} y={200} width={10} height={10} />
        <line x1="20" y1={viewHeight - 50} x2="150" y2="100" stroke="black" />
        <text x="20" y="35" class="small" style={{font: "italic 13px sans- serif"}}>
            Price history of 100 randomly selected Pokemon cards
        </text>
    </svg>;
    // return <div>Hello from react</div>;
};

export default App;
