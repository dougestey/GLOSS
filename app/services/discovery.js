import Service, { inject as service } from '@ember/service';
// import { storageFor } from 'ember-local-storage';
import { bind } from '@ember/runloop';

export default Service.extend({

  arbiter: service(),

  // intel: service(),

  // fleets: storageFor('active-fleets'),

  fleets: [],

  enable() {
    let socket = this.get('arbiter.socket');

    socket.get(`/api/sentinel/fleets?isActive=true`, bind(this, this.generate));
  },

  generate(fleet) {
    this.set('fleets', fleets);
    // this.get('intel').subscribeFleet(fleet.id);
  },

});
