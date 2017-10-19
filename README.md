# Data scraper

Scraper of Football API.

This script get some JSON documents from [Football API](http://api.football-data.org/index) and inserts on your local instance of MongoDB. This script was developed only for testing purposes.

## Requirements

1. `mongod` up and running, which can be installed from [here](https://www.mongodb.com/download-center?jmp=nav#community).
2. `node >= 6.x.x` up and running
3. `npm >= 3.x.x` up and running

## Instructions

Execute the following command on the app root directory to install dependencies:

```
npm install
```

Then, to start the script, simply execute:

```
npm start
```

If everything was ok, you will see some messages related to insertions on database.