# GLOSS
Guided List Of Star Systems.

The dream is a rich but performant nav computer for space travel. Designed for EVE Online. Built on [Ember](http://emberjs.com) and powered by [Sentinel](https://github.com/dougestey).

## Screenshots ##
![gloss space_](https://user-images.githubusercontent.com/680366/39587843-805b8386-4ec8-11e8-8e78-cb612430ec6c.png)
![gloss3](https://user-images.githubusercontent.com/680366/48974258-845bdd00-f021-11e8-8331-98d3fc6d8a76.png)
![gloss2](https://user-images.githubusercontent.com/680366/48974260-8e7ddb80-f021-11e8-9a66-ce3a48a6af5f.png)
![gloss1](https://user-images.githubusercontent.com/680366/48974262-963d8000-f021-11e8-84c3-994ecbd7ea94.png)

## Features ##
- EVE SSO Authentication
- Location-aware HUD shows fleets active in your region
- Bird's eye-level fleet monitoring
- Individual fleet tracking
- Regional maps
- All data shown is piped live from ESI (via [Arbiter](https://github.com/dougestey/arbiter)) and zKillboard (via [Sentinel](https://github.com/dougestey/sentinel))

## Development

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM) (>=8 required)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd gloss`
* `yarn` to grab deps

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details.

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

## Deploying

- Requires a running [Arbiter](https://github.com/dougestey/arbiter) server instance.
- Requires a running [Sentinel](https://github.com/dougestey/sentinel) server instance.

## Design Reference
- http://sciencefictioninterfaces.tumblr.com/
- https://www.youtube.com/watch?v=NGIJDM2Xf4w
- https://creativemarket.com/dannehr/163951-Orbit-SciFi-UI-Kit/screenshots/#screenshot3
- https://arwes.romelperez.com/play
- https://www.behance.net/gallery/19051971/Hi-Tech-Interface-Builder-Pack
- https://www.behance.net/gallery/30283093/Sci-fi-interface-HUD
- https://thenounproject.com/seanpjohnstone/collection/subtle-cyberpunk-ui-dark/
- https://codepen.io/somethingformed/pen/raWJXV
- https://css-tricks.com/dont-overthink-flexbox-grids/
