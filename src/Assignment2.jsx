import React from 'react';
import { VegaLite } from 'react-vega';
import { useFetch } from "./hooks/useFetch";

function Assignment2() {

    const [data, loading] = useFetch(
        "https://raw.githubusercontent.com/ZachGrande/info474-react-parcel-template/master/disney_movies.csv"
    );

    const viewWidth = 800;
    const viewHeight = 600;
    const validGenres = [
        "Comedy",
        "Adventure",
        "Drama",
        "Action",
        "Thriller/Suspense",
        "Romantic Comedy",
        "Musical",
        "Documentary",
        "Western",
        "Horror",
        "Black Comedy",
        "Concert/Performance"
    ];
    
    const validMPAARatings = [
        "G",
        "PG",
        "PG-13",
        "R",
        "Not Rated"
    ];

    const topMovies = [
        "Snow White and the Seven Dwarfs",
        "Fantasia",
        "Pinocchio",
        "Song of the South",
        "Cinderella",
        "Lady and the Tramp",
        "101 Dalmatians",
        "The Jungle Book",
        "The Lion King",
        "Star Wars Ep. VII: The Force Awakens"
    ];
    
    const visOne = {
        title: "Number of Movies Per Genre",
        width: viewWidth,
        height: viewHeight,
        description: "Visualization 1",
        mark: {
            type: "bar",
            tooltip: true
        },
        data: {
            // "url":"https://raw.githubusercontent.com/ZachGrande/info474-react-parcel-template/master/disney_movies.csv"
            values: data
        },
        transform: [{
            filter: {
                field: "genre",
                oneOf: validGenres,
            }
        }],
        encoding: {
            x: {
                field: "genre",
                type: "nominal",
                title: "Genre",
                sort: "-y"
            },
            y: {
                aggregate: "count",
                type: "quantitative",
                title:"Number of Movies"
            },
            color: {
                aggregate: "count",
                type: "quantitative",
                title: "Number of Movies"
            }
        }
    };

    const visTwo = {
        title: "Total Income (Adjusted for Inflation) Per Genre",
        width: viewWidth,
        height: viewHeight,
        description: "Visualization 2",
        mark: {
            type: "bar",
            tooltip: true
        },
        data: {
            // "url":"https://raw.githubusercontent.com/ZachGrande/info474-react-parcel-template/master/disney_movies.csv"
            values: data
        },
        transform: [{
            filter: {
                field: "genre",
                oneOf: validGenres,
            }
        }],
        encoding: {
            x: {
                field: "genre",
                type: "nominal",
                title: "Genre",
                sort: "-y"
            },
            y: {
                aggregate: "sum",
                field: "inflation_adjusted_gross",
                title: "Inflation Adjusted Gross",
                axis: {
                    format: "$,B"
                }
            },
            color: {
                aggregate: "sum",
                field: "inflation_adjusted_gross",
                title: "Inflation Adjusted Gross"
            }
        }
    };
    
    const visThree = {
        title: "Total Movies Per MPAA Rating",
        width: viewWidth,
        height: viewHeight,
        description: "Visualization 3",
        mark: {
            type: "bar",
            tooltip: true
        },
        data: {
            // "url":"https://raw.githubusercontent.com/ZachGrande/info474-react-parcel-template/master/disney_movies.csv"
            values: data
        },
        transform: [{
            filter: {
                field: "mpaa_rating",
                oneOf: validMPAARatings,
            }
        }],
        encoding: {
            x: {
                field: "mpaa_rating",
                type: "nominal",
                title: "MPAA Rating",
                sort: "-y"
            },
            y: {
                aggregate: "count",
                type: "quantitative",
                title:"Number of Movies"
            }
        }
    };

    const visFourOne = {
        title: "Total Income (Adjusted for Inflation) Per MPAA Rating",
        width: viewWidth,
        height: viewHeight,
        description: "Visualization 4.1",
        mark: {
            type: "bar",
            tooltip: true
        },
        data: {
            // "url":"https://raw.githubusercontent.com/ZachGrande/info474-react-parcel-template/master/disney_movies.csv"
            values: data
        },
        transform: [{
            filter: {
                field: "mpaa_rating",
                oneOf: validMPAARatings,
            }
        }],
        encoding: {
            x: {
                field: "mpaa_rating",
                type: "nominal",
                title: "MPAA Rating",
                sort: "-y"
            },
            y: {
                aggregate: "sum",
                field: "inflation_adjusted_gross",
                type: "quantitative",
                title:"Income (in Dollars)",
                format: "$,B"
            }
        }
    };

    const visFourTwo = {
        title: "Total Income (NOT Adjusted for Inflation) Per MPAA Rating",
        width: viewWidth,
        height: viewHeight,
        description: "Visualization 4.2",
        mark: {
            type: "bar",
            tooltip: true
        },
        data: {
            // "url":"https://raw.githubusercontent.com/ZachGrande/info474-react-parcel-template/master/disney_movies.csv"
            values: data
        },
        transform: [{
            filter: {
                field: "mpaa_rating",
                oneOf: validMPAARatings,
            }
        }],
        encoding: {
            x: {
                field: "mpaa_rating",
                type: "nominal",
                title: "MPAA Rating",
                sort: "-y"
            },
            y: {
                aggregate: "sum",
                field: "total_gross",
                type: "quantitative",
                title:"Income (in Dollars)",
                format: "$,B"
            }
        }
    };

    const visFive = {
        title: "Total Movies Per MPAA Rating",
        width: viewWidth,
        height: viewHeight,
        description: "Visualization 5",
        mark: {
            type: "rect",
            tooltip: true
        },
        data: {
            // "url":"https://raw.githubusercontent.com/ZachGrande/info474-react-parcel-template/master/disney_movies.csv"
            values: data
        },
        transform: [{
            filter: {
                field: "movie_title",
                oneOf: topMovies,
            }
        }],
        encoding: {
            x: {
                field: "movie_title",
                type: "nominal",
                title: "Movie Title",
                sort: "y"
            },
            y: {
                field: "release_date",
                type: "temporal",
                title:"Year of Release Date",
                timeUnit: "year"
            },
            color: {
                field: "inflation_adjusted_gross",
                type: "quantitative",
                title: "Inflation Adjusted Gross Income",
                scale: {
                    range: ["white", "black"]
                },
                format: "$,B"
            }
        },
        config: {
            axis: {
                grid: true,
                tickBand:  "extent"
            }
        }
    };

    const visSix = {
        title: "Inflation Adjusted Gross Income Per Year",
        width: viewWidth,
        height: viewHeight,
        description: "Visualization 6",
        mark: {
            type: "line",
            tooltip: true,
            interpolate: "monotone"
        },
        data: {
            // "url":"https://raw.githubusercontent.com/ZachGrande/info474-react-parcel-template/master/disney_movies.csv"
            values: data
        },
        encoding: {
            x: {
                field: "release_date",
                type: "temporal",
                title:"Release Date",
                timeUnit: "year"
            },
            y: {
                aggregate: "sum",
                field: "inflation_adjusted_gross",
                type: "quantitative",
                title:"Inflation Adjusted Gross",
            }
        }
    };

    const visSeven = {
        title: "Snow White Scorecard",
        width: viewWidth,
        height: viewHeight,
        description: "Visualization 7",
        mark: {
            type: "bar",
            tooltip: true
        },
        data: {
            // "url":"https://raw.githubusercontent.com/ZachGrande/info474-react-parcel-template/master/disney_movies.csv"
            values: data
        },
        transform: [{
            filter: {
                field: "movie_title",
                oneOf: ["Snow White and the Seven Dwarfs"]
            }
        }],
        encoding: {
            x: {
                field: "movie_title",
                type: "nominal",
                title: "Movie Title"
            },
            y: {
                field: "inflation_adjusted_gross",
                type: "quantitative",
                title:"Inflation Adjusted Gross",
                format: "$,B"
            }
        },
        layer: [{
            mark: "bar"
        }, {
            mark: {
                type: "text",
                baseline: "middle",
                dy: -5
            },
            encoding: {
                text: {
                    field: "release_date",
                    type: "temporal",
                    timeUnit: "year"
                }
            }
        }]
    };

    const visEight = {
        title: "Inflation Adjusted Gross Income by Genre Per Year",
        width: viewWidth,
        height: viewHeight,
        description: "Visualization 8",
        mark: {
            type: "line",
            tooltip: true,
            interpolate: "monotone"
        },
        data: {
            // "url":"https://raw.githubusercontent.com/ZachGrande/info474-react-parcel-template/master/disney_movies.csv"
            values: data
        },
        transform: [{
            filter: {
                field: "genre",
                oneOf: validGenres,
            }
        }],
        encoding: {
            x: {
                field: "release_date",
                type: "temporal",
                title:"Release Date",
                timeUnit: "year"
            },
            y: {
                field: "inflation_adjusted_gross",
                type: "quantitative",
                title:"Inflation Adjusted Gross",
                format: "$,B"
            },
            color: {
                field: "genre",
                type: "nominal",
                title: "Genre",
                sort: "color"
            }
        }
    };
    
    return (
        <div>
        <h1>Assignment 2: Exploratory Visual Analysis</h1>
        <h2>Zach Grande, INFO 474, Spring 2021</h2>
        <p>{loading && "Loading Disney movie data..."}</p>
        <h3>The Data</h3>
        <p>This dataset represents a catalogue of 573 films created by Disney from 1937 to 2016. I am interested in working with this dataset because it spans a long period of time (December 1937 to December 2016) and represents a tremendously successful studio. There are several intersections that can be examined (movie genre popularity over time, MPAA rating vs. gross income, etc.) that offer many unique examinations into this dataset.</p>
        <h4>Analysis Questions:</h4>
        <ol>
        <li>Which movie genre is the most popular?</li>
        <li>Which MPAA ratings garner the most income?</li>
        <li>How has the most popular genre changed over time?</li>
        </ol>
        <h2>1. Which movie genre is the most popular?</h2>
        
        {/* <iframe src="https://10ay.online.tableau.com/t/zachgrande/views/Assignment2/Sheet1?:embed=yes&:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link" width="800" height="600"></iframe> */}
        
        <VegaLite spec={visOne} />
        
        <p>This bar chart compares the number of movies in each genre. We can identify Comedy, Adventure, and Drama movies as the most common Disney films, with each category having over 100 movies. The trend steadily declines as the subsequent categories all have 40 or less movies. The bar chart affords us the view of what Disney believes its most popular genres are, based on how many they have made. The data was filtered to exclude null values and an additional numerical variable, "Number of Movies," was created to represent the sum of records for each genre.</p>
        
        {/* <iframe src="https://10ay.online.tableau.com/t/zachgrande/views/Assignment2/Sheet2?:origin=card_share_link&:embed=yes" width="800" height="600"></iframe> */}
        
        <VegaLite spec={visTwo} />
        
        <p>This bar chart shows a similar view as the last, but here we can see the gross income of each genre. The largest difference here is that we can see which genres the <em>public</em> favors, instead of the studio. Money invested by consumers in each genre shows which types of movies they value, which in turn may eduate the types of movies Disney produces moving forward. The data is sorted to bring prominence to the most popular genres, and the graph is constructued in such a way that each genre represents the sum income of films contained in them.</p>
        
        <h2>2. Which MPAA ratings garner the most income?</h2>
        
        {/* <iframe src="https://10ay.online.tableau.com/t/zachgrande/views/Assignment2/Sheet3?:embed=yes&:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link" width="800" height="600"></iframe> */}
        
        <VegaLite spec={visThree} />
        
        <p>In our second analysis question, we are searching to find which MPAA rating from Disney has made the most money. A key element to this question is to find how many movies belong to each MPAA rating. Since most of the movies Disney has made are rated PG, it could stand to reason that PG movies have made the most money. Further analysis can either confirm or debunk this hypothesis. In this graph, movies were binned by MPAA rating to provide the "Number of Movies" numerical attribute.</p>
        
        {/* <iframe src="https://10ay.online.tableau.com/t/zachgrande/views/Assignment2/Sheet4?:embed=yes&:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link" width="800" height="600"></iframe> */}

        <VegaLite spec={visFourOne} />
        <VegaLite spec={visFourTwo} />
        
        <p>These two bar charts investigate the income generated from each MPAA rating. Here, gross income <b>and</b> gross income adjusted for inflation are displayed. The graphs are each sorted for their unique attribute of income so we can compare them. Looking at these attributes, the G rating is clearly the highest grossing category with adjusting for inflation. This debunks our hypothesis, showing that fewer movies were able to generate more money than the PG rating. However, the second graph for unadjusted income show PG as the highest grossing category.</p>
        
        {/* <iframe src="https://10ay.online.tableau.com/t/zachgrande/views/Assignment2/Sheet8?:embed=yes&:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link" width="800" height="600"></iframe> */}

        <VegaLite spec={visFive} />
        
        <p>This time table serves as a further exploration into the last chart. The top ten highest grossing movies (with income adjusted for inflation) are displayed and sorted by release year. In this list, the highest grossing movies, noted by the depth of black in their bars, are released in or before the year 1961. This could explain our dichotomy from the last graphs, as we know older movies are affected by a larger inflation factor. This chart confirms that some of Disney's most popular films were created over 60 years ago, so many of these values will be affected by inflation. Only one film on the list was originally made in the 21st century.</p>
        
        <h2>3. How has the most popular genre changed over time?</h2>
        
        {/* <iframe src="https://10ay.online.tableau.com/t/zachgrande/views/Assignment2/Sheet5?:embed=yes&:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link" width="800" height="600"></iframe> */}

        <VegaLite spec={visSix} />
        
        <p>For our third question, we are introducing time as a core element of our visualizations. To get our bearings, this graph plots the gross income of Disney by year. We can see that there is a strong outlier in the opening year, 1937. The graph stabilizes after this point, and we can generally identify an increase in gross income throughout the history of Disney's existence.</p>
        
        {/* <iframe src="https://10ay.online.tableau.com/t/zachgrande/views/Assignment2/Sheet6?:embed=yes&:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link" width="800" height="600"></iframe> */}

        <VegaLite spec={visSeven} />
        
        <p>This scorecard investigates the outlier from the last visualization. Snow White and the Seven Dwarfs is arguably one of Disney's most popular films, having garnered <b>$5.2 BILLION</b> in the box office. When put into context, we can understand why the year 1937 is such a massive outlier in the previous visualization.</p>
        
        {/* <iframe src="https://10ay.online.tableau.com/t/zachgrande/views/Assignment2/Sheet7?:embed=yes&:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link" width="800" height="600"></iframe> */}

        <VegaLite spec={visEight} />
        
        <p>This visualization utilizes several attributes from the Disney Movies dataset as we seek to answer our third analysis question. First, movies have been grouped into their respective genres. This allows us to aggregate the income for each genre into a single numerical value that we can plot against time. There is no clear "winner" for most popular genre, but we can see that Musical, Comedy, and Adventure (respectively) had all had their time to shine.</p>
        
        <br></br>
        
        <h2>Write-Up</h2>
        <p>The questions I came up with were:</p>
        <ol>
        <li>Which movie genre is the most popular?</li>
        <li>Which MPAA ratings garner the most income?</li>
        <li>How has the most popular genre changed over time?</li>
        </ol>
        <p>A common theme in my visualizations is that the idea of "popular" was left vague. This was intentional, as it could refer to how many movies were made or which movies earned the most money. Early on, it was clear that these inquiries lead to different results.</p>
        
        <p>I did my best to leverage the most unique variables, genre, rating, and gross income, against each other in the first two questions often. Different grouping techniques showed really interesting traits of the data, like how G-rated movies have gained the most money, but are not the most common type of film made.</p>
        
        <p>I knew that I wanted to bring time into the equation once we had a good grip on the dataset. Common transformations that we had established were cutting out null values, aggregating movie incomes, and binning movies into digestible categories (such as genre or rating). These were necessary techniques to continue using in the release year exploration since there are so many dimensions of data at play.</p>
        
        <p>Overall, I've learned that different interpretations of sentences can lead to varying outcomes. When two people are talking about popular categories of film, how can they be sure that they have the same understanding of "popular"? With this same spirit, comparisons of income can get messy when the temporal dimension is introduced. There is obviously a difference between "income" and "inflation-adjusted income," which I have become very familiar with. One thing we can be certain of is that Comedy and Adventure movies are wildly popular across Disney's history, in every sense of the word.</p>

        <br></br>

        <h2>Peer Feedback</h2>
        <p>Initially I used a pointer to mark the three most popular genres for the first two visualizations. These accompanied my captions, which explicitly labeled them.</p>
        <p>My peers noted this labeling within the graph was redundant and could be expressed in a better way.</p>
        <p>To address their feedback, I used a color gradient to show the prominence of the most popular movies. The dark blue shows a high record count, and light blue shows a low record count. The labels are no longer needed, and the viewer can see the first three bars as being both taller and darker.</p>
        
        <br></br>
        <p>All visualizations can be found in the <a href="https://github.com/ZachGrande/info474-react-parcel-template/tree/master/src/img/vega"><code>src/img/vega</code></a> directory of the repository.</p>
        <p>The assignment was originally visualized in Tableau and built in Observable with Vega-Lite: <a href="https://observablehq.com/@zachgrande/info-474-assignment-2">https://observablehq.com/@zachgrande/info-474-assignment-2</a></p>
        </div>
        )
    }
    
    export default Assignment2;