/*
 * This dummy component demonstrates how to use ember-d3 to build a simple
 * data visualization. It's an extension of the https://bost.ocks.org/mike/circles/
 * example with some more fancy elements.
 *
 * In this example we receive data from our dummy data source in the index route,
 * which sends us new data every second.
 *
 * When new data arrives we calculate 2 scales, one for x and y, representing
 * placement on the x plane, and relative size for the radius of the circles.
 *
 * The scale functions use some handy helpers from the d3-array package to figure
 * out the size of our dataset.
 *
 * We also initialize a transition object which will be used towards the end to
 * transition the data `merge` from new data to existing data.
 */

import Component from '@ember/component'
import { run } from '@ember/runloop'
import { get } from '@ember/object'

// Import the D3 packages we want to use
import { select } from 'd3-selection'
import { scaleLinear } from 'd3-scale'
import { extent } from 'd3-array'
import { transition } from 'd3-transition'
import { easeCubicInOut } from 'd3-ease'

import { task, waitForProperty } from 'ember-concurrency'

export default Component.extend({

  tagName: 'svg',
  // classNames: ['awesome-d3-widget'],

  attributeBindings: ['width', 'height'],

  // Array of points to render as circles in a line, spaced by time.
  //  [ {value: Number, timestamp: Number } ];
  init() {
    this._super()
    this.data = []
  },

  didInsertElement() {
    this._super(...arguments);

    let viewport = document.querySelector('.Gloss-viewport');

    this.set('width', viewport.clientWidth);
    this.set('height', viewport.clientHeight);
  },

  didReceiveAttrs() {
    // Schedule a call to our `drawRegions` method on Ember's "render" queue, which will
    // happen after the component has been placed in the DOM, and subsequently
    // each time data is changed.
    run.scheduleOnce('render', this, this.drawRegions)
  },

  drawRegionSystems() {
    this.get('drawRegionSystemsTask').perform();
  },

  drawRegionSystemsTask: task(function * () {
    yield waitForProperty(this, 'systems.length', val => val !== 0);

    let data = get(this, 'systems');
    let regions = get(this, 'regions');

    for (let region of regions) {
      let plot = select(`[data-id="${region.id}"]`);
      let dataSlice = data.filterBy('region.id', region.id);

      let systems = plot.selectAll('circle').data(dataSlice); 

      systems
        .enter()
        .append('circle')
          .attr('fill', '#d2fffd')
          .attr('opacity', 0.5)
          .attr('r', 2)
          .attr('data-id', d => d.id)
          .attr('data-name', d => d.name)
          .attr('cy', d => d.y / 1000000000000000)
          .attr('cx', d => d.x / 1000000000000000)
    }

  }),

  drawRegions() {
    this.get('drawRegionsTask').perform();
  },

  drawRegionsTask: task(function * () {
    yield waitForProperty(this, 'regions.length', val => val !== 0);

    let plot = select(this.element);
    let data = get(this, 'regions');
    let width = get(this, 'width');
    let height = get(this, 'height');

    // Create a transition to use later
    let t = transition()
      .duration(250)
      .ease(easeCubicInOut)

    // X scale to scale position on x axis
    let regionX = scaleLinear()
      .domain(
        extent(data.map(d => d.x))
      )
      .range([0, width])

    // Y scale to scale radius of circles proportional to size of plot
    let regionY = scaleLinear()
      .domain(
        // `extent()` requires that data is sorted ascending
        extent(data.map(d => d.y))
      )
      .range([height, 0])

    // UPDATE EXISTING
    let regions = plot.selectAll('g').data(data)

    // EXIT
    regions
      .exit()
      .transition(t)
      .attr('r', 0)
      .remove()

    // ENTER
    regions
      .enter()
      .append('g')
        // .attr('fill', 'steelblue')
        // .attr('opacity', 0.5)
        .attr('data-id', d => d.id)
        .attr('data-title', d => d.name)
        .attr('transform', (d) => {
          return `translate(${regionX(d.x)}, ${regionY(d.y)})`
        })
        .append('text')
          .text(d => d.name)
          .attr('fill', '#3c9a95')
          .attr('style', 'font-size: 10px;');

    this.drawRegionSystems();

    // MERGE + UPDATE EXISTING
    // enterJoin
    //   .merge(groups)
    //   .transition(t)
      // .attr('r', 5)
      // .attr('r', d => yScale(d.y) / 2)
      // .attr('cy', d => yScale(d.y))
      // .attr('cx', d => xScale(d.x))
  }),
})
