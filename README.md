# Gloss
Guided List Of Star Systems.

The dream is a rich but performant nav computer for space travel. Designed for EVE Online. Built on [Ember](http://emberjs.com).

Purpose-built to work hand in hand with [Arbiter](https://github.com/dougestey/arbiter).

Currently under heavy development. Not supported in any way by the author at this time.

## Screenshots ##
![screen shot 2018-04-16 at 6 51 50 pm](https://user-images.githubusercontent.com/680366/38839358-3a7b34e2-41a8-11e8-8ddd-eba5c0ae1091.png)

![screen shot 2018-04-16 at 6 52 55 pm](https://user-images.githubusercontent.com/680366/38839379-50961ba2-41a8-11e8-90b2-112978b7cd92.png)


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
