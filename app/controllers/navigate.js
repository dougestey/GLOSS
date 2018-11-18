/* global $ */
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { inject as controller } from '@ember/controller';
import { reads } from '@ember/object/computed';
import { computed } from '@ember/object';
import { later } from '@ember/runloop';
import { task } from 'ember-concurrency';

export default Controller.extend({

  queryParams: {
    showKillStream: 'stream'
  },

  showKillStream: true,

  application: controller(),

  arbiter: service(),

  discovery: service(),

  location: service(),

  message: service(),

  tracker: service(),

  route: reads('application.currentPath'),

  character: reads('location.character'),

  system: reads('location.system'),

  region: reads('location.region'),

  isConnected: reads('arbiter.connected'),

  trackerFleets: reads('tracker.fleets.[]'),

  trackerKills: reads('tracker.kills.[]'),

  allKills: reads('discovery.kills.[]'),

  allFleets: reads('discovery.fleets.[]'),

  nearbyFleets: computed('allFleets', 'region.id', function() {
    let allFleets = this.get('allFleets');
    let currentRegionId = this.get('region.id');

    return allFleets.filterBy('system.region.id', currentRegionId);
  }),

  nearbyKills: computed('allKills', 'region.id', function() {
    let allKills = this.get('allKills');
    let currentRegionId = this.get('region.id');

    return allKills.filterBy('system.region', currentRegionId);
  }),

  context: computed('route', function() {
    let route = this.get('route');
    let context = route.split('.')[1];

    if (context !== 'tracker') {
      return 'nearby';
    }

    return context;
  }),

  fleets: computed('context', 'nearbyFleets.[]', 'trackerFleets.[]', function() {
    let context = this.get('context');

    return this.get(`${context}Fleets`);
  }),

  kills: computed('context', 'nearbyKills.[]', 'trackerKills.[]', function() {
    let context = this.get('context');

    return this.get(`${context}Kills`);
  }),

  killsRenderable: computed('kills.[]', function() {
    let kills = this.get('kills');

    if (!kills)
      return [];

    return kills.sortBy('time').reverse().slice(0, 500);
  }),

  selectFleet: task(function * (id) {
    this.set('selectedFleetId', id);

    $('.ui.threat.modal').modal('show');
    $('.ui.threat.modal').modal('hide dimmer');
    $('.ui.threat.modal').scrollTop(0);
  }).drop(),

  selectedFleet: computed('selectedFleetId', 'allFleets.[]', 'trackerFleets.[]', function() {
    let id = this.get('selectedFleetId');

    if (!id) {
      this.set('selectedFleetCache', null);
      return null;
    }

    let allFleets = this.get('allFleets');
    let trackerFleets = this.get('trackerFleets');
    let cache = this.get('selectedFleetCache');
    let selected;

    if (allFleets) {
      selected = allFleets.findBy('id', id);
    }

    if (!selected) {
      selected = trackerFleets.findBy('id', id);
    }

    if (selected) {
      this.set('selectedFleetCache', selected);

      return selected;
    }

    return cache;
  }),

  selectedFleetIsTracked: computed('selectedFleetId', 'trackerFleets.[]', function() {
    let id = this.get('selectedFleetId');
    let fleets = this.get('trackerFleets');

    if (!id)
      return false;

    let existingTrackedFleet = fleets.findBy('id', id);
    return !!existingTrackedFleet;
  }),

  init() {
    this._super(...arguments);

    later(() => {
      this.set('loadUiElements', true);
    }, 500);

    later(() => {
      this.set('loadIntel', true);
    }, 5000);
  },

  actions: {
    toggleKillStream() {
      this.toggleProperty('showKillStream');
    },

    selectFleet(id) {
      this.get('selectFleet').perform(id);
    },

    toggleTracking() {
      let fleet = this.get('selectedFleet');
      let fleetIsTracked = this.get('selectedFleetIsTracked');

      if (fleetIsTracked) {
        this.get('tracker').remove(fleet);
        this.get('message.dispatch').perform(`Tracking disabled`, undefined, 2);
      } else {
        this.get('tracker').add(fleet);
        this.get('message.dispatch').perform(`Tracking enabled`, undefined, 2);
      }
    },
  }

});
