# corpo-food

## Installation
- Clone the repo
- Run `npm install` in main repo folder
- There are two scripts to run the app:
  - `npm start` - starts the server (needs manual restart after making changes)
  - `npm run build` - builds the client part of the app using webpack
- Install mongo if you want to use local db server
- Setup config file (src/config.dist.js) and change its name to config.js

## Development

### Additional package.json scripts

- `npm run build:dev` - runs webpack in `watch mode`
- `npm run lint` - runs linter
- `npm test` - runs unit tests using `tape`

### MongoDB
Heartily recommend using dockers, they are great!

on linux

- get the mongo docker image `docker pull mongo`
- run it with something like `docker run --rm -p 127.0.0.1:27017:27017 mongo`
- ??
- profit!

if you don't want to use mongo's REST API to administer your local mongodb, consider one of the following:

- [robomongo](https://robomongo.org/) - very robust, cross-platform
- [admin-mongo](https://github.com/mrvautin/adminMongo) - web-based, lightweight, requires npm

default mongodb connection string (without user or password) is `mongodb://localhost:27017`
