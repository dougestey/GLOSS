/* global io */
import Service, { inject as service } from '@ember/service';
import { filter } from '@ember/object/computed';
import { bind } from '@ember/runloop';
import moment from 'npm:moment';

export default Service.extend({

  store: service(),

  kills: [],

  fleets: [],

  // TODO: Types will be configurable in settings
  enable() {
    io.socket.on('kill', bind(this, this.receiveKill));
    io.socket.on('fleet', bind(this, this.receiveFleet));
    io.socket.on('intel', bind(this, this.receiveIntel));
  },

  async receiveKill(kill) {
    this.get('kills').pushObject(kill);
  },

  async receiveFleet(fleet) {
    this.get('fleets').pushObject(fleet);
  },

  async receiveIntel(data) {
    let { fleets, kills } = data;

    this.get('fleets').clear();
    this.get('kills').clear();

    fleets.map((fleet) => this.get('fleets').pushObject(fleet));
    kills.map((kill) => this.get('kills').pushObject(kill));
  }

});
