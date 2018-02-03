# Gloss

Guided List Of Star Systems.

The dream: a rich but performant nav computer for space travel. Designed for EVE Online with small touchscreen displays in mind.

Purpose-built to work hand in hand with [Arbiter](https://github.com/dougestey/arbiter).

Currently under heavy development. Not supported in any way by the author at this time.

## Roadmap
- [x] EVE Single sign-on
- [x] WebSocket connection to [Arbiter](https://github.com/dougestey/arbiter)
- [ ] Waypoint tracking
  - [x] Current system
  - [ ] Waypoint read
  - [ ] Waypoint write
  - [ ] Route display
  - [ ] Current system display
  - [ ] Jumps
  - [ ] Kills
  - [ ] Security
  - [ ] Celestial layout
  - [ ] Neighbouring systems
  - [ ] Points of interest
- [ ] Ship module
  - [ ] Hull type
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
* `yarn`

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

### Deploying

Requires a running [Arbiter](https://github.com/dougestey/ascent) server winstance.

### References
- https://thenounproject.com/seanpjohnstone/collection/subtle-cyberpunk-ui-dark/
- https://www.pinterest.es/pin/355362226835153293/
- http://sciencefictioninterfaces.tumblr.com/
- https://codepen.io/somethingformed/pen/raWJXV
- https://css-tricks.com/dont-overthink-flexbox-grids/