
import Service, { inject as service } from '@ember/service';
import { bind } from '@ember/runloop';
import { isArray } from '@ember/array';
import { task, waitForProperty } from 'ember-concurrency';

export default Service.extend({

  arbiter: service(),

  discovery: service(),

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
    // System
    this.get('queueKill').perform(kill, 'system');

    // Constellation
    this.get('queueKill').perform(kill, 'constellation');

    // Region
    this.get('queueKill').perform(kill, 'region');

    // Discovery
    this.get('discovery.evaluateKill').perform(kill);
  },

  receiveFleet(fleet) {
    // Notify tracker and discovery.
    this.get('tracker').evaluate(fleet);
    this.get('discovery.evaluateFleet').perform(fleet);

    // Sentinel has different job types that occasionally overlap.
    //
    // In some cases it's possible for a fleet's threat level to be calculated, updated and sent
    // (which triggers this method) immediately after a destroyFleet() has been triggered -
    // which would re-add the fleet to the display incorrectly.
    if (!fleet.isActive) {
      return;
    }

    // System
    this.get('queueFleet').perform(fleet, 'system');

    // Constellation
    this.get('queueFleet').perform(fleet, 'constellation');

    // Region
    this.get('queueFleet').perform(fleet, 'region');
  },

  receiveFleetUpdate(fleet) {
    this.get('tracker').evaluate(fleet);
  },

  destroyFleet(fleet) {
    // Notify tracker and discovery.
    this.get('tracker').evaluate(fleet);
    this.get('discovery.evaluateFleet').perform(fleet);

    // System
    this.get('queueFleetRemoval').perform(fleet, 'system');

    // Constellation
    this.get('queueFleetRemoval').perform(fleet, 'constellation');

    // Region
    this.get('queueFleetRemoval').perform(fleet, 'region');
  },

  receiveSystemIntel(data) {
    this.get('queueIntel').perform(data, 'system');
  },

  receiveConstellationIntel(data) {
    this.get('queueIntel').perform(data, 'constellation');
  },

  receiveRegionIntel(data) {
    this.get('queueIntel').perform(data, 'region');
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
  },

  /* Tasks */

  queueIntel: task(function * (payload, scope) {
    yield waitForProperty(this, `kills.${scope}`, (store) => isArray(store));
    yield waitForProperty(this, `fleets.${scope}`, (store) => isArray(store));

    let { fleets, kills } = payload;
    let fleetStore = this.get(`fleets.${scope}`);
    let killStore = this.get(`kills.${scope}`);

    fleets.map((fleet) => {
      if (!fleetStore.findBy('id', fleet.id))
        fleetStore.pushObject(fleet);
    });

    kills.map((kill) => {
      if (!killStore.findBy('id', kill.id))
        killStore.pushObject(kill);
    });
  }).maxConcurrency(20).enqueue(),

  queueKill: task(function * (payload, scope) {
    yield waitForProperty(this, `location.${scope}`, 'id');
    yield waitForProperty(this, `kills.${scope}`, (store) => isArray(store));

    if (scope === 'system') {
      let system = this.get('location.system.id');

      if (payload.system.id === system) {
        this.get(`kills.${scope}`).pushObject(payload);
      }
    } else {
      yield waitForProperty(this, `location.${scope}.systems`, (store) => isArray(store));

      let systems = this.get(`location.${scope}.systems`);

      if (systems.findBy('id', payload.system.id)) {
        this.get(`kills.${scope}`).pushObject(payload);
      }
    }
  }),

  queueFleet: task(function * (payload, scope) {
    yield waitForProperty(this, `location.${scope}`, 'id');
    yield waitForProperty(this, `fleets.${scope}`, (store) => isArray(store));

    if (scope === 'system') {
      let system = this.get('location.system.id');

      if (payload.system.id === system) {
        let fleets = this.get(`fleets.${scope}`);
        let existingFleet = fleets.findBy('id', payload.id);

        if (existingFleet) {
          // We already have the fleet, so update it (remove/add)
          fleets.removeObject(existingFleet);
        } else {
          let suffix = payload.characters.length > 1 ? 's' : '';
          let charSuffix = payload.kills.length > 1 ? 's' : '';
          let name = this.get(`location.${scope}.name`);

          this.get('message.dispatch').perform(
            `New threat in ${name}`,
            `${payload.characters.length} pilot${suffix} with ${payload.kills.length} kill${charSuffix}`,
            5
          );
        }

        fleets.pushObject(payload);
      }
    } else {
      let systems = this.get(`location.${scope}.systems`);

      if (systems.findBy('id', payload.system.id)) {
        let fleets = this.get(`fleets.${scope}`);
        let existingFleet = fleets.findBy('id', payload.id);

        if (existingFleet) {
          // We already have the fleet, so update it (remove/add)
          fleets.removeObject(existingFleet);
        } else {
          let suffix = payload.characters.length > 1 ? 's' : '';
          let charSuffix = payload.kills.length > 1 ? 's' : '';
          let name = this.get(`location.${scope}.name`);

          this.get('message.dispatch').perform(
            `New threat in ${name}`,
            `${payload.characters.length} pilot${suffix} with ${payload.kills.length} kill${charSuffix}`,
            5
          );
        }

        fleets.pushObject(payload);
      }
    }
  }),

  queueFleetRemoval: task(function * (payload, scope) {
    yield waitForProperty(this, `fleets.${scope}`, (store) => isArray(store));

    let fleets = this.get(`fleets.${scope}`);
    let existingFleet = fleets.findBy('id', payload.id);

    if (existingFleet) {
      fleets.removeObject(existingFleet);
    }
  }),

});
