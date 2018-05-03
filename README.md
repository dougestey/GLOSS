# Gloss
Guided List Of Star Systems.

The dream is a rich but performant nav computer for space travel. Designed for EVE Online. Built on [Ember](http://emberjs.com).

Purpose-built to work hand in hand with [Arbiter](https://github.com/dougestey/arbiter).

Currently under heavy development. Not supported in any way by the author at this time.

## Screenshots ##
![gloss space_](https://user-images.githubusercontent.com/680366/39587843-805b8386-4ec8-11e8-8e78-cb612430ec6c.png)
![gloss space_navigate_showkillstream true](https://user-images.githubusercontent.com/680366/39587862-887c6ddc-4ec8-11e8-94ab-0bff800a0d66.png)
![gloss space_navigate_showkillstream true 1](https://user-images.githubusercontent.com/680366/39587847-829a81b0-4ec8-11e8-92d5-cf661bd47f85.png)


## Features ##
- EVE SSO Authentication
- Blistering WebSocket connection to [Arbiter](https://github.com/dougestey/arbiter)
- Updates location, ship, status for active character sockets every 5 seconds
- Updates ship jumps, kills, pods, NPCs every 1 hour
- Live fleet tracking analysis provided by [Sentinel](https://github.com/dougestey/sentinel)

## Roadmap
Coming soon.

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

Requires a running [Arbiter](https://github.com/dougestey/arbiter) server instance.

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
