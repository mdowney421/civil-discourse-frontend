# Civil Discourse - *fact-based discussion in a conspiratorial world*

## Overview
Civil Discourse is a social media site with the intent of minimizing misinformation. Here's how it works:
* Users are presented with current news articles from reputable sources that are retrieved from an API.
* Users can like, dislike, or comment on the articles.
* Users have the ability to downvote other users' comments that they deem to be misinformative, conspiratorial, irrelevant, etc.
* The half of comments with the most downvotes get hidden from view.

The app was built with a PERN stack and features user auth but does not have password encryption yet.

## How To Use
Back end repository: https://github.com/mdowney421/civil-discourse-backend
Deployed application: https://civil-discourse-frontend.herokuapp.com/

## Technologies Used
* HTML
* CSS
* JavaScript
* React
* Express
* Node
* PostgreSQL
* Heroku
* Git / GitHub

## Unsolved Issues and Lessons Learned
* After retrieving news articles from the API, the app then posts them to the database. This action led to numerous pending post requests that took time to either complete or fail. These pending post requests bogged down the app rendering it non-functional until they had completed. This was mostly fixed through additional logic in the function and changing the post request to HTTP instead of HTTPS. The CORS errors still appear in the console but the application works.
