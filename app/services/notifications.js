/* global io */
import Service, { inject as service } from '@ember/service';
import { bind } from '@ember/runloop';

export default Service.extend({

  message: service(),

  kills: [],

  fleets: [],

  // TODO: Types will be configurable in settings
  enable() {
    io.socket.on('kill', bind(this, this.receiveKill));
    io.socket.on('fleet', bind(this, this.receiveFleet));
    io.socket.on('fleet_expire', bind(this, this.destroyFleet));
    io.socket.on('intel', bind(this, this.receiveIntel));
  },

  async receiveKill(kill) {
    let kills = this.get('kills');
    let existingKill = kills.findBy('id', kill.id);

    if (existingKill) {
      kills.removeObject(existingKill);
    }

    kills.pushObject(kill);
  },

  async receiveFleet(fleet) {
    let fleets = this.get('fleets');
    let existingFleet = fleets.findBy('id', fleet.id);

    if (existingFleet) {
      fleets.removeObject(existingFleet);
    } else {
      this.get('message').dispatch(`New threat in ${fleet.system.name}`, `${fleet.characters.length} pilot with ${fleet.kills.length} kills`, 5);
    }

    fleets.pushObject(fleet);
  },

  async destroyFleet(fleet) {
    let fleets = this.get('fleets');
    let fleetToDestroy = fleets.findBy('id', fleet.id);

    if (fleetToDestroy) {
      fleets.removeObject(fleetToDestroy);
    }
  },

  async receiveIntel(data) {
    let { fleets, kills } = data;

    this.get('fleets').clear();
    this.get('kills').clear();

    fleets.map((fleet) => this.get('fleets').pushObject(fleet));
    kills.map((kill) => this.get('kills').pushObject(kill));
  }

});
