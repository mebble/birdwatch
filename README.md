# Birdwatch

[![Netlify Status](https://api.netlify.com/api/v1/badges/427e4685-87ff-40d7-aec5-6627aef5c4f0/deploy-status)](https://app.netlify.com/sites/festive-haibt-f1c272/deploys)

See it live: [birdwatch.netlify.com](https://birdwatch.netlify.com)

## What Is It?

A web application for someone who likes to look at how popular people's tweets got.

- Get a user's tweets and see how many likes and retweets they got
- Visualise data using D3.js
- Client-side routing
- Can copy application state into permalink
- Data served by a serverless netlify-lambda backend that talks to the Twitter API

## TODOs

- User search
    - [x] Debounce search suggestions
    - [x] Get user profile img url, verified status etc on search, even when no suggestion is found
    - [x] Avoid fetching suggestions on backspace and if matches current suggestions
    - [ ] Display profile pic and if user is verified in search suggestions
    - [ ] loader feedback on search suggestions
- Graph
    - [x] Separate graphs for favourites and retweets
    - [x] Filter bars with replies toggle
    - [x] Sort bars in descending order toggle
    - [x] More data on request
    - [x] Different bar colour for replies and non-replies
    - [x] log scale toggle
    - [x] loader feedback on "more" fetching
    - [x] abbreviate the bar chart numbers
    - [ ] cache the toggle states and invalidate on fetching new data
    - [ ] display dates for first and last tweets
    - [ ] Display text for desktop and mobile landscape
    - [ ] Rescale graph on screen orientation change
    - [ ] show error on failing to fetch "more" data
    - [ ] stacked bar chart for favourites and retweets
- Window history
    - [x] handle querystring on app init
    - [x] put app state (like replies and sort toggles) into window history and querystring on user search
    - [x] restore app state from window history on browser forward/back button
    - [x] button to copy the window url bar (permalink)
    - [x] window.history replacestate instead of pushstate on app init
    - [ ] make the exact view of the bar data encodable in the url
- Tweet modal
    - [x] Avoid closing the modal on click (user can't interact with videos etc)
    - [ ] Bug - Modal's tweet top overflows on desktop when the tweet is long
    - [ ] Bug - Modal's loader renders only when the first tweet is loading
- App
    - [x] make only header parameters sticky positioned
    - [x] refetch a user's data onClicking "search" if an error occurred on the previous attempt (currently, will refetch onclick only when search input is changed)
    - [x] display profile pic and if verified of current user in user card
    - [x] production build third-party font face and some normalize css isn't present
    - [x] graphic placeholders for noUser, loadingData and dataLoadErr states
    - [x] put twitter icon somewhere
    - [x] polish up UI styles
    - [x] different error feedback for the different kinds of errors
    - [x] button to explain how to use app (in a modal)
    - [x] credits
    - [ ] user card profile image placeholder
    - [ ] try out system fonts (create-react-app's font-family)
