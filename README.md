# Twitter Count

[![Netlify Status](https://api.netlify.com/api/v1/badges/427e4685-87ff-40d7-aec5-6627aef5c4f0/deploy-status)](https://app.netlify.com/sites/festive-haibt-f1c272/deploys)

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
    - [ ] window history pushState on GET user
    - [ ] handle querystring on app init
    - [ ] button to copy the window url bar
    - [ ] put app state (like replies and sort toggles) into querystring
- Tweet modal
    - [x] Avoid closing the modal on click (user can't interact with videos etc)
    - [ ] Bug - Modal's tweet top overflows on desktop when the tweet is long
- App
    - [x] make only header parameters sticky positioned
    - [x] refetch a user's data onClicking "search" if an error occurred on the previous attempt (currently, will refetch onclick only when search input is changed)
    - [x] display profile pic and if verified of current user in user card
    - [x] production build third-party font face and some normalize css isn't present
    - [x] graphic placeholders for noUser, loadingData and dataLoadErr states
    - [x] put twitter icon somewhere
    - [x] polish up UI styles
    - [x] different error feedback for the different kinds of errors
    - [ ] fork me
    - [ ] user card profile image placeholder
