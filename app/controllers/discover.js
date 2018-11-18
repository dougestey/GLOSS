/* global $ */
import Controller, { inject as controller } from '@ember/controller';
import { inject as service } from '@ember/service';
import { later } from '@ember/runloop';
import { computed } from '@ember/object';
import { reads } from '@ember/object/computed';

export default Controller.extend({

  application: controller(),

  navigate: controller(),

  location: service(),

  discovery: service(),

  tracker: service(),

  message: service(),

  route: reads('application.currentPath'),

  character: reads('location.character'),

  fleets: reads('discovery.fleets.length'),

  kills: reads('discovery.kills.length'),

  trackerFleets: reads('tracker.fleets.[]'),

  selectedFleet: computed('selectedFleetId', 'discovery.fleets.[]', function() {
    let id = this.get('selectedFleetId');

    if (!id) {
      this.set('selectedFleetCache', null);
      return null;
    }

    let cache = this.get('selectedFleetCache');
    let selected = this.get('discovery.fleets').findBy('id', id);

    if (!selected && cache) {
      return cache;
    } else if (selected) {
      this.set('selectedFleetCache', selected);
    }

    return selected;
  }),

  selectedFleetIsTracked: computed('selectedFleetId', 'trackerFleets.[]', function() {
    let id = this.get('selectedFleetId');
    let fleets = this.get('trackerFleets');

    if (!id)
      return false;

    let existingTrackedFleet = fleets.findBy('id', id);
    return !!existingTrackedFleet;
  }),

  context: computed('route', function() {
    let route = this.get('route');
    let context = route.split('.')[1];

    return context;
  }),

  mode: computed('route', function() {
    let route = this.get('route');
    let mode = route.split('.')[0];

    return mode;
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
    selectFleet(id) {
      this.set('selectedFleetId', id);

      $('.ui.threat.modal').modal('show');
      $('.ui.threat.modal').modal('hide dimmer');
      $('.ui.threat.modal').scrollTop(0);
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
