import Service, { inject as service } from '@ember/service';
import { bind } from '@ember/runloop';

export default Service.extend({

  arbiter: service(),

  message: service(),

  location: service(),

  tracker: service(),

  kills: [],

  fleets: {
    system: [],
    constellation: [],
    region: []
  },

  // TODO: Types will eventually be configurable in settings
  enable() {
    let socket = this.get('arbiter.socket');

    socket.on('intel_system', bind(this, this.receiveSystem));
    socket.on('intel_constellation', bind(this, this.receiveConstellation));
    socket.on('intel_region', bind(this, this.receiveRegion));

    socket.on('kill', bind(this, this.receiveKill));

    socket.on('fleet', bind(this, this.receiveFleet));
    socket.on('fleet_expire', bind(this, this.destroyFleet));
  },

  /* Socket.IO handlers */

  async receiveKill(kill) {
    let kills = this.get('kills');
    let existingKill = kills.findBy('id', kill.id);

    if (existingKill) {
      kills.removeObject(existingKill);
    }

    kills.pushObject(kill);
  },

  async receiveFleet(fleet) {
    // Let tracker decide if it needs this data.
    this.get('tracker').evaluate(fleet);

    let notified = false;

    // System
    if (fleet.system.systemId === location.system.id) {
      let systemFleets = this.get('fleets.system');
      let existingSystemFleet = systemFleets.findBy('id', fleet.id);

      if (existingSystemFleet) {
        // We already have the fleet, so update it (remove/add)
        systemFleets.removeObject(existingSystemFleet);
      } else {
        // New fleet
        let suffix = fleet.characters.length > 1 ? 's' : '';
        let charSuffix = fleet.kills.length > 1 ? 's' : '';

        this.get('message').dispatch(`New threat in ${fleet.system.name}`, `${fleet.characters.length} pilot${suffix} with ${fleet.kills.length} kill${charSuffix}`, 5);
        notified = true;
      }

      systemFleets.pushObject(fleet);
    }

    // Constellation TODO
    if (location.constellation.systems.includes(fleet.system.systemId)) {
      let constellationFleets = this.get('fleets.constellation');
      let existingConstellationFleet = constellationFleets.findBy('id', fleet.id);

      if (existingConstellationFleet) {
        // We already have the fleet, so update it (remove/add)
        constellationFleets.removeObject(existingConstellationFleet);
      } else {
        if (!notified) {
          // New fleet
          let suffix = fleet.characters.length > 1 ? 's' : '';
          let charSuffix = fleet.kills.length > 1 ? 's' : '';
          this.get('message').dispatch(`New threat in ${location.constellation.name}`, `${fleet.characters.length} pilot${suffix} with ${fleet.kills.length} kill${charSuffix}`, 5);
          notified = true;
        }
      }

      constellationFleets.pushObject(fleet);
    }

    // Region TODO
    if (location.region.systems.includes(fleet.system.systemId)) {
      let regionFleets = this.get('fleets.region');
      let existingRegionFleet = regionFleets.findBy('id', fleet.id);

      if (existingRegionFleet) {
        // We already have the fleet, so update it (remove/add)
        regionFleets.removeObject(existingRegionFleet);
      } else {
        if (!notified) {
          // New fleet
          let suffix = fleet.characters.length > 1 ? 's' : '';
          let charSuffix = fleet.kills.length > 1 ? 's' : '';
          this.get('message').dispatch(`New threat in ${location.region.name}`, `${fleet.characters.length} pilot${suffix} with ${fleet.kills.length} kill${charSuffix}`, 5);
        }
      }

      regionFleets.pushObject(fleet);
    }
  },

  async destroyFleet(fleet) {
    // System
    let systemFleets = this.get('fleets.system');
    let existingSystemFleet = systemFleets.findBy('id', fleet.id);

    if (existingSystemFleet) {
      systemFleets.removeObject(existingSystemFleet);
    }

    // Constellation
    let constellationFleets = this.get('fleets.constellation');
    let existingConstellationFleet = constellationFleets.findBy('id', fleet.id);

    if (existingConstellationFleet) {
      constellationFleets.removeObject(existingConstellationFleet);
    }

    // Region
    let regionFleets = this.get('fleets.constellation');
    let existingRegionFleet = regionFleets.findBy('id', fleet.id);

    if (existingRegionFleet) {
      regionFleets.removeObject(existingRegionFleet);
    }
  },

  // TODO
  async receiveSystemIntel(data) {
    let system = this.get('location.system');
    let { fleets, kills, id } = data;

    if (id === system.id) {
      if (this.get('fleets.system')) {
        this.get('fleets.system').clear();
      }

      // this.get('kills').clear();
      // this.set('fleets', []);

      fleets.map((fleet) => this.get('fleets').pushObject(fleet));
      kills.map((kill) => this.get('kills').pushObject(kill));
    }
  },

  async receiveConstellationIntel(data) {
    // let location = this.get('location');
    let { fleets, kills, id } = data;

    // this.get('constellation').clear();
    // this.get('kills').clear();

    fleets.map((fleet) => this.get('constellation.fleets').pushObject(fleet));
    kills.map((kill) => this.get('constellation.kills').pushObject(kill));
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
