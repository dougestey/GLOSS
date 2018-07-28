import Service, { inject as service } from '@ember/service';
import { bind } from '@ember/runloop';
import { task, waitForProperty } from 'ember-concurrency';

export default Service.extend({

  arbiter: service(),

  // intel: service(),

  // fleets: storageFor('active-fleets'),

  fleets: [],

  enable() {
    let socket = this.get('arbiter.socket');

    // socket.on('fleet_report', (fleets) => {
    //   this.get('receiveFleetReport').perform(fleets);
    // });

    socket.on('active_fleet_update', (fleet) => {
      this.get('evaluateFleet').perform(fleet);
    });

    // socket.get(`/api/fleets/active`);
  },

  // receiveFleetReport: task(function * (fleets) {
  //   this.get('fleets').pushObjects(fleets);

  //   this.toggleProperty('loaded');
  // }),

  evaluateFleet: task(function * (fleet) {
    // yield waitForProperty(this, `loaded`, true);

    let fleets = this.get('fleets');
    let existingFleet = fleets.findBy('id', fleet.id);

    if (existingFleet) {
      fleets.removeObject(existingFleet);
    }

    if (fleet.isActive) {
      fleets.addObject(fleet);
    }
  }),

});
