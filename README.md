# Gloss
Guided List Of Star Systems.

The dream is a rich but performant nav computer for space travel. Designed for EVE Online. Built on [Ember](http://emberjs.com).

Purpose-built to work hand in hand with [Arbiter](https://github.com/dougestey/arbiter).

Currently under heavy development. Not supported in any way by the author at this time.

## Features ##
- EVE SSO Authentication
- Blistering WebSocket connection to [Arbiter](https://github.com/dougestey/arbiter)
- Updates location, ship, status for active character sockets every 5 seconds
- Updates ship jumps, kills, pods, NPCs every 1 hour

## Roadmap
- [x] EVE Single sign-on
- [x] WebSocket connection to [Arbiter](https://github.com/dougestey/arbiter)
- [ ] Waypoint tracking
  - [x] Current system
  - [ ] Waypoint read
  - [ ] Waypoint write
  - [ ] Route display
  - [x] Current system display
  - [x] Jumps
  - [x] Kills
  - [ ] Security
  - [ ] Celestial layout
  - [ ] Neighbouring systems
  - [ ] Points of interest
- [ ] Ship module
  - [x] Hull type
  - [ ] Jump fatigue readout
  - [ ] Effective hit points
  - [ ] Damage capability
- [ ] Intel module
  - [ ] Interpret results from local via copypasta
  - [ ] Nearby systems with NPC kills
  - [ ] Nearby systems with capsuleer kills
  - [ ] Shared public data
  - [ ] Shared corporate data
- [ ] Fleet module
  - [ ] Display current fleet role
  - [ ] Display current fleet members
    - [ ] Ship type
    - [ ] Current location
  - [ ] Invite pilots
  - [ ] Kick pilots
- [ ] Chat module
  - [ ] Slack support (TBD)

## Development

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
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
- https://www.behance.net/gallery/30283093/Sci-fi-interface-HUD
- https://thenounproject.com/seanpjohnstone/collection/subtle-cyberpunk-ui-dark/
- https://codepen.io/somethingformed/pen/raWJXV
- https://css-tricks.com/dont-overthink-flexbox-grids/
