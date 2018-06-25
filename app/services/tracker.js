import Service, { inject as service } from '@ember/service';
import { storageFor } from 'ember-local-storage';
import { computed } from '@ember/object';

export default Service.extend({

  intel: service(),

  fleets: storageFor('tracked-fleets'),

  kills: computed('fleets.[]', function() {
    let fleets = this.get('fleets').toArray();
    let kills = [];

    for (let fleet of fleets) {
      kills = kills.concat(fleet.kills);
    }

    return kills;
  }),

  add(fleet) {
    this.get('fleets').addObject(fleet);
    this.get('intel').subscribeFleet(fleet.id);
  },

  remove(fleet) {
    this.get('fleets').removeObject(fleet);
    this.get('intel').unsubscribeFleet(fleet.id);
  },

  evaluate(fleet) {
    let fleets = this.get('fleets');
    let existingFleet = fleets.findBy('id', fleet.id);

    if (existingFleet) {
      fleets.removeObject(existingFleet);
      fleets.addObject(fleet);
    }
  }

});
