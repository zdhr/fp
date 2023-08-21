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
![image](https://github.com/zdhr/fp/assets/2974124/1dc99da7-56f0-40e0-9db8-9063c146dffa)

Upload `.miz` file here or load one of hardcoded saved demo states.

Changes are saved automatically in browser and loaded on next page load.

### Mission info
![image](https://github.com/zdhr/fp/assets/2974124/308cc7e1-a335-4a74-a06b-3fb989723028)

Date/time and weather information is visible in top bar. Mission start time can be edited here.

### Units setup
![image](https://github.com/zdhr/fp/assets/2974124/e3c874c1-4383-4740-b69e-2217a5b3d7c0)

In top right corner you can select which units you want to use.

### Fligth info & flightplan
![image](https://github.com/zdhr/fp/assets/2974124/0b6fff2a-5c87-4068-8ef9-e70903d3f967)

Each playable fligth from mission will get table with basic info and waypoints table.
Headings and distances are calculated from waypoints coordinates in mission.

Used units can be changed per flight. This is useful, when there are mixed planes with NATO and metric
instruments in one mission and you want each flight to have navigation data in their native units.

#### Preparation time
![image](https://github.com/zdhr/fp/assets/2974124/f283d13b-022e-4b55-8e26-7603dbbbe648)

This can be used to set how much preparation/startup/taxi time each flight needs from mission start to take off.
This will push waypoints times to more realistic/achievable values. By default DCS assumes, that players will
take off immediately after mission start and ignores any time needed for startup/taxi in waypoints ETA calculations.


#### Waypoint marking
![image](https://github.com/zdhr/fp/assets/2974124/3e800352-10dc-46d7-824a-22002f2b04c7)

You can highlight waypoint by clicking on its number.

This is for another usage of __preparation time__ function. You can add or remove preparation time to synchronize/coordinate
ETAs of different flights on initial points or targets. Highlighting helps with spoting correct times in a sea of numbers.
