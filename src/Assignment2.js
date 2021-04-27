import React from 'react';
// import {createClassFromLiteSpec} from 'react-vega-lite';

function Assignment2() {
    return (
        <div>
            <h1>Assignment 2: Exploratory Visual Analysis</h1>
            <h2>Zach Grande, INFO 474, Spring 2021</h2>
            <h3>The Data</h3>
            <p>This dataset represents a catalogue of 573 films created by Disney from 1937 to 2016. I am interested in working with this dataset because it spans a long period of time (December 1937 to December 2016) and represents a tremendously successful studio. There are several intersections that can be examined (movie genre popularity over time, MPAA rating vs. gross income, etc.) that offer many unique examinations into this dataset.</p>
            <h4>Analysis Questions:</h4>
            <ol>
                <li>Which movie genre is the most popular?</li>
                <li>Which MPAA ratings garner the most income?</li>
                <li>How has the most popular genre changed over time?</li>
            </ol>
            <h2>1. Which movie genre is the most popular?</h2>

            <iframe src="https://10ay.online.tableau.com/t/zachgrande/views/Assignment2/Sheet1?:embed=yes&:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link" width="800" height="600"></iframe>

            <p>This bar chart compares the number of movies in each genre. We can identify Comedy, Adventure, and Drama movies as the most common Disney films, with each category having over 100 movies. The trend steadily declines as the subsequent categories all have 40 or less movies. The bar chart affords us the view of what Disney believes its most popular genres are, based on how many they have made.</p>
            
            <iframe src="https://10ay.online.tableau.com/t/zachgrande/views/Assignment2/Sheet2?:origin=card_share_link&:embed=yes" width="800" height="600"></iframe>

            <p>This bar chart shows a similar view as the last, but here we can see the gross income of each genre. The largest difference here is that we can see which genres the <em>public</em> favors, instead of the studio. Money invested by consumers in each genre shows which types of movies they value, which in turn may eduate the types of movies Disney produces moving forward.</p>
            <h2>2. Which MPAA ratings garner the most income?</h2>

            <p></p>
            <p>All images can be found in the <code>src/img</code> directory of the repository.</p>
            <p>The assignment was originally built in Vega-Lite: <a href="https://observablehq.com/@zachgrande/info-474-assignment-2">https://observablehq.com/@zachgrande/info-474-assignment-2</a></p>
        </div>
    )
}

export default Assignment2;