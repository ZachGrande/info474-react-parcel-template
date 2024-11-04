function HomePage() {
    return (
        <div className="container">
            <p>This is the main page!</p>
            <svg style={{ border: "1px solid lightgrey", width: 500, height: 500 }}>
                <circle cx={0} cy={"500"} r="5" />
                <rect x="200" y="100" width="10" height="10" />
                <rect x={200} y={200} width={10} height={10} fill="rgb(230,230,230)" />
                <rect x={212} y={200} width={10} height={10} fill="rgb(230,230,230)" />
                <rect x={224} y={200} width={10} height={10} fill="rgb(230,230,230)" />
                <rect x={236} y={200} width={10} height={10} fill="rgb(230,230,230)" />
                <rect x={248} y={200} width={10} height={10} />
                <line x1="20" y1={500 - 50} x2="150" y2="100" stroke="black" />
                <text x="20" y="35" className="small" style={{ font: "italic 13px sans- serif" }}>
                    Price history of 100 randomly selected Pokemon cards
                    Changed the name of the repo
                        </text>
            </svg>
        </div>
    )
}

export default HomePage;