import Service, { inject as service } from '@ember/service';
import { storageFor } from 'ember-local-storage';
import { computed } from '@ember/object';

export default Service.extend({

  fleets: storageFor('tracked-fleets-01'),

  deadFleetCount: 0,

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
  },

  remove(fleet) {
    let existingFleet = this.get('fleets').findBy('id', fleet.id);

    if (existingFleet)
      this.get('fleets').removeObject(existingFleet);
  },

  evaluate(fleet) {
    let fleets = this.get('fleets');
    let existingFleet = fleets.findBy('id', fleet.id);

    if (existingFleet) {
      fleets.removeObject(existingFleet);

      if (fleet.characters.length) {
        fleets.addObject(fleet);
      } else {
        let count = this.get('deadFleetCount');

        this.set('deadFleetCount', count + 1);
      }
    }
  }

});
