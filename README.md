# react-router-fetch-data-demo

Batteries included demo of full react stack rendering on server and client, based on OpenWeather API. 

## Features

- Async data fetching via `react-router`
- Using up to date react `0.13.1`
- Server side rendering inside EJS-powered express app
- Cached external API via redis, again mounted inside express
- Static assets mounted inside express and created via gulp
- React view-controller style components fetching data behind promises
- Webpack build process with cached incremental builds via persistent gulp task
- bootstrap data sent to client after server has finished rendering avoiding API hits on the client for first run (so called `rehydration`)

## Take it for a spin

- requires a redis instance available on default port
- `npm install` then `gulp`, app becomes available on `http://localhost:8080`

## todo

- Implement fluxy unidirectional data stores
- Implement fluxy actions 
- Both above instead of direct access to ampersand data
- Cleanup data flow generally
- UI 
- Config
- Demonstrate use of `continuation-local-storage` for user tokens inside async process

