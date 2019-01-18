# StratMapper - Boomtown Data

StratMapper application, visualizing data from Boomtown.

- [StratMapper - Boomtown](https://stratmapper-boomtown-v2.herokuapp.com/) – Live Version

### Overview
StratMapper is a visualization and labeling system for game data. It offers an abstract playback of game events on a game map, as well as allows users to filter events and units to zoom into specific behaviors of interest. At the center of the application, there is the two-dimensional game map, which can be zoomed in and out, as well as shifted along the X and Y axis. Below this is the timeline, which visualizes all of the events in the match displayed. Each event icon in the timeline corresponds to an event type on the y-axis, time on the x-axis, and takes the assigned color of the corresponding unit. The timeline can also be zoomed in and out, as well as shifted. Note that, a tooltip appears with detailed information upon hovering over the corresponding event icon.

The timeline allows users to select a temporal period of interest by placing start and end markers. When a period is selected by this method, the event icons in the map are filtered and appear accordingly, along with units’ paths as they traverse through these event icons. Event types, listed on the left of the timeline, as well as units and unit teams, listed in the top left of the interface, can also be filtered in and out to select what to focus on.

Using StratMapper to select several events on the timeline and units involved, one can compose a higher-order event from event primitives. This can be captured via the labeling system (the labeling panel is on the right side of the screen), which enables users to save the selected events, time window, and units, and then give it a label. Such saved labels are shared among all collaborators using the visualization and can be retrieved, deleted, or corrected. These abstracted labels along with the data can also be exported for inspection or displayed in another visualization system.

### Get Started

```sh
git clone
cd stratmapper-boomtown
yarn install
cd client
yarn install
cd ..
yarn start
```

### Files

StratMapper is a React Application with a Node backend, which connects to a MongoDB instance on MLab. It uses D3.js as its primary visualization library and the React Context API for application state management. All of the components can be found in the [components](/client/src/components) folder. The Node server uses Express.js for routing and Mongoose.js for database and model management.

### Data

To visualize a match of a certain game, StratMapper needs two data files stored in the database: (i) match file and (ii) event file. The match file acts as a configuration file for the game level and tells the application the type of game, map information, units included, types of event primitives, and information pertinent to calibrating the visualization system. The event file is a list of primitive events in the respective match associated with the units, and is essentially a reformation of the match replays that StratMapper uses efficiently to visualize the gameplay.

Both are stored in a MongoDB instance on MLab. To update this endpoint, edit the mongourl in [server.js](server.js).

### License
This software is patented and owned by [Truong-Huy D. Nguyen](https://github.com/truonghuy), [Magy Seif El-Nasr](https://camd.northeastern.edu/faculty/magy-seif-el-nasr/), [Andy Bryant](https://github.com/andymbryant), and [Northeastern University](https://www.khoury.northeastern.edu/).

All rights reserved. Any distribution is forbidden without express written permission from the owners.
