import Service, { inject as service } from '@ember/service';
import { storageFor } from 'ember-local-storage';

export default Service.extend({

  intel: service(),

  fleets: storageFor('tracked-fleets'),

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
