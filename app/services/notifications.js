/* global io */
import Service, { inject as service } from '@ember/service';
import { bind } from '@ember/runloop';

export default Service.extend({

  arbiter: service(),

  message: service(),

  location: service(),

  tracker: service(),

  kills: [],

  fleets: [],

  // TODO: Types will be configurable in settings
  enable() {
    let socket = this.get('arbiter.socket');

    socket.on('intel', bind(this, this.receiveIntel));

    socket.on('kill', bind(this, this.receiveKill));

    socket.on('fleet', bind(this, this.receiveFleet));
    socket.on('fleet_expire', bind(this, this.destroyFleet));
  },

  // Socket.IO handlers

  async receiveKill(kill) {
    let kills = this.get('kills');
    let existingKill = kills.findBy('id', kill.id);
    let location = this.get('location');

    if (kill.system.systemId === location.system.systemId) {
      if (existingKill) {
        kills.removeObject(existingKill);
      }

      kills.pushObject(kill);
    }
  },

  async receiveFleet(fleet) {
    let fleets = this.get('fleets');
    let existingFleet = fleets.findBy('id', fleet.id);
    let location = this.get('location');

    if (fleet.system.systemId === location.system.systemId) {
      if (existingFleet) {
        fleets.removeObject(existingFleet);
      } else {
        let suffix = fleet.characters.length > 1 ? 's' : '';

        this.get('message').dispatch(`New threat in ${fleet.system.name}`, `${fleet.characters.length} pilot${suffix} with ${fleet.kills.length} kills`, 5);
      }

      fleets.pushObject(fleet);
    }

    // Let tracker decide if it needs this data.
    this.get('tracker').evaluate(fleet);
  },

  async destroyFleet(fleet) {
    let fleets = this.get('fleets');
    let fleetToDestroy = fleets.findBy('id', fleet.id);

    if (fleetToDestroy) {
      fleets.removeObject(fleetToDestroy);
    }
  },

  async receiveIntel(data) {
    let location = this.get('location');
    let { fleets, kills, systemId } = data;

    if (systemId === location.system.systemId) {
      this.get('fleets').clear();
      this.get('kills').clear();

      fleets.map((fleet) => this.get('fleets').pushObject(fleet));
      kills.map((kill) => this.get('kills').pushObject(kill));
    }
  },

  // Methods

  async subscribeFleet(id) {
    let socket = this.get('arbiter.socket');

    socket.get(`/api/fleets/${id}/track`);
  },

  async unsubscribeFleet(id) {
    let socket = this.get('arbiter.socket');

    socket.get(`/api/fleets/${id}/untrack`);
  }

});
