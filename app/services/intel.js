import Service, { inject as service } from '@ember/service';
import { bind } from '@ember/runloop';

export default Service.extend({

  arbiter: service(),

  message: service(),

  location: service(),

  tracker: service(),

  kills: {
    system: [],
    constellation: [],
    region: []
  },

  fleets: {
    system: [],
    constellation: [],
    region: []
  },

  enable() {
    let socket = this.get('arbiter.socket');

    socket.on('intel_system', bind(this, this.receiveSystemIntel));
    socket.on('intel_constellation', bind(this, this.receiveConstellationIntel));
    socket.on('intel_region', bind(this, this.receiveRegionIntel));

    socket.on('fleet', bind(this, this.receiveFleet));
    socket.on('fleet_update', bind(this, this.receiveFleetUpdate));
    socket.on('fleet_expire', bind(this, this.destroyFleet));

    socket.on('kill', bind(this, this.receiveKill));

    this.subscribeFleets();
  },

  /* Socket.IO handlers */

  receiveKill(kill) {
    let system = this.get('location.system');
    let constellation = this.get('location.constellation');
    let region = this.get('location.region');

    // System
    if (kill.system.systemId === system.id) {
      let kills = this.get('kills.system');

      kills.pushObject(kill);
    }

    // Constellation
    if (constellation.systems.includes(kill.system.systemId)) {
      let kills = this.get('kills.constellation');

      kills.pushObject(kill);
    }

    // Region
    if (region.systems.includes(kill.system.systemId)) {
      let kills = this.get('kills.region');

      kills.pushObject(kill);
    }
  },

  receiveFleet(fleet) {
    let system = this.get('location.system');
    let constellation = this.get('location.constellation');
    let region = this.get('location.region');

    // Let tracker decide if it needs this data.
    this.get('tracker').evaluate(fleet);

    let notified = false;

    // System
    if (fleet.system.systemId === system.id) {
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

    // Constellation
    if (constellation.systems.findBy('id', fleet.system.systemId)) {
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

    // Region
    if (region.systems.findBy('id', fleet.system.systemId)) {
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

  receiveFleetUpdate(fleet) {
    this.get('tracker').evaluate(fleet);
  },

  destroyFleet(fleet) {
    // Let tracker decide if it needs this data.
    this.get('tracker').evaluate(fleet);

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

  receiveSystemIntel(data) {
    let { fleets, kills } = data;
    let systemFleets = this.get('fleets.system');
    let systemKills = this.get('kills.system');

    fleets.map((fleet) => systemFleets.pushObject(fleet));
    kills.map((kill) => systemKills.pushObject(kill));
  },

  receiveConstellationIntel(data) {
    let { fleets, kills } = data;
    let constellationFleets = this.get('fleets.constellation');
    let constellationKills = this.get('kills.constellation');

    fleets.map((fleet) => constellationFleets.pushObject(fleet));
    kills.map((kill) => constellationKills.pushObject(kill));    
  },

  receiveRegionIntel(data) {
    let { fleets, kills } = data;
    let regionFleets = this.get('fleets.region');
    let regionKills = this.get('kills.region');

    fleets.map((fleet) => regionFleets.pushObject(fleet));
    kills.map((kill) => regionKills.pushObject(kill));
  },

  /* Methods */

  subscribeFleets() {
    let socket = this.get('arbiter.socket');
    let fleets = this.get('tracker.fleets').toArray();

    for (let fleet of fleets) {
      socket.get(`/api/fleets/${fleet.id}/track`);
    }
  },

  subscribeFleet(id) {
    let socket = this.get('arbiter.socket');

    socket.get(`/api/fleets/${id}/track`);
  },

  unsubscribeFleet(id) {
    let socket = this.get('arbiter.socket');

    socket.get(`/api/fleets/${id}/untrack`);
  }

});
