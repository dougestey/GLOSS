import Service, { inject as service } from '@ember/service';
import { task, waitForProperty } from 'ember-concurrency';

export default Service.extend({

  arbiter: service(),

  tracker: service(),

  fleets: [],

  kills: [],

  regions: [],

  systems: [],

  initialized: false,

  // Filter out wormhole regions - for now.
  _filterRegions(data) {
    data = data.filter(region => 
      region.name.indexOf('ADR') === -1 &&
      region.name.indexOf('000') === -1
    );

    return data;
  },

  updateTrackedFleets() {
    let socket = this.get('arbiter.socket');
    let fleets = this.get('tracker.fleets');

    if (fleets) {
      fleets = fleets.toArray();

      for (let fleet of fleets) {
        socket.get(`/api/fleets/${fleet.id}/update`);
      }
    }
  },

  enable() {
    let socket = this.get('arbiter.socket');

    // Get all regions in Arbiter's DB
    socket.get('/api/regions?limit=105', (regions) => {
      regions = this._filterRegions(regions);

      this.get('regions').pushObjects(regions);
    });

    // Get all systems in Arbiter's DB
    socket.get('/api/systems?limit=9000', (systems) => {
      this.get('systems').pushObjects(systems);
    });

    // Handle Sentinel's response to Arbiter
    socket.on('active_fleets', (fleets) => {
      this.get('loadActiveFleets').perform(fleets);
    });

    // Active fleet handler
    socket.on('fleet', (fleet) => {
      this.get('evaluateFleet').perform(fleet);
      this.get('tracker').evaluate(fleet);
    });

    // Tracked fleet subscription handler
    socket.on('fleet_update', (fleet) => {
      this.get('tracker').evaluate(fleet);
    });

    // Handle expired fleets.
    socket.on('fleet_expire', (fleet) => {
      this.get('evaluateFleet').perform(fleet);
      this.get('tracker').evaluate(fleet);
    });

    // Update kills. TODO: Handle max kill [] size.
    socket.on('kill', (kill) => {
      this.get('kills').addObject(kill);
    });

    // Update tracked fleets
    this.updateTrackedFleets();

    // Trigger Arbiter request to Sentinel
    socket.get('/api/fleets/active');
  },

  loadActiveFleets: task(function * (fleets) {
    this.get('fleets').pushObjects(fleets);

    this.toggleProperty('initialized');
  }),

  evaluateFleet: task(function * (fleet) {
    yield waitForProperty(this, `initialized`, true);

    let fleets = this.get('fleets');
    let existingFleet = fleets.findBy('id', fleet.id);

    if (existingFleet) {
      fleets.removeObject(existingFleet);
    }

    if (fleet.isActive) {
      fleets.addObject(fleet);
    }
  }).enqueue(),

  evaluateKill: task(function * (kill) {
    this.get('kills').addObject(kill);
  }),

});
