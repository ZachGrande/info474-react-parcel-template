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

            <p>This bar chart compares the number of movies in each genre. We can identify Comedy, Adventure, and Drama movies as the most common Disney films, with each category having over 100 movies. The trend steadily declines as the subsequent categories all have 40 or less movies. The bar chart affords us the view of what Disney believes its most popular genres are, based on how many they have made. The data was filtered to exclude null values and an additional numerical variable, "Number of Movies," was created to represent the sum of records for each genre.</p>
            
            <iframe src="https://10ay.online.tableau.com/t/zachgrande/views/Assignment2/Sheet2?:origin=card_share_link&:embed=yes" width="800" height="600"></iframe>

            <p>This bar chart shows a similar view as the last, but here we can see the gross income of each genre. The largest difference here is that we can see which genres the <em>public</em> favors, instead of the studio. Money invested by consumers in each genre shows which types of movies they value, which in turn may eduate the types of movies Disney produces moving forward. The data is sorted to bring prominence to the most popular genres, and the graph is constructued in such a way that each genre represents the sum income of films contained in them.</p>

            <h2>2. Which MPAA ratings garner the most income?</h2>

            <iframe src="https://10ay.online.tableau.com/t/zachgrande/views/Assignment2/Sheet3?:embed=yes&:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link" width="800" height="600"></iframe>

            <p>In our second analysis question, we are searching to find which MPAA rating from Disney has made the most money. A key element to this question is to find how many movies belong to each MPAA rating. Since most of the movies Disney has made are rated PG, it could stand to reason that PG movies have made the most money. Further analysis can either confirm or debunk this hypothesis. In this graph, movies were binned by MPAA rating to provide the "Number of Movies" numerical attribute.</p>

            <iframe src="https://10ay.online.tableau.com/t/zachgrande/views/Assignment2/Sheet4?:embed=yes&:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link" width="800" height="600"></iframe>

            <p>This side-by-side bar chart investigates the income generated from each MPAA rating. Here, gross income <b>and</b> gross income adjusted for inflation are displayed. The graph is sorted for inflation-adjusted income since it is more relevant to our analysis. Purely looking at this attribute, the G rating is clearly the highest grossing category. This debunks our hypothesis, showing that fewer movies were able to generate more money than the PG rating. However, the orange bars for unadjusted income show PG as the highest grossing category.</p>

            <iframe src="https://10ay.online.tableau.com/t/zachgrande/views/Assignment2/Sheet8?:embed=yes&:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link" width="800" height="600"></iframe>

            <p>This table serves as a further exploration into the last chart. The top ten highest grossing movies (with income adjusted for inflation) are displayed and sorted by release year. In this list, the top five movies are released in or before the year 1950. This could explain our dichotomy from the last graph, as we know older movies are affected by a larger inflation factor. This chart confirms that some of Disney's most popular films were created over 60 years ago, so many of these values will be affected by inflation. Only one film on the list was made in the 21st century.</p>

            <h2>3. How has the most popular genre changed over time?</h2>

            <br></br>
            <br></br>
            <p>All visualizations can be found in the <code>src/img</code> directory of the repository.</p>
            <p>The assignment was originally built in Vega-Lite: <a href="https://observablehq.com/@zachgrande/info-474-assignment-2">https://observablehq.com/@zachgrande/info-474-assignment-2</a></p>
        </div>
    )
}

export default Assignment2;