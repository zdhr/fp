# DCS Flight Planner

Tool for mission planning for [DCS](https://www.digitalcombatsimulator.com/en/)

## Installation
Just `$ yarn`  / `npm install`.
This assumes recent [Node.js](https://nodejs.org/en) and either [Yarn (1)](https://yarnpkg.com/) or [NPM](https://www.npmjs.com/) is present.

Then open `index.html` in `www` directory. No webserver is necessary.

There is also live demo on http://zdenekhruska.cz/fp. You can load one of demo mission via UI or you can upload one of these.
- http://zdenekhruska.cz/fp/demo/op_twr_of_bab.miz
- http://zdenekhruska.cz/fp/demo/strike_on_melez.miz

## Usage / Features

### Mission load
![image](https://github.com/zdhr/fp/assets/2974124/2a24ecc5-a4f3-44cb-8e36-d5c3abcdf1ac)

Upload `.miz` file here or load one of hardcoded saved demo states.

Changes are saved automatically in browser and loaded on next page load.

### Mission info
![image](https://github.com/zdhr/fp/assets/2974124/9641673b-bedf-4894-98d5-a81b1746a295)

Date/time and weather information is visible in top bar. Mission start time can be edited here.

### Units setup
![image](https://github.com/zdhr/fp/assets/2974124/4ef0f690-58f9-48b9-a6a6-8fd27e562fa1)

In top right corner you can select which units you want to use.

### Fligth info & flightplan
![image](https://github.com/zdhr/fp/assets/2974124/22ba811a-09da-447e-9c6e-b1615152162d)

Each playable fligth from mission will get table with basic info and waypoints table.
Headings and distances are calculated from waypoints coordinates in mission.

Used units can be changed per flight. This is useful, when there are mixed planes with NATO and metric
instruments in one mission and you want each flight to have navigation data in their native units.

#### Preparation time
![image](https://github.com/zdhr/fp/assets/2974124/1ccd51a0-6af3-44b0-a5fb-446499e6e172)

This can be used to set how much preparation/startup/taxi time each flight needs from mission start to take off.
This will push waypoints times to more realistic/achievable values. By default DCS assumes, that players will
take off immediately after mission start and ignores any time needed for startup/taxi in waypoints ETA calculations.


#### Waypoint marking
![image](https://github.com/zdhr/fp/assets/2974124/ffd830db-17b3-4eb6-a077-2e3df6917eaf)

You can highlight waypoint by clicking on its number.

This is for another usage of __preparation time__ function. You can add or remove preparation time to synchronize/coordinate
ETAs of different flights on initial points or targets. Highlighting helps with spoting correct times in a sea of numbers.
