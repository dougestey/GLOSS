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

  route: reads('application.currentPath'),

  character: reads('location.character'),

  fleets: reads('discovery.fleets.length'),

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
    selectFleet(fleet) {
      this.get('navigate').send('selectFleet', fleet);
    },

    toggleTracking(fleet) {
      this.get('navigate').send('toggleTracking', fleet);
    },
  }

});
