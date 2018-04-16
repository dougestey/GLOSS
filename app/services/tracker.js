import Service, { inject as service } from '@ember/service';
import { filter } from '@ember/object/computed';
import { bind } from '@ember/runloop';
import moment from 'moment';

export default Service.extend({

  fleets: [],

  add(fleet) {
    this.get('fleets').pushObject(fleet);
  },

  remove(fleet) {
    this.get('fleets').removeObject(fleet);
  }

});
