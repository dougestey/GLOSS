/* global io */
import Service, { inject as service } from '@ember/service';

export default Service.extend({

  store: service(),

  init() {
    this._super(...arguments);

    io.socket.on('notification', bind(this, this.receive));
  },

  // From Gloss
  dispatch(type, payload) {
    return this.get('store').createRecord('notification', { type, payload });
  },

  // From Arbiter
  receive({ type, payload }) {
    return this.dispatch(type, payload);
  }

});
