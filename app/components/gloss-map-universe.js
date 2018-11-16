import Component from '@ember/component';
import { run, later } from '@ember/runloop';
import { get } from '@ember/object';
import ResizeAware from 'ember-resize/mixins/resize-aware';

import { select } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { extent } from 'd3-array';
import { transition } from 'd3-transition';
import { easeCubicInOut } from 'd3-ease';
import bowser from 'ember-bowser';
import { task, waitForProperty, timeout } from 'ember-concurrency';
import _ from 'npm:lodash';

export default Component.extend(ResizeAware, {

  tagName: 'svg',

  attributeBindings: ['width', 'height'],

  pauseFleetUpdates: false,

  debouncedDidResize(width, height) {
    this.set('width', width);
    this.set('height', height);

    this.drawRegions();
  },

  didInsertElement() {
    this._super(...arguments);

    select(this.element)
      .append('g');

    let viewport = document.querySelector('.Gloss-viewport');

    this.set('width', viewport.clientWidth);
    this.set('height', viewport.clientHeight);
  },

  didReceiveAttrs() {
    // Schedule a call to our `drawRegions` method on Ember's "render" queue, which will
    // happen after the component has been placed in the DOM, and subsequently
    // each time data is changed.
    run.scheduleOnce('render', this, this.drawRegions);
  },

  _regionX(data, width) {
    return scaleLinear()
      .domain(extent(data.map(d => d.x)))
      .range([0, width]);
  },

  _regionY(data, height) {
    return scaleLinear()
      .domain(extent(data.map(d => d.z)))
      .range([height, 0]);
  },

  _systemX(data, width) {
    return scaleLinear()
      .domain(extent(data.map(d => d.x)))
      .range([0, width / 13]);
  },

  _systemY(data, height) {
    return scaleLinear()
      .domain(extent(data.map(d => d.y)))
      .range([0, height / 13]);
  },

  drawSystems: task(function * () {
    yield waitForProperty(this, 'pauseFleetUpdates', false);
    yield waitForProperty(this, 'regions.length', val => val !== 0);
    yield waitForProperty(this, 'systems.length', val => val !== 0);

    let data = get(this, 'systems');
    let regions = get(this, 'regions');
    let width = get(this, 'width') - 160;
    let height = get(this, 'height') - 160;

    let fleets = get(this, 'fleets');
    let fleetSize = {};
    let fleetKills = {};

    fleets.map((fleet) => {
      let sizeCount = fleetSize[fleet.system.id] = 0;
      let killCount = fleetKills[fleet.system.id] = 0;

      fleetSize[fleet.system.id] = sizeCount + fleet.characters.length;
      fleetKills[fleet.system.id] = killCount + fleet.kills.length;
    });

    let region = this.get('selectedRegion');
    let plot = select(`[data-id="${region.id}"]`);
    let dataSlice = data.filterBy('region.id', region.id);

    let systems = plot.selectAll('circle').data(dataSlice);

    let t = transition()
      .duration(750)
      .ease(easeCubicInOut);

    // Enter
    systems
      .enter()
      .append('circle')
        .attr('data-id', d => d.id)
        .attr('data-name', d => d.name)
        .attr('opacity', 0)
        .attr('r', 0.5)

        // Update
        .merge(systems)
          .classed('has-fleets', (d) => {
            return !!fleetSize[d.id]
          })
          .transition(t)
            .attr('r', (d) => {
              if (fleetSize[d.id])
                return fleetSize[d.id];

              return 0.5;
            })
            .attr('opacity', (d) => {
              return 0.5;
            })
            .attr('fill', (d) => {
              if (fleetKills[d.id]) {
                let g = 255;
                let modifier = fleetKills[d.id] * 12;

                if (modifier > 255) {
                  g = 0;
                } else {
                  g = g - modifier;
                }

                return `rgb(250, ${g}, 130)`;
              }

              return 'rgb(60, 154, 149)';
            })
            .attr('cy', d => this._systemY(dataSlice, height)(d.y))
            .attr('cx', d => this._systemX(dataSlice, width)(d.x));

    // Exit
    systems
      .exit()
      .remove();

  }).keepLatest(),

  drawRegions() {
    this.get('drawRegionsTask').perform();
  },

  drawRegionsTask: task(function * () {
    let data = [get(this, 'selectedRegion')];
    let width = get(this, 'width') - 160;
    let height = get(this, 'height') - 160;

    let pauseDuration = 2000;

    let _unselectRegion = () => {
      this.sendAction('selectRegion', null);
    }

    // Create a transition to use later
    let t = transition()
      .duration(750)
      .ease(easeCubicInOut);

    let plot = select(this.element)
      .select('g');

    // UPDATE EXISTING
    let regions = plot
      .selectAll('g')
      .data(data);

    // Enter
    let enter = regions
      .enter()
      .append('g')
        .attr('class', 'Gloss-map--region active')
        .attr('data-id', d => d.id)
        .attr('data-name', d => d.name)
        .on('click', _unselectRegion);

    yield this.get('drawSystems').perform();

    enter
      .append('text')
        .text(d => d.name)
          .attr('fill', '#d2fffd')
          .attr('style', 'font-size: 4px;')
          .attr('text-anchor', 'end')
          .attr('dominant-baseline', 'central')
          .attr('opacity', 0)
          .transition(t)
            .delay((d, i) => 500 + i * 100)
            .attr('x', 160)
            .attr('y', -15)
            .attr('opacity', 1);

    // Update
    enter
      .merge(regions)
        .attr('transform', (d) => {
          return `translate(${width / 4},${height / 4})scale(8)`
        })

    // Exit
    regions
      .exit()
      .remove();

    // Unblock the runtime briefly. When we're receiving a lot
    // of fleets over the socket, a lot of redraws will be queued,
    // leaving little time for DOM interaction otherwise.
    yield timeout(pauseDuration);
  }).keepLatest(),

});
