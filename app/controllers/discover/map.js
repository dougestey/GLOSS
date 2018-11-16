import Controller, { inject as controller } from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { reads } from '@ember/object/computed';
import { task, waitForProperty } from 'ember-concurrency';

export default Controller.extend({

  discover: controller(),

  discovery: service(),

  regions: reads('discovery.regions'),

  systems: reads('discovery.systems'),

  fleets: reads('discovery.fleets.[]'),

  fleetDisplay: computed('selectedRegion', 'fleets', function() {
    let region = this.get('selectedRegion');

    if (!region)
      return [];

    let fleets = this.get('fleets');
    let data = fleets.filterBy('system.region.id', region.id);

    return data;
  }),

  loading: true,

  init() {
    this._super(...arguments);

    this.get('initializeMap').perform();
  },

  initializeMap: task(function * () {
    yield waitForProperty(this, 'fleets.length', val => val !== 0);
    yield waitForProperty(this, 'regions.length', val => val !== 0);
    yield waitForProperty(this, 'systems.length', val => val !== 0);

    this.set('loading', false);
  }),

  actions: {
    selectRegion(region) {
      this.set('selectedRegion', region);
    },

    selectFleet(id) {
      this.get('discover').send('selectFleet', id);
    },

    resetMap() {
      this.get('discover').send('selectFleet', null);
      this.set('selectedRegion', null);
    },
  }

});
