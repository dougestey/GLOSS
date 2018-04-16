import Service, { inject as service } from '@ember/service';
import { storageFor } from 'ember-local-storage';

export default Service.extend({

  notifications: service(),

  fleets: storageFor('tracked-fleets'),

  add(fleet) {
    this.get('fleets').addObject(fleet);
    this.get('notifications').subscribeFleet(fleet.id);
  },

  remove(fleet) {
    this.get('fleets').removeObject(fleet);
    this.get('notifications').unsubscribeFleet(fleet.id);
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
