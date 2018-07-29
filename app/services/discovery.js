import Service, { inject as service } from '@ember/service';
import { bind } from '@ember/runloop';
import { task, waitForProperty } from 'ember-concurrency';

export default Service.extend({

  arbiter: service(),

  fleets: [],

  kills: [],

  enable() {
    let socket = this.get('arbiter.socket');

    socket.on('active_fleet_update', (fleet) => {
      this.get('evaluateFleet').perform(fleet);
    });

    socket.on('active_kill_update', (fleet) => {
      this.get('evaluateKill').perform(fleet);
    });
  },

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

  evaluateKill: task(function * (kill) {
    this.get('kills').addObject(kill);
  }),

});
